import styled from 'styled-components';
import Logo from '../components/common/Logo';
import SignupBox from '../components/users/signupBox';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Signup = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();

  return (
    <Wrap>
      <Logo />
      <SignupBox />
      <BottomText>
        <div>이미 회원이신가요? </div>
        <ToLogin to="/login">로그인하기</ToLogin>
      </BottomText>
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
  min-height: 100vh;
  border: 1px solid red;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ToLogin = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #c6a6e3;
`;

const BottomText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

export default Signup;
