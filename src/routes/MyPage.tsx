//라이브러리
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import ReactGa from 'react-ga';
//api
import { __getUser } from '../apis/userApi';
//컴포넌트
import WithdrawalModal from '../components/users/WithdrawalModal';
import MyLikeList from '../components/users/MyLikeList';
import MyReservationModal from '../components/users/MyreservationModal';
import Button from '../components/common/Button';
//이미지
import modifyIcon from '../asset/mypageIcons/modifyIcon.png';
import myReservationIcon from '../asset/mypageIcons/myReservationIcon.png';
import userLikedIcon from '../asset/mypageIcons/userLikedIcon.png';
import logout_normal from '../asset/mypageIcons/logout_normal.png';
import logout_hover from '../asset/mypageIcons/logout_hover.png';
import withdrawal_normal from '../asset/mypageIcons/withdrawal_normal.png';
import withdrawal_hover from '../asset/mypageIcons/withdrawal_hover.png';

const MyPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isLikeOpen, setIsLikeOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [accesstoken, setAccesstoken] = useState<string | null>(null);
  const [refreshtoken, setRefreshtoken] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [represent, setRepresent] = useState<string | undefined>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken') &&
      localStorage.getItem('userId')
    ) {
      setAccesstoken(localStorage.getItem('accessToken'));
      setRefreshtoken(localStorage.getItem('refreshToken'));
      getUser();
    } else {
      window.location.href = '/login';
    }
  }, []);

  // 사용자 정보 조회
  const getUser = () => {
    dispatch(__getUser()).then(res => {
      const { type, payload } = res;

      if (type === 'getUser/fulfilled') {
        const {
          userName,
          profileImg,
          phoneNumber,
          email,
        }: {
          userName: string;
          profileImg: string;
          phoneNumber: string;
          email: string;
        } = payload.user;
        setUserName(userName);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        if (profileImg !== undefined) {
          setRepresent(profileImg);
        }
      }
      // 에러처리
      else if (type === 'getUser/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  // 로그아웃
  const logOut = () => {
    ReactGa.event({
      category: '마이 페이지',
      action: '로그아웃',
    });
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const [logoutHover, setLogoutHover] = useState(false);
  const [withdrawalHover, setWithdrawalHover] = useState(false);
  //버튼 onmouseOver함수
  const logoutOver = () => {
    setLogoutHover(true);
  };
  const withdrawalOver = () => {
    setWithdrawalHover(true);
  };
  const logoutOut = () => {
    setLogoutHover(false);
  };
  const withdrawalOut = () => {
    setWithdrawalHover(false);
  };

  return (
    <>
      <MyReservationModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <MyLikeList isLikeOpen={isLikeOpen} setIsLikeOpen={setIsLikeOpen} />
      <WithdrawalModal
        isWithdrawalOpen={isWithdrawalOpen}
        setIsWithdrawalOpen={setIsWithdrawalOpen}
      />
      <Wrap>
        <UserInfoDiv>
          <ProfileImg src={represent} alt="유저 프로필이미지" />
          <UserInfo>
            <p>
              <label>이름</label>
              {userName}
            </p>
            <p>
              <label>번호</label>
              {phoneNumber}
            </p>
            <p>
              <label>ID</label>
              {email}
            </p>
          </UserInfo>
        </UserInfoDiv>
        <IconsDiv>
          <IconsTop>
            <Icons>
              <Icon
                onClick={() => {
                  if (
                    accesstoken &&
                    accesstoken !== 'undefined' &&
                    refreshtoken &&
                    refreshtoken !== 'undefined'
                  ) {
                    setIsOpen(!isOpen);
                  } else {
                    alert('로그인 해주세요!');
                  }
                }}
              >
                <img src={myReservationIcon} alt="내예약 아이콘" />
                <div>내 예약</div>
              </Icon>
              <Icon
                onClick={() => {
                  if (
                    accesstoken &&
                    accesstoken !== 'undefined' &&
                    refreshtoken &&
                    refreshtoken !== 'undefined'
                  ) {
                    navigate('/mypage/edit');
                  } else {
                    alert('로그인 해주세요!');
                  }
                }}
              >
                <img src={modifyIcon} alt="프로필수정 아이콘" />
                <div>프로필 수정</div>
              </Icon>
              <Icon
                onClick={() => {
                  if (
                    accesstoken &&
                    accesstoken !== 'undefined' &&
                    refreshtoken &&
                    refreshtoken !== 'undefined'
                  ) {
                    setIsLikeOpen(!isOpen);
                  } else {
                    alert('로그인 해주세요!');
                  }
                }}
              >
                <img src={userLikedIcon} alt="찜한 캠핑장 아이콘" />
                <div>찜한 캠핑장</div>
              </Icon>
            </Icons>
          </IconsTop>
        </IconsDiv>
        <BottomBtns>
          <Button
            onClick={logOut}
            width="180px"
            height="50px"
            fontSize="15px"
            fontWeight="bold"
            margin="10px 10px"
            bgColor="#E7E7E7"
            color="#1F1F1F"
            display="flex"
            gap="20px"
            hBgColor="#A1C182"
            hColor="white"
            borderRadius="25px"
            onMouseOver={logoutOver}
            onMouseOut={logoutOut}
          >
            {logoutHover ? (
              <BtnIcon src={logout_hover} />
            ) : (
              <BtnIcon src={logout_normal} />
            )}
            로그아웃
          </Button>
          <Button
            onClick={() => {
              setIsWithdrawalOpen(!isWithdrawalOpen);
            }}
            width="180px"
            height="50px"
            fontSize="15px"
            fontWeight="bold"
            margin="10px 10px"
            bgColor="#E7E7E7"
            color="#1F1F1F"
            display="flex"
            gap="20px"
            hBgColor="#A1C182"
            hColor="white"
            borderRadius="25px"
            onMouseOver={withdrawalOver}
            onMouseOut={withdrawalOut}
          >
            {withdrawalHover ? (
              <BtnIcon src={withdrawal_hover} />
            ) : (
              <BtnIcon src={withdrawal_normal} />
            )}
            회원탈퇴
          </Button>
        </BottomBtns>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin: 150px auto;
  width: 1200px;
  max-height: 100%;
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

const UserInfoDiv = styled.div`
  width: 895px;
  height: 202px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffece0;
  border-radius: 101px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const UserInfo = styled.div`
  margin-left: 5%;
  font-size: 16px;
  label {
    display: inline-block;
    color: #888888;
    width: 50px;
  }

  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 600px) {
    label {
      display: block;
    }
  }
`;

const ProfileImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  @media (max-width: 1200px) {
    width: 100px;
    height: 100px;
  }
`;

const IconsDiv = styled.div`
  width: 900px;
  max-height: 100%;
  min-height: 159px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const IconsTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  background-color: #ffece0;
  width: 100%;
  padding: 10px;
  max-height: 100%;
  min-height: 104px;
  border-radius: 52px;

  @media (max-width: 1200px) {
    width: 90%;
    gap: 20px;
    flex-direction: column;
  }
`;

const Icon = styled.div`
  width: 266px;
  height: 64px;
  background-color: white;
  border-radius: 67px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  justify-content: flex-start;
  gap: 40px;
  cursor: pointer;

  img {
    margin-left: 20px;
    width: 44px;
    height: 44px;
  }

  @media (max-width: 1200px) {
    font-size: 14px;
    img {
      width: 44px;
      height: 44px;
    }
  }
`;

const BottomBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    button {
      width: 140px;
    }
  }
`;

const BtnIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export default MyPage;
