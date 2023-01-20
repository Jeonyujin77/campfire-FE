import { useEffect } from 'react';
import { __naverLogin } from '../apis/userApi';
import { useAppDispatch } from '../redux/store';

const OAuthNaver = () => {
  const dispatch = useAppDispatch();
  const naverLogin = (payload: any) => {
    dispatch(__naverLogin(payload)).then(res => {
      const { type, payload }: any = res;
      console.log('res:', res);
      console.log('type:', type);
      console.log('payload:', payload);
      if (type === 'naverLogin/fulfilled') {
        localStorage.setItem('userId', payload.userId);
        window.location.href = `${process.env.REACT_APP_REDIRECT_URI}`;
      } else if (type === 'naverLogin/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };
  const state = new URL(window.location.href).searchParams.get('state');
  const code = new URL(window.location.href).searchParams.get('code');
  const loginData = {
    code,
    state,
  };
  useEffect(() => {
    naverLogin(loginData);
  }, []);
  return <div>NaverLogin</div>;
};

export default OAuthNaver;
