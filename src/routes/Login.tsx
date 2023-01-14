import styled from '@emotion/styled';
import Logo from '../components/common/Logo';
import LoginBox from '../components/users/loginBox';
import Button from '../components/common/Button';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const dispatch = useDispatch();
  return (
    <Wrap>
      <Logo />
      <LoginBox />
    </Wrap>
  );
};

const Wrap = styled.div`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 120px;
  width: 1180px;
  max-height: 100%;
  min-height: 100vh;
  border: 1px solid red;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default Login;
