//라이브러리
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
//api
import {
  __certifiTest,
  __checkEmailDup,
  __checkNickDup,
  __getCertifiNum,
  __signup,
} from '../../apis/userApi';
//훅
import useInput from '../../hooks/useInput';
import useInputValid from '../../hooks/useInputValid';
import {
  emailValid,
  nicknameValid,
  pwValid,
  telValid,
} from '../../utils/RegExp';
//컴포넌트
import Button from '../common/Button';
import Input from '../../components/common/Input';
//이미지
import pwHide from '../../asset/pwHide.png';
import pwShow from '../../asset/pwShow.png';
import greenChecked from '../../asset/socialInfo/greenChecked.png';
import {
  EMAIL_NOT_VALID,
  NICK_NOT_VALID,
  PWCHK_NOT_VALID,
  PW_NOT_VALID,
  TELNUM_NOT_VALID,
} from '../../constant/message';

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
  const [showPswd, setShowPswd] = useState(false);
  const [showPswdCheck, setShowPswdCheck] = useState(false);

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
        alert(`${payload.response.data.errorMessage}`);
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
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  const [certifiNum, setCertifiNum] = useState<any>();
  const certifiNumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertifiNum(e.target.value);
  };

  //인증번호 받아오기 상태
  const [getCertifiStatus, setGetCertifiStatus] = useState(false);
  //인증유무 상태
  const [certifiStatus, setCertifiStatus] = useState(false);
  //인증 유무를 나타내는 텍스트
  const [certifiText, setCertifiText] = useState('');

  //인증번호 요청
  const certifiNumGet = () => {
    if (telValidFlag) {
      dispatch(__getCertifiNum(telNum)).then(res => {
        const { type, payload } = res;
        if (type === 'getCertifiNum/fulfilled') {
          alert('인증번호가 발송되었습니다.');
          setGetCertifiStatus(true);
        } else if (type === 'getCertifiNum/rejected') {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    }
  };

  //인증번호 검증
  const certifiTest = () => {
    dispatch(
      __certifiTest({ phoneNumber: telNum, verifyCode: certifiNum }),
    ).then(res => {
      const { type, payload }: any = res;
      if (type === 'certifiTest/fulfilled') {
        setCertifiText('인증이 완료되었습니다!');
        setCertifiStatus(true);
      } else if (type === 'certifiTest/rejected') {
        alert(`${payload.response.data.errorMessage}`);
        setGetCertifiStatus(false);
        setCertifiNum('');
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
      telValidFlag &&
      getCertifiStatus &&
      certifiStatus
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
        } else if (type === 'signup/rejected') {
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
    <Wrap onSubmit={onSubmit}>
      <SignupWrap>
        <InputWrap>
          <div>
            <Span>
              <Input
                required
                value={email}
                onChange={emailHandler}
                onBlur={emailFlagHandler}
                name="email"
                type="email"
                placeholder="example123@email.com"
                width="352px"
                height="59px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                bgColor="#D9D9D9"
              />
              <InputBtn onClick={checkEmailDup}>중복확인</InputBtn>
            </Span>
          </div>
          <ErrWrap>
            {!emailValidFlag ? <Guide>{EMAIL_NOT_VALID}</Guide> : <></>}
          </ErrWrap>
          <div>
            <Span>
              <Input
                required
                value={nickname}
                onChange={nicknameHandler}
                onBlur={nickFlagHandler}
                name="userName"
                type="text"
                placeholder="닉네임"
                width="352px"
                height="59px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                bgColor="#D9D9D9"
              />
              <InputBtn onClick={checkNickDup}>중복확인</InputBtn>
            </Span>
          </div>
          <ErrWrap>
            {!nickValidFlag ? <Guide>{NICK_NOT_VALID}</Guide> : <></>}
          </ErrWrap>
          <div>
            <SpanPswd>
              <Input
                value={password}
                onChange={passwordHandler}
                onBlur={pwFlagHandler}
                required
                name="password"
                type={showPswd ? 'text' : 'password'}
                placeholder="비밀번호"
                width="352px"
                height="59px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                bgColor="#D9D9D9"
              />
              {showPswd ? (
                <PswdShow
                  onClick={() => {
                    setShowPswd(!showPswd);
                  }}
                >
                  <PswdImg src={pwShow} />
                </PswdShow>
              ) : (
                <PswdShow
                  onClick={() => {
                    setShowPswd(!showPswd);
                  }}
                >
                  <PswdImg src={pwHide} />
                </PswdShow>
              )}
            </SpanPswd>
          </div>
          <ErrWrap>
            {!pwValidFlag ? <Guide>{PW_NOT_VALID}</Guide> : <></>}
          </ErrWrap>
          <div>
            <SpanPswd>
              <Input
                value={passwordCheck}
                onChange={passwordCheckHandler}
                onBlur={onBlurPasswordCheck}
                required
                name="passwordCheck"
                type={showPswdCheck ? 'text' : 'password'}
                placeholder="비밀번호 확인"
                width="352px"
                height="59px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                bgColor="#D9D9D9"
              />
              {showPswdCheck ? (
                <PswdShow
                  onClick={() => {
                    setShowPswdCheck(!showPswdCheck);
                  }}
                >
                  <PswdImg src={pwShow} />
                </PswdShow>
              ) : (
                <PswdShow
                  onClick={() => {
                    setShowPswdCheck(!showPswdCheck);
                  }}
                >
                  <PswdImg src={pwHide} />
                </PswdShow>
              )}
            </SpanPswd>
          </div>
          <ErrWrap>
            {!pwChkValidFlag ? <Guide>{PWCHK_NOT_VALID}</Guide> : <></>}
          </ErrWrap>
          <div>
            <Span>
              <Input
                value={telNum}
                onChange={telNumHandler}
                onBlur={setTelValidFlag}
                name="phoneNumber"
                required
                type="tel"
                placeholder="-를 제외한 숫자만 입력해주세요."
                width="352px"
                height="59px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                bgColor="#D9D9D9"
              />
              <InputBtn onClick={certifiNumGet}>인증번호 발송</InputBtn>
            </Span>
          </div>
          <ErrWrap>
            {!telValidFlag ? <Guide>{TELNUM_NOT_VALID}</Guide> : <></>}
          </ErrWrap>
          {getCertifiStatus ? (
            <>
              <div>
                <Span>
                  <Input
                    value={certifiNum || ''}
                    onChange={certifiNumHandler}
                    width="352px"
                    height="59px"
                    fontSize="20px"
                    borderRadius="20px 0px 0px 20px"
                    bgColor="#D9D9D9"
                  />
                  {certifiStatus ? (
                    <InputBtn>
                      <img src={greenChecked} alt="체크" />
                    </InputBtn>
                  ) : (
                    <InputBtn onClick={certifiTest}>인증번호 확인</InputBtn>
                  )}
                </Span>
              </div>
              <ErrWrap>
                {certifiStatus ? (
                  <Guide color="#13da01" fontWeight="bold">
                    {certifiText}
                  </Guide>
                ) : (
                  <></>
                )}
              </ErrWrap>
            </>
          ) : (
            <></>
          )}
        </InputWrap>
      </SignupWrap>
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
        가입하기
      </Button>
    </Wrap>
  );
};

const Wrap = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SignupWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  margin-bottom: 50px;
  @media (max-width: 1200px) {
    width: 95%;
    margin-bottom: 20px;
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 450px;
  height: 500px;
  font-size: 25px;
  gap: 5px;
  margin-bottom: 10px;
  @media (max-width: 1200px) {
    width: 100%;
    height: 95%;
    align-items: flex-start;
    margin-bottom: 0px;
  }
`;

const InputBtn = styled.span`
  width: 60px;
  height: 30px;
  margin-right: 5px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: 1200px) {
    font-size: 13px;
  }
`;

const Span = styled.span`
  display: flex;
  justify-content: flex-start;
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
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  background-color: #dadada;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const PswdShow = styled.div`
  width: 60px;
  height: 30px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PswdImg = styled.img`
  user-select: none;
  width: 30px;
  height: 20px;
`;

const ErrWrap = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`;

const Guide = styled.span<{ color?: string; fontWeight?: string }>`
  display: block;
  color: ${({ color }) => (color ? color : 'red')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;

export default SignupBox;
