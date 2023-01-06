import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
    withCredentials: true,
  },
});

export const mainpageapi = axios.create({
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

api.interceptors.response.use(function (config: any) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  //둘중하나라도 없으면 다시 저장
  if (!accessToken && !refreshToken) {
    const newAccesstoken = config.headers.accesstoken;
    const newRefreshtoken = config.headers.refreshtoken;
    localStorage.setItem('accessToken', newAccesstoken);
    localStorage.setItem('refreshToken', newRefreshtoken);
  }

  return config;
});

export default api;
