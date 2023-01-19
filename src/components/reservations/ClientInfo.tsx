//라이브러리
import styled from '@emotion/styled';

interface UserInfo {
  userName: string;
  phoneNum: string;
  userEmail: string;
  userRequest: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNum: React.Dispatch<React.SetStateAction<string>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  setUserRequest: React.Dispatch<React.SetStateAction<string>>;
}

const ClientInfo = ({
  userName,
  phoneNum,
  userEmail,
  userRequest,
  setUserName,
  setPhoneNum,
  setUserEmail,
  setUserRequest,
}: UserInfo) => {
  return (
    <TextBox>
      <TextBoxHeader>예약자 정보</TextBoxHeader>
      <TextBoxBody>
        <InputTextBox>
          <InputText>이름(필수)</InputText>
          <InputText>연락처(필수)</InputText>
          <InputText>이메일(선택)</InputText>
          <InputText>요청사항(선택)</InputText>
        </InputTextBox>
        <InputBox>
          <Input
            placeholder="이름, 연략처는 유효성검사 해줘야함"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(e.target.value);
            }}
          />
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneNum(e.target.value);
            }}
          />
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserEmail(e.target.value);
            }}
          />
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserRequest(e.target.value);
            }}
          />
        </InputBox>
      </TextBoxBody>
    </TextBox>
  );
};

const TextBox = styled.div<{
  minHeight?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
}>`
  border: 1px solid black;
  margin: 0px 20px 5px 20px;
  width: 1160px;
  min-height: ${({ minHeight }) => (minHeight ? minHeight : '200px')};
  max-height: 100%;
  display: ${({ display }) => (display ? display : 'block')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'flex-start')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'flex-start'};
`;

const TextBoxHeader = styled.div`
  margin: 20px 20px 0px 20px;
  font-size: 27px;
  font-weight: bold;
`;

const TextBoxBody = styled.div`
  margin: 15px 30px 20px 30px;
  font-weight: 600;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

const InputTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const InputText = styled.div`
  border: 1px solid blue;
  width: 150px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Input = styled.input`
  width: 400px;
  height: 26px;
`;

export default ClientInfo;
