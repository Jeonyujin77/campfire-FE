//라이브러리
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import ReactGa from 'react-ga';
//api
import { __signin } from '../../apis/userApi';
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../apis/loginkeys';
//훅
import useInput from '../../hooks/useInput';
import useInputValid from '../../hooks/useInputValid';
import { emailValid, pwValid } from '../../utils/RegExp';
//컴포넌트
import Input from '../common/Input';
import Button from '../common/Button';
//이미지
import google_logo from '../../asset/google_logo.png';
import kakao_logo from '../../asset/kakao_logo.png';
import naver_logo from '../../asset/naver_logo.png';
import pwHide from '../../asset/pwHide.png';
import pwShow from '../../asset/pwShow.png';
import { EMAIL_NOT_VALID, PW_NOT_VALID } from '../../constant/message';

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
    ReactGa.event({
      category: '로그인 페이지',
      action: '일반로그인시도',
    });
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

  //카카오로그인
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    ReactGa.event({
      category: '로그인 페이지',
      action: '카카오로그인버튼클릭',
    });
  };
  //네이버로그인
  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
    ReactGa.event({
      category: '로그인 페이지',
      action: '네이버로그인버튼클릭',
    });
  };
  //구글로그인
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
    ReactGa.event({
      category: '로그인 페이지',
      action: '구글로그인버튼클릭',
    });
  };

  return (
    <Wrap>
      <FormWrap onSubmit={onSubmit}>
        <InputWrap>
          <Span>
            <Input
              type="email"
              width="394px"
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
      <SocialLoginBtn
        onClick={handleKakaoLogin}
        bgColor="rgb(254,229,0)"
        color="black"
      >
        <LoginLogo src={kakao_logo} />
        <p>카카오 로그인</p>
      </SocialLoginBtn>
      <SocialLoginBtn
        onClick={handleNaverLogin}
        bgColor="rgb(2,199,90)"
        color="white"
      >
        <LoginLogo src={naver_logo} />
        <p>네이버 로그인</p>
      </SocialLoginBtn>
      <SocialLoginBtn
        onClick={handleGoogleLogin}
        bgColor="#ffffff"
        color="black"
        border="2px solid rgb(66,133,244)"
      >
        <LoginLogo src={google_logo} />
        <p>구글 로그인</p>
      </SocialLoginBtn>
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
          ReactGa.event({
            category: '로그인 페이지',
            action: '관리자모드 버튼',
          });
          window.open('https://campfire-host-fe.vercel.app/');
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #dadada;
  @media (max-width: 1200px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const SpanPswd = styled.span`
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
  @media (max-width: 1200px) {
    width: 20px;
    height: 20px;
  }
`;

const PswdImg = styled.img`
  width: 30px;
  height: 20px;
  @media (max-width: 1200px) {
    width: 25px;
    height: 15px;
  }
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
  width: 394px;
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

const SocialLoginBtn = styled.div<{
  bgColor: string;
  color: string;
  border?: string;
}>`
  width: 400px;
  height: 50px;
  padding: 0px;
  border: ${({ border }) => (border ? border : 'none')};
  border-radius: 12px;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(95%);
  }
  p {
    margin: 0px 90px 0px 60px;
    font-size: 20px;
    font-weight: bold;
  }
  @media (max-width: 1200px) {
    width: 80%;
    p {
      margin: 0px 20px 0px 30px;
      font-size: 15px;
    }
  }
`;

const LoginLogo = styled.img`
  width: 30px;
  height: 30px;
`;

export default LoginBox;
