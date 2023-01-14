import React, { useEffect } from 'react';
import { __kakaoLogin } from '../apis/userApi';
import { useAppDispatch } from '../redux/store';

const OAuthKakao = () => {
  const dispatch = useAppDispatch();
  const kakaoLogin = (payload: any) => {
    dispatch(__kakaoLogin(payload)).then(res => {
      console.log(res);
      const { type, payload }: any = res;
      console.log(payload);
      if (type === 'kakaoLogin/fulfilled') {
        localStorage.setItem('userId', payload.userId);
        window.location.href = 'http://localhost:3000/';
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
