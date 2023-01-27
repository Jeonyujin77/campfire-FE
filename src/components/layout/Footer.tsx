//라이브러리
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  //토큰
  const [accesstoken, setAccesstoken] = useState<any>();
  const [refreshtoken, setRefreshtoken] = useState<any>();

  useEffect(() => {
    setAccesstoken(localStorage.getItem('accessToken'));
    setRefreshtoken(localStorage.getItem('refreshToken'));
  }, []);

  const goToHome = () => {
    window.location.href = '/';
  };
  const goToSearch = () => {
    window.location.href = '/search';
  };
  const goToHostPage = () => {
    window.open('https://campfire-host-fe.vercel.app/');
  };

  return (
    <FooterWrapper>
      <FooterMenu>
        {accesstoken && refreshtoken ? (
          <>
            <Menu onClick={goToHome}>홈</Menu>
            <Menu onClick={goToSearch}>검색</Menu>
            <Menu>
              <Link to="/mypage">마이페이지</Link>
            </Menu>
          </>
        ) : (
          <>
            <Menu>
              <Link to="/login">로그인</Link>
            </Menu>
            <Menu>
              <Link to="/signup">회원가입</Link>
            </Menu>
          </>
        )}
        <Menu onClick={goToHostPage}>관리자모드</Menu>
      </FooterMenu>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  background-color: whitesmoke;
  z-index: 1000;

  @media (max-width: 1200px) {
    display: block;
  }
`;

const FooterMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const Menu = styled.div`
  text-align: center;
  margin: 0 3%;
  cursor: pointer;
  &:hover {
    color: rgb(254, 128, 44);
  }

  a {
    width: 100%;
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
  a.active {
    color: rgb(254, 128, 44);
  }
`;

export default Footer;
