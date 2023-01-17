import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Footer = () => {
  const navigate = useNavigate();

  //토큰
  const [accesstoken, setAccesstoken] = useState<any>();
  const [refreshtoken, setRefreshtoken] = useState<any>();
  useEffect(() => {
    setAccesstoken(localStorage.getItem('accessToken'));
    setRefreshtoken(localStorage.getItem('refreshToken'));
  }, []);

  //onClick
  const logOut = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };
  const logIn = () => {
    localStorage.clear();
    navigate('/login');
  };
  const signUp = () => {
    localStorage.clear();
    navigate('/signup');
  };
  const goToHome = () => {
    window.location.href = '/';
  };
  const goToSearch = () => {
    window.location.href = '/search';
  };

  return (
    <FooterWrapper>
      <FooterMenu>
        <Menu onClick={goToHome}>홈</Menu>
        <Menu onClick={goToSearch}>검색</Menu>
        <Menu>
          <Link to="/mypage">마이페이지</Link>
        </Menu>
        {accesstoken && refreshtoken ? (
          <Button
            margin="0px 5px"
            onClick={logOut}
            width="70px"
            bgColor="transparent"
            fontSize="16px"
            hColor="rgb(254, 128, 44)"
          >
            로그아웃
          </Button>
        ) : (
          <>
            <Button
              margin="0px 5px"
              onClick={logIn}
              width="70px"
              bgColor="transparent"
              fontSize="16px"
              hColor="rgb(254, 128, 44)"
            >
              로그인
            </Button>
            <Button
              margin="0px 5px"
              onClick={signUp}
              width="70px"
              bgColor="transparent"
              fontSize="16px"
              hColor="rgb(254, 128, 44)"
            >
              회원가입
            </Button>
          </>
        )}
      </FooterMenu>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  background-color: whitesmoke;
  z-index: 1000;
`;

const FooterMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  button {
    font-size: 14px;
  }
`;

const Menu = styled.div`
  min-width: 50px;
  text-align: center;
  margin: 0 5px;
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
`;

export default Footer;
