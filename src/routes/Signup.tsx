import styled from 'styled-components';
import Logo from '../components/common/Logo';
import SignupBox from '../components/users/signupBox';
import Button from '../components/common/Button';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();

  const onClickFunc = () => {
    alert('회원가입관련 dispatch 작성필요');
  };
  return (
    <Wrap>
      <Logo />
      <SignupBox />
      <Button
        width="430px"
        height="40px"
        bgColor="#f2f2f2"
        borderRadius="10px"
        fontSize="20px"
        onClick={onClickFunc}
      >
        가입하기
      </Button>
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
