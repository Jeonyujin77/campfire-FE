import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAppDispatch } from '../redux/store';
import addbuttonimg from '../asset/addbutton.png';
import { __getUser } from '../apis/userApi';
import { convertURLtoFile } from '../hooks/convertURLtoFIle';

const ProfileModify = () => {
  //페이지 이동 시 스크롤바 상단으로 이동
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImg, setProfileImg] = useState<File | string | null>();
  const [represent, setRepresent] = useState<string | undefined>();
  const [prevFile, setPrevFile] = useState<File | string | null | any>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formData = new FormData();

  let a;
  let b;

  useEffect(() => {
    dispatch(__getUser(Number(localStorage.getItem('userId')))).then(res => {
      const { type, payload } = res;
      //   console.log(type, payload);
      const {
        userName,
        phoneNumber,
        profileImg,
      }: { userName: string; phoneNumber: string; profileImg: string } =
        payload.user;
      //   console.log(userName, phoneNumber, profileImg);
      setUserName(userName);
      setPhoneNumber(phoneNumber);
      setProfileImg(profileImg);
      let a = convertURLtoFile(profileImg);
      if (profileImg !== undefined) {
        setRepresent(profileImg);
      }
    });
  }, []);

  const ImgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target?.files?.[0];
    setProfileImg(value);
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const pNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 3) {
      e.target.value = e.target.value + '-';
    }
    if (e.target.value.length === 8) {
      e.target.value = e.target.value + '-';
    }
    // if (e.target.value.length === )
    setPhoneNumber(e.target.value);
  };

  const SubmitProfile = () => {
    if (userName && phoneNumber && profileImg) {
      formData.append('userName', userName);
      formData.append('phoneNumber', phoneNumber);
      formData.append('profileImg', profileImg);
    }
  };

  return (
    <>
      {userName ? (
        <Wrap>
          <OverWrap>
            <Imgwrap>
              <Img src={represent} alt="프로필사진" />
              <ImgInputWrap>
                <label htmlFor="ex_file">
                  <div>
                    <img src={addbuttonimg} alt="버튼이미지" />
                  </div>
                </label>
                <input
                  onChange={ImgChangeHandler}
                  id="ex_file"
                  type="file"
                  accept="image/*"
                  value={a}
                />
              </ImgInputWrap>
            </Imgwrap>
            <InputWrap>
              <InputBox>
                <InputText>사용자 이름 : </InputText>
                <InputText>전화번호 : </InputText>
              </InputBox>
              <InputBox>
                <Input value={userName} onChange={nameChange} type="text" />
                <Input value={phoneNumber} onChange={pNumChange} type="text" />
              </InputBox>
            </InputWrap>
            <BtnWrap>
              <Button
                onClick={() => {
                  if (window.confirm('작성한 내용으로 수정하시겠습니까?')) {
                    SubmitProfile();
                    // dispatch(__()).then(()=>{
                    alert('작성이 완료되었습니다!');
                    navigate(-1);
                    // })
                  }
                }}
              >
                수정 완료
              </Button>
              <Button
                onClick={() => {
                  if (window.confirm('프로필 수정을 취소하시겠습니까?')) {
                    navigate(-1);
                  }
                }}
              >
                수정 취소
              </Button>
            </BtnWrap>
          </OverWrap>
        </Wrap>
      ) : null}
    </>
  );
};

const Wrap = styled.div`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 100px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  padding-top: 10px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const OverWrap = styled.div`
  border: 1px solid black;
  width: 800px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const Imgwrap = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Img = styled.img`
  width: 240px;
  height: 240px;
`;

const ImgInputWrap = styled.div`
  border: 1px solid red;
  height: 240px;
  display: flex;
  flex-direction: column-reverse;
  img {
    width: 70px;
    height: 70px;
  }
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const InputWrap = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const InputText = styled.div`
  /* border: 1px solid purple; */
  width: 150px;
  font-size: 22px;
  font-weight: bold;
  text-align: right;
`;

const Input = styled.input`
  height: 26px;
  font-size: 20px;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
`;

export default ProfileModify;
