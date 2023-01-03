import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

interface User {
  email: string;
  password: string;
}

const LoginBox = () => {
  //서버에 보낼 user객체
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  // 아이디, 비밀번호, 비밀번호 확인, 이름
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');

  //input value onChangeHandler
  const userChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //로그인하기버튼 onClickHandler
  const onClickHandler = () => {
    //아이디입력 유효성검사
    if (!user.email) {
      setIsEmail('아이디를 입력해주세요');
    } else {
      setIsEmail('');
    }
    //비밀번호입력 유효성검사
    if (!user.password) {
      setIsPassword('비밀번호를 입력해주세요');
    } else {
      setIsPassword('');
    }
    if (user.email && user.password) {
      alert('로그인관련 dispatch 작성필요');
    }
  };

  return (
    <>
      <SignupWrap>
        <InputWrap>
          <InputTitle>아이디</InputTitle>
          <Span>
            <Input name="email" onChange={userChangeHandler} />
          </Span>
          <ErrorText>{isEmail}</ErrorText>
          <InputTitle>비밀번호</InputTitle>
          <SpanPswd>
            <Input
              type="password"
              name="password"
              onChange={userChangeHandler}
            />
          </SpanPswd>
          <ErrorText>{isPassword}</ErrorText>
        </InputWrap>
      </SignupWrap>
      <Button
        width="430px"
        height="40px"
        bgColor="#f2f2f2"
        borderRadius="10px"
        fontSize="20px"
        onClick={onClickHandler}
      >
        로그인하기
      </Button>
      <BottomText>
        <div>아직 회원이 아니시라면? </div>
        <ToLogin to="/signup">회원가입하기</ToLogin>
      </BottomText>
    </>
  );
};

const SignupWrap = styled.div`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  border: 1px solid red;
  padding: 10px;
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid red;
  width: 400px;
  height: 200px;
  font-size: 25px;
  gap: 5px;
`;

const InputTitle = styled.div`
  /* border: 1px solid green; */
  width: 305px;
  height: 25px;
  font-size: 15px;
`;

const Input = styled.input`
  margin-left: 5px;
  border: none;
  font-size: 13px;
  font-weight: bold;
  width: 285px;
  height: 30px;
  outline: none;
`;

const InputBtn = styled.button`
  margin-right: 5px;
`;

const SpanPswd = styled.span`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Span = styled.span`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const ErrorText = styled.div`
  color: red;
  width: 295px;
  font-size: 12px;
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

export default LoginBox;
