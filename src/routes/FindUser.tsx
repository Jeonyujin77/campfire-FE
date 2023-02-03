//라이브러리
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import ReactGa from 'react-ga';
//훅
import useInput from '../hooks/useInput';
import useInputValid from '../hooks/useInputValid';
import { emailValid, pwValid, telValid } from '../utils/RegExp';
//컴포넌트
import Input from '../components/common/Input';
import {
  EMAIL_NOT_VALID,
  PWCHK_NOT_VALID,
  PW_NOT_VALID,
  TELNUM_NOT_VALID,
} from '../constant/message';
//이미지
import pwHide from '../asset/pwHide.png';
import pwShow from '../asset/pwShow.png';
import greenChecked from '../asset/socialInfo/greenChecked.png';
import {
  __certifiTestToFindIdPw,
  __getCertifiNumToFindIdPw,
  __getUserEmail,
  __putPassword,
} from '../apis/userApi';
import Button from '../components/common/Button';

const FindUser = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as { to: string };

  useEffect(() => {
    if (!state) {
      window.location.href = '/';
    }
  }, []);

  // 번호
  const [telNum, setTelNum, telNumHandler] = useInput(''); // 전화번호
  const [telValidFlag, setTelValidFlag] = useInputValid(telNum, telValid); // 전화번호검증 flag

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
    ReactGa.event({
      category: '아이디,비밀번호 찾기 페이지',
      action: '인증번호 요청',
    });
    if (telValidFlag) {
      dispatch(__getCertifiNumToFindIdPw(telNum)).then(res => {
        const { type, payload } = res;
        if (type === 'getCertifiNumToFindIdPw/fulfilled') {
          alert('인증번호가 발송되었습니다.');
          setGetCertifiStatus(true);
        } else if (type === 'getCertifiNumToFindIdPw/rejected') {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    }
  };

  //인증번호 검증
  const certifiTest = () => {
    ReactGa.event({
      category: '아이디,비밀번호 찾기 페이지',
      action: '인증번호 검증',
    });
    dispatch(
      __certifiTestToFindIdPw({ phoneNumber: telNum, verifyCode: certifiNum }),
    ).then(res => {
      const { type, payload }: any = res;
      if (type === 'certifiTestToFindIdPw/fulfilled') {
        setCertifiText('인증이 완료되었습니다!');
        setCertifiStatus(true);
      } else if (type === 'certifiTestToFindIdPw/rejected') {
        alert(`${payload.response.data.errorMessage}`);
        setGetCertifiStatus(false);
        setCertifiNum('');
      }
    });
  };

  const [userId, setUserId] = useState('');

  //인증번호 검증 완료시 이메일 불러옴
  useEffect(() => {
    if (certifiStatus === true) {
      dispatch(__getUserEmail(telNum)).then(res => {
        const { type, payload }: any = res;
        if (type === 'getUserEmail/fulfilled') {
          setUserId(payload.email);
        } else if (type === 'getUserEmail/rejected') {
          alert(`${payload.response.data.errorMessage}`);
          window.location.href = '/login';
        }
      });
    }
  }, [certifiStatus]);

  const [email, setEmail] = useState(''); // 이메일
  const [emailValidFlag, emailFlagHandler] = useInputValid(email, emailValid); // 이메일검증 flag
  // 이메일 변경 시
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword, passwordHandler] = useInput(''); // 비밀번호
  const [passwordCheck, setPasswordCheck, passwordCheckHandler] = useInput(''); // 비밀번호 재확인
  const [pwValidFlag, pwFlagHandler] = useInputValid(password, pwValid); // 비밀번호검증 flag
  const [pwChkValidFlag, setPwChkValidFlag] = useState(true); // 비밀번호 재확인검증 flag
  //비밀번호 value 보이기, 숨기기
  const [showPswd, setShowPswd] = useState(false);
  const [showPswdCheck, setShowPswdCheck] = useState(false);
  // 패스워드 유효성 검사
  const onBlurPasswordCheck = () => {
    if (password !== passwordCheck) {
      setPwChkValidFlag(false);
    } else {
      setPwChkValidFlag(true);
    }
  };

  //비밀번호 변경
  const putPassWord = () => {
    ReactGa.event({
      category: '아이디,비밀번호 찾기 페이지',
      action: '인증번호 검증',
    });
    dispatch(__putPassword({ phoneNumber: telNum, email, password })).then(
      res => {
        const { type, payload }: any = res;
        if (type === 'putPassword/fulfilled') {
          alert(`${payload.message}`);
          window.location.href = '/login';
        } else if (type === 'putPassword/rejected') {
          alert(`${payload.response.data.errorMessage}`);
          window.location.href = '/login';
        }
      },
    );
  };

  return (
    <Wrap>
      <IdFindWrap display={state.to}>
        <label>아이디 찾기</label>
        <div>
          <Span>
            {certifiStatus ? (
              <Input
                value={telNum}
                onChange={telNumHandler}
                onBlur={setTelValidFlag}
                name="phoneNumber"
                required
                readOnly
                type="tel"
                placeholder="-를 제외한 숫자만 입력해주세요."
                width="352px"
                height="45px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                border="1px solid #FFECE0"
                bgColor="#FFECE0"
              />
            ) : (
              <Input
                value={telNum}
                onChange={telNumHandler}
                onBlur={setTelValidFlag}
                name="phoneNumber"
                required
                type="tel"
                placeholder="-를 제외한 숫자만 입력해주세요."
                width="352px"
                height="45px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                border="1px solid #FFECE0"
                bgColor="#FFECE0"
              />
            )}
            {certifiStatus ? (
              <InputBtn></InputBtn>
            ) : (
              <InputBtn onClick={certifiNumGet}>인증번호 발송</InputBtn>
            )}
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
                  height="45px"
                  fontSize="20px"
                  borderRadius="20px 0px 0px 20px"
                  border="1px solid #FFECE0"
                  bgColor="#FFECE0"
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
        {userId ? (
          <div
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            사용자 아이디: {userId}
          </div>
        ) : (
          <></>
        )}
      </IdFindWrap>
      <PwFindWrap display={state.to}>
        <label>비밀번호 찾기</label>
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
              height="45px"
              fontSize="20px"
              borderRadius="20px 0px 0px 20px"
              border="1px solid #FFECE0"
              bgColor="#FFECE0"
            />
            <InputBtn></InputBtn>
          </Span>
        </div>
        <ErrWrap>
          {!emailValidFlag ? <Guide>{EMAIL_NOT_VALID}</Guide> : <></>}
        </ErrWrap>
        <div>
          <Span>
            {certifiStatus ? (
              <Input
                value={telNum}
                onChange={telNumHandler}
                onBlur={setTelValidFlag}
                name="phoneNumber"
                required
                readOnly
                type="tel"
                placeholder="-를 제외한 숫자만 입력해주세요."
                width="352px"
                height="45px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                border="1px solid #FFECE0"
                bgColor="#FFECE0"
              />
            ) : (
              <Input
                value={telNum}
                onChange={telNumHandler}
                onBlur={setTelValidFlag}
                name="phoneNumber"
                required
                type="tel"
                placeholder="-를 제외한 숫자만 입력해주세요."
                width="352px"
                height="45px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                border="1px solid #FFECE0"
                bgColor="#FFECE0"
              />
            )}
            {certifiStatus ? (
              <InputBtn></InputBtn>
            ) : (
              <InputBtn onClick={certifiNumGet}>인증번호 발송</InputBtn>
            )}
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
                  height="45px"
                  fontSize="20px"
                  borderRadius="20px 0px 0px 20px"
                  border="1px solid #FFECE0"
                  bgColor="#FFECE0"
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
        {certifiStatus ? (
          <>
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
                  height="45px"
                  fontSize="20px"
                  borderRadius="20px 0px 0px 20px"
                  border="1px solid #FFECE0"
                  bgColor="#FFECE0"
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
                  height="45px"
                  fontSize="20px"
                  borderRadius="20px 0px 0px 20px"
                  border="1px solid #FFECE0"
                  bgColor="#FFECE0"
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
            <Button
              width="200px"
              height="40px"
              fontSize="20px"
              fontWeight="bold"
              bgColor="#FFECE0"
              margin="0px 10px 30px 10px"
              onClick={putPassWord}
            >
              {' '}
              비밀번호 변경하기
            </Button>
          </>
        ) : (
          <></>
        )}
      </PwFindWrap>
      <Link to="/login">로그인하기</Link>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 0px auto;
  margin-top: 100px;
  width: 1180px;
  max-height: 100%;
  min-height: 60vh;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  a {
    text-decoration: none;
    color: #fe802c;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
  }

  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 30px;
    padding: 0px;
  }
`;

const IdFindWrap = styled.div<{ display: string }>`
  border: 3px solid #ffece0;
  border-radius: 20px;
  width: 100%;
  max-height: 100%;
  min-height: 30vh;
  display: ${({ display }) => (display === 'id' ? 'flex' : 'none')};
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 40px;
    font-weight: bold;
    margin: 50px 0px;
  }
`;

const PwFindWrap = styled.div<{ display: string }>`
  border: 3px solid #ffece0;
  border-radius: 20px;
  width: 100%;
  max-height: 100%;
  min-height: 40vh;
  display: ${({ display }) => (display === 'password' ? 'flex' : 'none')};
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 40px;
    font-weight: bold;
    margin: 50px 0px;
  }
`;

const Span = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  background-color: #ffece0;
  @media (max-width: 1200px) {
    width: 100%;
    justify-content: flex-start;
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
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

const ErrWrap = styled.div`
  height: 25px;
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

const SpanPswd = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  background-color: #ffece0;
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

export default FindUser;
