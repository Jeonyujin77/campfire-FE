import styled from 'styled-components';
import { useState } from 'react';

interface User {
  email: string;
  userName: string;
  password: string;
  phoneNumber: number;
}

const SignupBox = () => {
  const [user, setUser] = useState<User>({
    email: '',
    userName: '',
    password: '',
    phoneNumber: 0,
  });

  // 아이디, 비밀번호, 비밀번호 확인, 이름
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userName, setUserName] = useState('');

  //비밀번호 value 보이기, 숨기기
  const [showPswd, setShowPswd] = useState(false);
  const [showPswdCheck, setShowPswdCheck] = useState(false);

  // 유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isNickName, setIsNickName] = useState(false);

  const userChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  return (
    <SignupWrap>
      <InputWrap>
        <div>아이디</div>
        <Span>
          <Input
            placeholder="아이디를 입력해주세요 ex)aaaaaa@aaaa.com"
            name="email"
            onChange={userChangeHandler}
          />
          <InputBtn>중복확인</InputBtn>
        </Span>
        <div>이름</div>
        <Span>
          <Input name="userName" onChange={userChangeHandler} />
          <InputBtn>중복확인</InputBtn>
        </Span>
        <div>비밀번호</div>
        <SpanPswd>
          <Input
            type={showPswd ? 'text' : 'password'}
            name="password"
            onChange={userChangeHandler}
          />
          <InputBtn
            onClick={() => {
              setShowPswd(!showPswd);
            }}
          >
            {' '}
            비밀번호
          </InputBtn>
        </SpanPswd>
        <div>비밀번호확인</div>
        <SpanPswd>
          <Input
            type={showPswdCheck ? 'text' : 'password'}
            name="passwordCheck"
          />
          <InputBtn
            onClick={() => {
              setShowPswdCheck(!showPswdCheck);
            }}
          >
            {' '}
            비밀번호 확인
          </InputBtn>
        </SpanPswd>
        <div>전화번호</div>
        <Span>
          <Input
            placeholder="숫자만 입력해주세요 ex)01000000000"
            name="phoneNumber"
            onChange={userChangeHandler}
          />
        </Span>
      </InputWrap>
    </SignupWrap>
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
  padding: 10px;
  border: 1px solid red;
  width: 400px;
  height: auto;
  font-size: 25px;
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
`;

export default SignupBox;
