import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
    withCredentials: true,
  },
});

api.interceptors.request.use(function (config: any) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  //로컬스토리지 토큰을 헤더에 집어넣음
  if (config.headers && accessToken && refreshToken) {
    config.headers.accesstoken = `${accessToken}`;
    config.headers.refreshtoken = `${refreshToken}`;
  }

  return config;
});

api.interceptors.response.use(
  function (config: any) {
    // access토큰 만료시 재발급받은 토큰을 다시 넣어줌
    if (config.headers && config.headers.accesstoken) {
      localStorage.setItem('accessToken', config.headers.accesstoken);
    }

    return config;
  },
  function (error) {
    console.log(error);
    const { status, data } = error.response;

    if (
      status === 419 ||
      data.errorMessage ===
        'RefreshToken이 조작되었습니다. 다시 로그인해주세요.'
    ) {
      localStorage.clear();
      window.location.href = '/login';
    }
    // 요청 오류가 있는 경우 작업 수행
    return Promise.reject(error);
  },
);

export default api;
