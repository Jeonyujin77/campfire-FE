/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { useState } from 'react';
import Button from '../common/Button';
import Input from '../../components/common/Input';
import useInput from '../../hooks/useInput';
import useInputValid from '../../hooks/useInputValid';
import {
  emailValid,
  nicknameValid,
  pwValid,
  telValid,
} from '../../utils/RegExp';
import { __checkEmailDup, __checkNickDup, __signup } from '../../apis/userApi';
import { useAppDispatch } from '../../redux/store';
import {
  EMAIL_NOT_VALID,
  NICK_NOT_VALID,
  PWCHK_NOT_VALID,
  PW_NOT_VALID,
  TELNUM_NOT_VALID,
} from '../../constant/message';
import { useNavigate } from 'react-router-dom';

const SignupBox = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 아이디, 비밀번호, 비밀번호 확인, 이름
  const [email, setEmail] = useState(''); // 이메일
  const [nickname, setNickname] = useState(''); // 닉네임
  const [password, setPassword, passwordHandler] = useInput(''); // 비밀번호
  const [passwordCheck, setPasswordCheck, passwordCheckHandler] = useInput(''); // 비밀번호 재확인
  const [telNum, setTelNum, telNumHandler] = useInput(''); // 전화번호
  const [emailValidFlag, emailFlagHandler] = useInputValid(email, emailValid); // 이메일검증 flag
  const [nickValidFlag, nickFlagHandler] = useInputValid(
    nickname,
    nicknameValid,
  ); // 닉네임검증 flag
  const [pwValidFlag, pwFlagHandler] = useInputValid(password, pwValid); // 비밀번호검증 flag
  const [telValidFlag, setTelValidFlag] = useInputValid(telNum, telValid); // 전화번호검증 flag
  const [pwChkValidFlag, setPwChkValidFlag] = useState(true); // 비밀번호 재확인검증 flag
  const [emailDupFlag, setEmailDupFlag] = useState(false); // 이메일중복확인 flag
  const [nickDupFlag, setNickDupFlag] = useState(false); // 닉네임중복확인 flag
  //비밀번호 value 보이기, 숨기기
  // const [showPswd, setShowPswd] = useState(false);
  // const [showPswdCheck, setShowPswdCheck] = useState(false);

  // 이메일 변경 시
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailDupFlag(false);
  };

  // 닉네임 변경 시
  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNickDupFlag(false);
  };

  // 패스워드 유효성 검사
  const onBlurPasswordCheck = () => {
    if (password !== passwordCheck) {
      setPwChkValidFlag(false);
    } else {
      setPwChkValidFlag(true);
    }
  };

  // 이메일 중복검사
  const checkEmailDup = () => {
    if (email === '') return;

    dispatch(__checkEmailDup(email)).then(res => {
      const { type, payload } = res;
      if (type === 'checkEmailDup/fulfilled') {
        setEmailDupFlag(true);
        alert(`${payload.message}`);
      } else if (type === 'checkEmailDup/rejected') {
        setEmailDupFlag(false);
        if (
          payload.response.status === 400 ||
          payload.response.status === 412
        ) {
          alert(`${payload.response.data.errorMessage}`);
        }
      }
    });
  };

  // 닉네임 중복검사
  const checkNickDup = () => {
    if (nickname === '') return;

    dispatch(__checkNickDup(nickname)).then(res => {
      const { type, payload } = res;
      if (type === 'checkNickDup/fulfilled') {
        setNickDupFlag(true);
        alert(`${payload.message}`);
      } else if (type === 'checkNickDup/rejected') {
        setNickDupFlag(false);
        if (
          payload.response.status === 400 ||
          payload.response.status === 412
        ) {
          alert(`${payload.response.data.errorMessage}`);
        }
      }
    });
  };

  // 회원가입
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력값 검증 및 중복확인이 정상이면
    if (
      emailValidFlag &&
      emailDupFlag &&
      nickValidFlag &&
      nickDupFlag &&
      pwValidFlag &&
      pwChkValidFlag &&
      telValidFlag
    ) {
      const userInfo = {
        email,
        userName: nickname,
        password,
        phoneNumber: telNum,
      };
      dispatch(__signup(userInfo)).then(res => {
        const { type, payload } = res;
        if (type === 'signup/fulfilled') {
          alert(`${payload.message}`);
          localStorage.clear();
          navigate('/login');
        } else if (
          type === 'signup/rejected' &&
          payload.response.status === 400
        ) {
          localStorage.clear();
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    } else {
      localStorage.clear();
      alert('중복확인 및 입력 형식을 확인해주세요.');
    }
  };

  return (
    <SignupWrap onSubmit={onSubmit}>
      <InputWrap>
        <div>
          <div>아이디</div>
          <Span>
            <Input
              width="285px"
              height="30px"
              name="email"
              type="email"
              required
              value={email}
              onChange={emailHandler}
              onBlur={emailFlagHandler}
            />
            <InputBtn onClick={checkEmailDup}>중복확인</InputBtn>
          </Span>
          {!emailValidFlag ? <Guide>{EMAIL_NOT_VALID}</Guide> : <></>}
        </div>
        <div>
          <div>이름</div>
          <Span>
            <Input
              type="text"
              width="285px"
              height="30px"
              name="userName"
              required
              value={nickname}
              onChange={nicknameHandler}
              onBlur={nickFlagHandler}
            />
            <InputBtn onClick={checkNickDup}>중복확인</InputBtn>
          </Span>
          {!nickValidFlag ? <Guide>{NICK_NOT_VALID}</Guide> : <></>}
        </div>
        <div>
          <div>비밀번호</div>
          <SpanPswd>
            <Input
              // type={showPswd ? 'text' : 'password'}
              type="password"
              width="285px"
              height="30px"
              required
              name="password"
              value={password}
              onChange={passwordHandler}
              onBlur={pwFlagHandler}
            />
            {/* <InputBtn
            onClick={() => {
              setShowPswd(!showPswd);
            }}
          >
            비밀번호
          </InputBtn> */}
          </SpanPswd>
          {!pwValidFlag ? <Guide>{PW_NOT_VALID}</Guide> : <></>}
        </div>
        <div>
          <div>비밀번호확인</div>
          <SpanPswd>
            <Input
              // type={showPswdCheck ? 'text' : 'password'}
              type="password"
              width="285px"
              height="30px"
              required
              name="passwordCheck"
              value={passwordCheck}
              onChange={passwordCheckHandler}
              onBlur={onBlurPasswordCheck}
            />
            {/* <InputBtn
            onClick={() => {
              setShowPswdCheck(!showPswdCheck);
            }}
          >
            비밀번호 확인
          </InputBtn> */}
          </SpanPswd>
          {!pwChkValidFlag ? <Guide>{PWCHK_NOT_VALID}</Guide> : <></>}
        </div>
        <div>
          <div>전화번호</div>
          <Span>
            <Input
              type="tel"
              width="285px"
              height="30px"
              name="phoneNumber"
              required
              value={telNum}
              onChange={telNumHandler}
              onBlur={setTelValidFlag}
            />
          </Span>
          {!telValidFlag ? <Guide>{TELNUM_NOT_VALID}</Guide> : <></>}
        </div>
      </InputWrap>
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
        가입하기
      </Button>
    </SignupWrap>
  );
};

const SignupWrap = styled.form`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  border: 1px solid red;
  padding: 10px;
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid red;
  width: 400px;
  height: auto;
  font-size: 25px;
`;

const InputBtn = styled.span`
  margin-right: 5px;
  font-size: 14px;
  cursor: pointer;
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
`;

const Guide = styled.span`
  display: block;
  color: red;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;

export default SignupBox;
