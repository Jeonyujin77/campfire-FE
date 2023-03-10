//라이브러리
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
//컴포넌트
import LogLogo from '../components/common/LogLogo';
import SignupBox from '../components/users/signupBox';

const Signup = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Wrap>
      <LogLogo />
      <SignupBox />
      <BottomText>
        <div>이미 회원이신가요? </div>
        <ToLogin to="/login">로그인하기</ToLogin>
      </BottomText>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 0px auto;
  margin-top: 100px;
  width: 1180px;
  max-height: 100%;
  min-height: 35vh;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 0px;
    padding: 0px;
  }
`;

const ToLogin = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #fe802c;
`;

const BottomText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

export default Signup;
