//라이브러리
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
//api
import { __kakaoLogin } from '../apis/userApi';

//카카오페이지에서 작업하고 리다이렉트되는 곳
const OAuthKakao = () => {
  const dispatch = useAppDispatch();

  const kakaoLogin = (payload: any) => {
    dispatch(__kakaoLogin(payload)).then(res => {
      console.log(res);
      const { type, payload }: any = res;
      console.log(payload);
      if (type === 'kakaoLogin/fulfilled') {
        localStorage.setItem('userId', payload.userId);
        window.location.href = `${process.env.REACT_APP_REDIRECT_URI}`;
      }
      // 에러처리
      else if (type === 'kakaoLogin/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  useEffect(() => {
    kakaoLogin(code);
  }, []);

  return <div>kakao</div>;
};

export default OAuthKakao;
