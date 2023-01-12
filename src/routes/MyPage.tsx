import styled from '@emotion/styled';
import noprofileImg from '../asset/noprofileImg.png';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyReservationModal from '../components/users/MyreservationModal';
import UserIcones from '../components/users/UserIcones';
import { useAppDispatch } from '../redux/store';
import { __getUser } from '../apis/userApi';
import WithdrawalModal from '../components/users/WithdrawalModal';

const MyPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  const [accesstoken, setAccesstoken] = useState<string | null>(null);
  const [refreshtoken, setRefreshtoken] = useState<string | null>(null);
  useEffect(() => {
    setAccesstoken(localStorage.getItem('accessToken'));
    setRefreshtoken(localStorage.getItem('refreshToken'));
  }, []);

  const [userName, setUserName] = useState('');
  const [represent, setRepresent] = useState<string | undefined>();

  useEffect(() => {
    dispatch(__getUser(Number(localStorage.getItem('userId')))).then(res => {
      const { type, payload } = res;
      //   console.log(type, payload);
      const { userName, profileImg }: { userName: string; profileImg: string } =
        payload.user;
      //   console.log(userName, phoneNumber, profileImg);
      setUserName(userName);
      if (profileImg !== undefined) {
        setRepresent(profileImg);
      }
    });
  }, []);

  return (
    <>
      <MyReservationModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <WithdrawalModal
        isWithdrawalOpen={isWithdrawalOpen}
        setIsWithdrawalOpen={setIsWithdrawalOpen}
      />
      <Wrap>
        {accesstoken &&
        accesstoken !== 'undefined' &&
        refreshtoken &&
        refreshtoken !== 'undefined' &&
        represent &&
        userName ? (
          <div>
            <ProfileImg src={represent} alt="유저 프로필이미지" />
            <div>
              <p>{userName}</p>
            </div>
          </div>
        ) : (
          <MyPageDiv
            onClick={() => {
              navigate('/login');
            }}
          >
            <div>
              <ProfileImg src={noprofileImg} alt="유저 프로필이미지" />
            </div>
            <div>
              <p>[로그인 또는 회원가입]</p>
              <span>로그인을 해주세요!</span>
            </div>
          </MyPageDiv>
        )}
        <IconsDiv>
          <IconsTop>
            <Icon
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img src="https://via.placeholder.com/80" alt="내예약 이미지" />
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
              <img
                src="https://via.placeholder.com/80"
                alt="프로필수정 이미지"
              />
              <div>프로필 수정</div>
            </Icon>
            <Icon>~~~</Icon>
            <Icon>~~~</Icon>
          </IconsTop>
          <IconsTop>
            <Icon>~~~</Icon>
            <Icon>~~~</Icon>
            <Icon>~~~</Icon>
            <Icon
              onClick={() => {
                setIsWithdrawalOpen(!isWithdrawalOpen);
              }}
            >
              <img
                src="https://via.placeholder.com/80"
                alt="프로필수정 이미지"
              />
              <div>회원 탈퇴</div>
            </Icon>
          </IconsTop>
        </IconsDiv>
      </Wrap>
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

const MyPageDiv = styled.div`
  border: 1px solid black;
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 300px;
  height: 300px;
  border: 1px solid blue;
  /* border-radius: 150px; */
`;

const IconsDiv = styled.div`
  border: 1px solid black;
  width: 760px;
  height: 260px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const IconsTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Icon = styled.div`
  border: 1px solid blue;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

export default MyPage;
