//라이브러리
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
//api
import { __kakaoLogin } from '../apis/userApi';
import { useNavigate } from 'react-router-dom';

//카카오페이지에서 작업하고 리다이렉트되는 곳
const OAuthKakao = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const kakaoLogin = (payload: any) => {
    dispatch(__kakaoLogin(payload)).then(res => {
      const { type, payload }: any = res;
      if (type === 'kakaoLogin/fulfilled') {
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
      else if (type === 'kakaoLogin/rejected') {
        alert(`${payload.response.data.errorMessage}`);
        window.location.href = '/login';
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
