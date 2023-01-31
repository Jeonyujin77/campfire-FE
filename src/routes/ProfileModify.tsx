//라이브러리
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
//api
import { __checkNickDup, __getUser, __putUser } from '../apis/userApi';
//훅
import useInputValid from '../hooks/useInputValid';
// import { convertURLtoFile } from '../hooks/convertURLtoFIle';
import {
  nicknameValid as userNameValid,
  telValid as phoneNumberValid,
} from '../utils/RegExp';
//컴포넌트
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import CheckAuth from '../components/common/CheckAuth';
//이미지
import { NICK_NOT_VALID, TELNUM_NOT_VALID } from '../constant/message';

const ProfileModify = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formData = new FormData();

  const [prevName, setPrevName] = useState(''); //비교할 이전이름
  const [userName, setUserName] = useState(''); //사용자 이름
  const [phoneNumber, setPhoneNumber] = useState(''); //전화번호
  const [profileImg, setProfileImg] = useState<File | string | null>(); //이미지 input
  const [represent, setRepresent] = useState<any>(); //보여줄 사진
  // const [prevFile, setPrevFile] = useState<File | string | null | any>(); //이전 적용되어있던 사진파일

  const [nickDupFlag, setNickDupFlag] = useState(false); // 닉네임중복확인 flag
  const [userNameValidFlag, userNameFlagHandler] = useInputValid(
    userName,
    userNameValid,
  ); // 닉네임검증 flag
  const [phoneNumberValidFlag, setphoneNumberValidFlag] = useInputValid(
    phoneNumber,
    phoneNumberValid,
  ); // 전화번호검증 flag

  //페이지 이동 시 스크롤바 상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(__getUser(Number(localStorage.getItem('userId')))).then(res => {
      const { type, payload } = res;
      //   console.log(type, payload);
      if (type === 'getUser/fulfilled') {
        const {
          userName,
          phoneNumber,
          profileImg,
        }: { userName: string; phoneNumber: string; profileImg: string } =
          payload.user;
        //   console.log(userName, phoneNumber, profileImg);
        setUserName(userName);
        setPhoneNumber(phoneNumber);
        setPrevName(userName);
        // url file 컨버터 작동해야 함
        // setProfileImg(profileImg);
        // let a = convertURLtoFile(profileImg);
        if (profileImg !== undefined) {
          setRepresent(profileImg);
        }
      }
      // 에러처리
      else if (type === 'getUser/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, []);

  // 닉네임 중복검사
  const checkNickDup = () => {
    if (userName === '') return;

    if (userName === prevName) {
      setNickDupFlag(true);
      alert(
        '이전에 사용한 닉네임입니다. \n같은 닉네임을 사용하시려면 수정 완료를 눌러주세요',
      );
      return;
    }

    dispatch(__checkNickDup(userName)).then(res => {
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

  // let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
  const ImgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: any = e.target?.files?.[0];
    //값이 들어왔을 때 검사
    if (value) {
      //확장자 일치하지 않으면 change안됨
      if (
        value.type !== 'image/jpg' &&
        value.type !== 'image/jpeg' &&
        value.type !== 'image/png'
      ) {
        alert('사용 가능한 확장자는 jpg, jpeg, png입니다!');
        return;
      }
      //사이즈 넘으면 change안됨
      if (value.size > 4 * 1024 * 1024) {
        alert('이미지 크기는 최대 5MB입니다!');
        return;
      }
    }
    //검사 다 통과하면 return;이 실행안돼서 setProfileImg가 실행됨
    setProfileImg(value);
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onloadend = () => {
      setRepresent(reader.result);
    };
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const pNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value + '');
  };

  const SubmitProfile = () => {
    //데이터 안넣을 때 유효성 검사
    if (!profileImg) {
      alert('프로필 이미지를 작성해주세요!');
      return;
    }
    if (!userName) {
      alert('사용자 이름을 작성해주세요!');
      return;
    }
    if (!phoneNumber) {
      alert('전화번호를 작성해주세요!');
      return;
    }
    if (!nickDupFlag) {
      alert('이름 중복확인을 실시해주세요!');
      return;
    }

    //다 있으면 formData만들고 dispatch함
    if (
      userName &&
      phoneNumber &&
      profileImg &&
      userNameValidFlag &&
      phoneNumberValidFlag &&
      nickDupFlag
    ) {
      formData.append('userName', userName);
      formData.append('phoneNumber', phoneNumber);
      formData.append('profileImg', profileImg);
      dispatch(
        __putUser({
          userId: Number(localStorage.getItem('userId')),
          formData: formData,
        }),
      ).then(res => {
        const { type, payload } = res;
        if (type === 'putUser/fulfilled') {
          alert(payload.message);
          navigate('/mypage');
        } else if (type === 'putUser/rejected') {
          alert(payload.message);
          navigate('/mypage');
        }
      });
    }
  };

  return (
    <>
      <CheckAuth />
      {userName || profileImg || phoneNumber ? (
        <Wrap>
          <UserInfoDiv>
            <Imgwrap>
              <Img src={represent} alt="프로필사진" />
              <ImgInputWrap>
                <label htmlFor="ex_file">
                  <AddImgButton>사진</AddImgButton>
                </label>
                <input
                  onChange={ImgChangeHandler}
                  id="ex_file"
                  type="file"
                  accept="image/*"
                  // value={a}
                />
              </ImgInputWrap>
            </Imgwrap>
            <InputWrap>
              <InputBox>
                <InputText>이름</InputText>
                <Input
                  width="256px"
                  height="37px"
                  type="text"
                  required
                  value={userName}
                  onChange={nameChange}
                  onBlur={userNameFlagHandler}
                />
                <InputBtn onClick={checkNickDup}>중복확인</InputBtn>
              </InputBox>
              <div style={{ height: '30px' }}>
                {!userNameValidFlag ? <Guide>{NICK_NOT_VALID}</Guide> : <></>}
              </div>
              <InputBox>
                <InputText>번호</InputText>
                <Input
                  width="256px"
                  height="37px"
                  type="tel"
                  required
                  value={phoneNumber}
                  bgColor="transparent"
                  border="none"
                  readOnly
                  onBlur={setphoneNumberValidFlag}
                />
              </InputBox>
              <div>
                {!phoneNumberValidFlag ? (
                  <Guide>{TELNUM_NOT_VALID}</Guide>
                ) : (
                  <></>
                )}
              </div>
            </InputWrap>
            <BtnWrap>
              <Button
                bgColor="#FE802C"
                color="#fff"
                onClick={() => {
                  if (window.confirm('작성한 내용으로 수정하시겠습니까?')) {
                    SubmitProfile();
                  }
                }}
              >
                수정 완료
              </Button>
              <Button
                bgColor="#A1C182"
                color="#fff"
                onClick={() => {
                  if (window.confirm('프로필 수정을 취소하시겠습니까?')) {
                    navigate(-1);
                  }
                }}
              >
                수정 취소
              </Button>
            </BtnWrap>
          </UserInfoDiv>
        </Wrap>
      ) : null}
    </>
  );
};

const Wrap = styled.div`
  margin: 200px auto;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  padding-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 1200px) {
    width: 100%;
    margin: 100px auto;
  }
`;

const Imgwrap = styled.div`
  width: 130px;
  height: 130px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  @media (max-width: 1200px) {
    width: 100px;
    height: 100px;
    padding: 20px 0;
  }
`;

const Img = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  @media (max-width: 1200px) {
    width: 100px;
    height: 100px;
  }
`;

const ImgInputWrap = styled.div`
  height: 130px;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
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

const AddImgButton = styled.span`
  position: absolute;
  right: 10px;
  bottom: 5px;
  width: 38px;
  height: 28px;
  display: block;
  background-color: #d9d9d9;
  border-radius: 9px;
  font-size: 12px;
  line-height: 28px;
  text-align: center;
`;

const UserInfoDiv = styled.div`
  width: 895px;
  height: 202px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffece0;
  border-radius: 101px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    flex-direction: column;
    padding: 20px 0;
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 3%;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  input {
    border-radius: 101px;
  }
`;

const InputText = styled.div`
  min-width: 40px;
  font-size: 16px;
  display: inline-block;
  color: #888888;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2%;

  @media (max-width: 900px) {
    flex-direction: column;
  }
  @media (min-width: 900px) {
    button {
      width: 128px;
      height: 83px;
      line-height: 83px;
      border-radius: 101px;
      margin: 5px;
    }
  }
`;

const Guide = styled.span`
  display: block;
  color: red;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;

const InputBtn = styled.span`
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  min-width: 50px;
`;

export default ProfileModify;
