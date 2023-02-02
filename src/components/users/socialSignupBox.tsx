//라이브러리
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import ReactGa from 'react-ga';
//api
import {
  __certifiTest,
  __checkEmailDup,
  __checkNickDup,
  __getCertifiNum,
  __signup,
  __Socialsignup,
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

interface SocialState {
  kakaoemail: string;
  kakaoprofileImg: string;
  kakaoprovider: string;
  kakaouserName: string;
  kakaosnsId: any;
}

const SocialSignupBox = ({
  kakaoemail,
  kakaoprofileImg,
  kakaoprovider,
  kakaouserName,
  kakaosnsId,
}: SocialState) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      category: '소셜 회원가입 페이지',
      action: '인증번호 요청',
    });
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
    ReactGa.event({
      category: '소셜 회원가입 페이지',
      action: '인증번호 검증',
    });
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
    ReactGa.event({
      category: '소셜 회원가입 페이지',
      action: '회원가입 버튼',
    });

    // 입력값 검증 및 중복확인이 정상이면
    if (getCertifiStatus && certifiStatus) {
      const userInfo = {
        email: kakaoemail,
        userName: kakaouserName,
        password: null,
        phoneNumber: telNum,
        profileImg: kakaoprofileImg,
        provider: kakaoprovider,
        snsId: kakaosnsId,
      };
      dispatch(__Socialsignup(userInfo)).then(res => {
        const { type, payload } = res;
        if (type === 'Socialsignup/fulfilled') {
          alert('가입이 완료되었습니다!');
          localStorage.setItem('userId', payload.userId);
          window.location.href = '/';
        } else if (type === 'Socialsignup/rejected') {
          alert(`${payload.response.data.errorMessage}`);
          window.location.href = '/login';
        }
      });
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
                value={kakaoemail}
                readOnly
                outline="none"
                name="email"
                type="email"
                placeholder="example123@email.com"
                width="352px"
                height="59px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                bgColor="#D9D9D9"
              />
              <InputBtn></InputBtn>
            </Span>
            <ErrWrap />
          </div>
          <div>
            <Span>
              <Input
                required
                value={kakaouserName}
                readOnly
                outline="none"
                name="userName"
                type="text"
                placeholder="닉네임"
                width="352px"
                height="59px"
                fontSize="20px"
                borderRadius="20px 0px 0px 20px"
                bgColor="#D9D9D9"
              />
              <InputBtn></InputBtn>
            </Span>
            <ErrWrap />
          </div>
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

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  margin-bottom: 10px;
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
  max-height: 100%;
  min-height: 350px;
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

export default SocialSignupBox;
