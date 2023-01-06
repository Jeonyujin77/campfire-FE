/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { useState } from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useInputValid from '../../hooks/useInputValid';
import { emailValid, pwValid } from '../../utils/RegExp';
import Input from '../common/Input';
import { EMAIL_NOT_VALID, PW_NOT_VALID } from '../../constant/message';
import { useAppDispatch } from '../../redux/store';
import { __signin } from '../../apis/userApi';

const LoginBox = () => {
  const dispatch = useAppDispatch();
  // 아이디, 비밀번호
  const [email, setEmail, emailHandler] = useInput('');
  const [password, setPassword, passwordHandler] = useInput('');

  // 유효성 검사
  const [emailValidFlag, emailFlagHandler] = useInputValid(email, emailValid); // 이메일검증 flag
  const [pwValidFlag, pwFlagHandler] = useInputValid(password, pwValid); // 비밀번호검증 flag

  //로그인
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(__signin({ email, password })).then(res => {
      const { type, payload } = res;
      if (type === 'signin/fulfilled') {
        alert('로그인에 성공하였습니다.');
        window.location.href = '/';
      } else if (type === 'signin/rejected') {
        if (
          payload.response.status === 400 ||
          payload.response.status === 412 ||
          payload.response.status === 419
        ) {
          alert(`${payload.response.data.errorMessage}`);
        }
      }
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <SignupWrap>
          <InputWrap>
            <InputTitle>아이디</InputTitle>
            <Span>
              <Input
                type="email"
                width="285px"
                required
                value={email}
                onChange={emailHandler}
                onBlur={emailFlagHandler}
              />
            </Span>
            {!emailValidFlag ? <ErrorText>{EMAIL_NOT_VALID}</ErrorText> : <></>}
            <InputTitle>비밀번호</InputTitle>
            <SpanPswd>
              <Input
                type="password"
                width="285px"
                required
                value={password}
                onChange={passwordHandler}
                onBlur={pwFlagHandler}
              />
            </SpanPswd>
            {!pwValidFlag ? <ErrorText>{PW_NOT_VALID}</ErrorText> : <></>}
          </InputWrap>
        </SignupWrap>
        <Button
          width="430px"
          height="40px"
          bgColor="#f2f2f2"
          borderRadius="10px"
          fontSize="20px"
          onClick={() => {
            return;
          }}
        >
          로그인하기
        </Button>
      </form>
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

// const Input = styled.input`
//   margin-left: 5px;
//   border: none;
//   font-size: 13px;
//   font-weight: bold;
//   width: 285px;
//   height: 30px;
//   outline: none;
// `;

// const InputBtn = styled.button`
//   margin-right: 5px;
// `;

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
