//라이브러리
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
//api
import { __googleLogin } from '../apis/userApi';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading';

//구글페이지에서 작업하고 리다이렉트되는 곳
const OAuthGoogle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const googleLogin = (payload: any) => {
    dispatch(__googleLogin(payload)).then(res => {
      const { type, payload }: any = res;
      if (type === 'googleLogin/fulfilled') {
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
      }
      // 에러처리
      else if (type === 'googleLogin/rejected') {
        alert(`${payload.response.data.errorMessage}`);
        window.location.href = '/login';
      }
    });
  };

  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  useEffect(() => {
    googleLogin(code);
  }, []);

  return <Loading />;
};

export default OAuthGoogle;
