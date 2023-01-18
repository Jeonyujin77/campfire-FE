import styled from '@emotion/styled';
import LogLogo from '../components/common/LogLogo';
import LoginBox from '../components/users/loginBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  //로그인돼있을 때 로그인 페이지 접근 막기
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  return (
    <Wrap>
      <LogLogo />
      <LoginBox />
    </Wrap>
  );
};

const Wrap = styled.div`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 100px;
  width: 1180px;
  max-height: 100%;
  min-height: 60vh;
  /* border: 1px solid red; */
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 30px;
    padding: 0px;
  }
`;

export default Login;
