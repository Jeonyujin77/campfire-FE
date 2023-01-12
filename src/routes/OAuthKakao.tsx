import React, { useEffect } from 'react';
import { __kakaoLogin } from '../apis/userApi';
import { useAppDispatch } from '../redux/store';

const OAuthKakao = () => {
  const dispatch = useAppDispatch();
  const kakaoLogin = (payload: any) => {
    dispatch(__kakaoLogin(payload));
  };

  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    kakaoLogin(code);
  }, []);
  return <div></div>;
};

export default OAuthKakao;
