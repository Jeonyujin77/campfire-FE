import styled from '@emotion/styled';
import noprofileImg from '../asset/noprofileImg.png';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyReservationModal from '../components/users/MyreservationModal';

const MyPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [accesstoken, setAccesstoken] = useState<string | null>(null);
  useEffect(() => {
    setAccesstoken(localStorage.getItem('accesstoken'));
  }, []);

  return (
    <>
      <MyReservationModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Wrap>
        {accesstoken && accesstoken !== 'undefined' ? (
          <div>
            <ProfileImg src={noprofileImg} alt="유저 프로필이미지" />
            <div>
              <p>userName</p>
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
                alert('내 예약 불러오기 get명령 필요!');
              }}
            >
              <img src="https://via.placeholder.com/80" alt="내예약 이미지" />
              <div>내 예약</div>
            </Icon>
            <Icon>~~~</Icon>
            <Icon>~~~</Icon>
            <Icon>~~~</Icon>
          </IconsTop>
          <IconsTop>
            <Icon>~~~</Icon>
            <Icon>~~~</Icon>
            <Icon>~~~</Icon>
            <Icon>~~~</Icon>
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
`;

export default MyPage;
