import styled from 'styled-components';
import Logo from '../components/common/Logo';
import LoginBox from '../components/users/loginBox';
import Button from '../components/common/Button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Login = () => {
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

export default Login;
