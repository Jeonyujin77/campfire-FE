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
import kakao_login_medium_wide from '../../asset/kakao_login_medium_wide.png';
import { KAKAO_AUTH_URL } from '../../apis/loginkeys';
import pwHide from '../../asset/pwHide.png';
import pwShow from '../../asset/pwShow.png';

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
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  //비밀번호 보이기/숨기기
  const [showPw, setShowPw] = useState(false);

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Wrap>
      <FormWrap onSubmit={onSubmit}>
        {/* <SignupWrap> */}
        <InputWrap>
          {/* <InputTitle>아이디</InputTitle> */}
          <Span>
            <Input
              type="email"
              width="412px"
              placeholder="아이디(ID)"
              height="59px"
              fontSize="20px"
              borderRadius="20px 20px 20px 20px"
              bgColor="#D9D9D9"
              required
              value={email}
              onChange={emailHandler}
              onBlur={emailFlagHandler}
            />
          </Span>
          <ErrWrap>
            {!emailValidFlag ? <ErrorText>{EMAIL_NOT_VALID}</ErrorText> : <></>}
          </ErrWrap>
          {/* <InputTitle>비밀번호</InputTitle> */}
          <SpanPswd>
            <Input
              type={showPw ? 'text' : 'password'}
              width="352px"
              placeholder="비밀번호(PW)"
              height="59px"
              fontSize="20px"
              borderRadius="20px 0px 0px 20px"
              bgColor="#D9D9D9"
              required
              value={password}
              onChange={passwordHandler}
              onBlur={pwFlagHandler}
            />
            {showPw ? (
              <PswdShow
                onClick={() => {
                  setShowPw(!showPw);
                }}
              >
                <PswdImg src={pwShow} />
              </PswdShow>
            ) : (
              <PswdShow
                onClick={() => {
                  setShowPw(!showPw);
                }}
              >
                <PswdImg src={pwHide} />
              </PswdShow>
            )}
          </SpanPswd>
          <ErrWrap>
            {!pwValidFlag ? <ErrorText>{PW_NOT_VALID}</ErrorText> : <></>}
          </ErrWrap>
        </InputWrap>
        {/* </SignupWrap> */}
        <Button
          width="400px"
          height="50px"
          bgColor="#FFDEC8"
          borderRadius="12px"
          fontSize="20px"
          fontWeight="bold"
          margin="0px 0px 10px 0px"
          mwidth="70%"
          onClick={() => {
            return;
          }}
        >
          로그인
        </Button>
      </FormWrap>
      <KakaoBtn onClick={handleKakaoLogin}>
        <Kakao src={kakao_login_medium_wide} />
      </KakaoBtn>
      <Button
        width="400px"
        height="50px"
        bgColor="#FFDEC8"
        borderRadius="12px"
        fontSize="20px"
        fontWeight="bold"
        margin="0px 0px 20px 0px"
        mwidth="70%"
        onClick={() => {
          window.location.href = 'https://campfire-host-fe.vercel.app/';
        }}
      >
        관리자모드
      </Button>
      <BottomText>
        <div>아직 회원이 아니시라면? </div>
        <ToLogin to="/signup">회원가입하기</ToLogin>
      </BottomText>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  @media (max-width: 1200px) {
    width: 95%;
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  /* border: 1px solid red; */
  width: 450px;
  height: 200px;
  font-size: 25px;
  gap: 5px;
  margin-bottom: 10px;
  @media (max-width: 1200px) {
    width: 95%;
    height: 95%;
  }
`;

const Span = styled.span`
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 5px; */
  border-radius: 20px;
  background-color: #dadada;
  @media (max-width: 1200px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const SpanPswd = styled.span`
  /* border: 1px solid black; */
  /* width: 412px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  background-color: #dadada;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const PswdShow = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PswdImg = styled.img`
  width: 30px;
  height: 20px;
`;

const ErrWrap = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  @media (max-width: 1200px) {
    height: 20px;
  }
`;

const ErrorText = styled.div`
  color: red;
  width: 412px;
  font-size: 12px;
  @media (max-width: 1200px) {
    width: 100%;
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

const KakaoBtn = styled.button`
  padding: 0px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Kakao = styled.img`
  width: 400px;
  height: 59px;
  &:hover {
    filter: brightness(95%);
  }
  @media (max-width: 1200px) {
    width: 80%;
    height: 80%;
  }
`;

// const SignupWrap = styled.div`
//   /* 헤더 크기에 따라 수정 필요 */
//   margin: 0px auto;
//   /* 헤더 아래 출력되도록 */
//   border: 1px solid red;
//   padding: 10px;
//   width: 450px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: row;
// `;

// const InputTitle = styled.div`
//   /* border: 1px solid green; */
//   width: 305px;
//   height: 25px;
//   font-size: 15px;
// `;

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

export default LoginBox;
