import React, { useEffect } from 'react';
import { __kakaoLogin } from '../apis/userApi';
import { useAppDispatch } from '../redux/store';

const OAuthKakao = () => {
  const dispatch = useAppDispatch();
  const kakaoLogin = (payload: any) => {
    dispatch(__kakaoLogin(payload)).then(res => {
      console.log(res);
      const { payload }: any = res;
      console.log(payload);
      localStorage.setItem('userId', payload.userId);
      window.location.href = 'http://localhost:3000/';
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
