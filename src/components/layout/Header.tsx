//라이브러리
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//컴포넌트
import TopButton from '../common/TopButton';
import Logo from '../common/Logo';
//이미지
import HeaderImg from '../../asset/HeaderImg.png';
import { Link } from 'react-router-dom';
import headerBgLeft from '../../asset/headerImg/headerBgLeft.png';
import headerBgRight from '../../asset/headerImg/headerBgRight.png';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')
      ? true
      : false;

  const goToHome = () => {
    window.location.href = '/';
  };
  const goToSearch = () => {
    window.location.href = '/search';
  };

  const [homeURL, setHomeURL] = useState<boolean>();
  const [searchURL, setSearchURL] = useState<boolean>();
  const [mypageURL, setMypageURL] = useState<boolean>();
  const [signupURL, setSignupURL] = useState<boolean>();

  useEffect(() => {
    switch (window.location.pathname.split('/')[1]) {
      case '':
      case 'login': {
        setHomeURL(true);
        setSearchURL(false);
        setMypageURL(false);
        setSignupURL(false);
        break;
      }
      case 'search': {
        setHomeURL(false);
        setSearchURL(true);
        setMypageURL(false);
        setSignupURL(false);
        break;
      }
      case 'mypage': {
        setHomeURL(false);
        setSearchURL(false);
        setMypageURL(true);
        setSignupURL(false);
        break;
      }
      case 'signup': {
        setHomeURL(false);
        setSearchURL(false);
        setMypageURL(false);
        setSignupURL(true);
        break;
      }
      default: {
        setHomeURL(false);
        setSearchURL(false);
        setMypageURL(false);
        setSignupURL(false);
        break;
      }
    }
  }, [window.location.pathname]);

  return (
    <>
      <HeaderComponent>
        <HeaderLeftImg src={headerBgLeft} />
        <LogoDiv
          onClick={() => {
            navigate('/');
          }}
        >
          <Logo />
        </LogoDiv>
        <MenuBar>
          {!isLoggedIn ? (
            <>
              <MenuBarItem URL={homeURL}>
                <Link to="/login">로그인</Link>
              </MenuBarItem>
              <MenuBarItem URL={signupURL}>
                <Link to="/signup">회원가입</Link>
              </MenuBarItem>
            </>
          ) : (
            <>
              <MenuBarItem URL={homeURL} onClick={goToHome}>
                홈
              </MenuBarItem>
              <MenuBarItem URL={searchURL} onClick={goToSearch}>
                검색
              </MenuBarItem>
              <MenuBarItem URL={mypageURL}>
                <Link to="/mypage">마이페이지</Link>
              </MenuBarItem>
            </>
          )}
          <MenuBarItem
            onClick={() => {
              window.open('https://campfire-host-fe.vercel.app/');
            }}
          >
            관리자모드
          </MenuBarItem>
        </MenuBar>
        <HeaderRightImg src={headerBgRight} />
      </HeaderComponent>
      <TopButton />
    </>
  );
};

const HeaderComponent = styled.div`
  position: fixed;
  left: 50%;
  top: 0;
  z-index: 1000;
  transform: translateX(-50%);
  width: 100%;
  height: 112px;
  background-color: #fe802c;
  /* background-image: url(${HeaderImg});
  background-repeat: no-repeat;
  background-size: 100%;
  background-size: cover; */
  display: flex;
  align-items: flex-end;
  text-align: center;
  justify-content: space-between;
  flex-wrap: wrap;
  color: black;
  /* padding: 10px 0px; */

  @media (max-width: 1200px) {
    height: 50px;
    background-image: none;
    background-color: rgb(254, 128, 44);
  }
`;

const HeaderLeftImg = styled.img`
  position: relative;
  z-index: 1100;
  width: 128px;
  height: 94px;
  /* height: 100%; */
  /* border: 1px solid black; */
  bottom: 0px;
  left: 0px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const HeaderRightImg = styled.img`
  position: relative;
  z-index: 1100;
  width: 266px;
  height: 80px;
  /* height: 100%; */
  /* border: 1px solid black; */
  bottom: 0px;
  right: 0px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 130px;
  margin-right: 33%;
  height: 100%;

  @media (max-width: 1750px) {
    margin-right: 20%;
  }

  @media (max-width: 1470px) {
    margin-right: 0px;
  }

  @media (max-width: 1200px) {
    margin: 0 auto;
  }
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 100%;

  div {
    cursor: pointer;
    margin: 0 20px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const MenuBarItem = styled.div<{ URL?: boolean }>`
  cursor: pointer;
  margin: 0 20px;
  height: 100%;
  line-height: 30px;
  font-size: 18px;
  border-bottom: ${({ URL }) => (URL ? '5px solid #A1C182' : 'none')};
  font-weight: ${({ URL }) => (URL ? 'bold' : 'normal')};
`;

export default Header;
