//라이브러리
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
//컴포넌트
import TopButton from '../common/TopButton';
import Logo from '../common/Logo';
//이미지
import HeaderImg from '../../asset/HeaderImg.png';
import { Link } from 'react-router-dom';

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

  return (
    <>
      <HeaderComponent>
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
              <div>
                <Link to="/login">로그인</Link>
              </div>
              <div>
                <Link to="/signup">회원가입</Link>
              </div>
            </>
          ) : (
            <>
              <div onClick={goToHome}>홈</div>
              <div onClick={goToSearch}>검색</div>
              <div>
                <Link to="/mypage">마이페이지</Link>
              </div>
            </>
          )}
          <div
            onClick={() => {
              window.open('https://campfire-host-fe.vercel.app/');
            }}
          >
            관리자모드
          </div>
        </MenuBar>
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
  height: 125px;
  background-image: url(${HeaderImg});
  background-repeat: no-repeat;
  background-size: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: flex-start;
  color: black;
  padding: 10px 0px;

  @media (max-width: 1200px) {
    height: 50px;
    background-image: none;
    background-color: rgb(254, 128, 44);
  }
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 160px;
  margin-right: 33%;

  @media (max-width: 1200px) {
    margin: 0 auto;
  }
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;

  div {
    cursor: pointer;
    margin: 0 20px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 18px;
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

export default Header;
