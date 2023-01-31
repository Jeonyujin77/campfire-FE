import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { __naverLogin } from '../apis/userApi';
import { useAppDispatch } from '../redux/store';

const OAuthNaver = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const naverLogin = (payload: any) => {
    dispatch(__naverLogin(payload)).then(res => {
      const { type, payload }: any = res;
      if (type === 'naverLogin/fulfilled') {
        if (payload.userId) {
          localStorage.setItem('userId', payload.userId);
          window.location.href = `${process.env.REACT_APP_REDIRECT_URI}`;
        } else {
          navigate(`/socialsignup`, {
            state: {
              email: payload.user.email,
              profileImg: payload.user.profileImg,
              provider: payload.user.provider,
              userName: payload.user.userName,
              snsId: payload.user.snsId,
            },
          });
        }
      } else if (type === 'naverLogin/rejected') {
        alert(`${payload.response.data.errorMessage}`);
        window.location.href = '/login';
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
