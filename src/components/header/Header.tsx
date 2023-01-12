import styled from '@emotion/styled';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();

  const [accesstoken, setAccesstoken] = useState<any>();
  const [refreshtoken, setRefreshtoken] = useState<any>();

  useEffect(() => {
    setAccesstoken(localStorage.getItem('accessToken'));
    setRefreshtoken(localStorage.getItem('refreshToken'));
  }, []);

  return (
    <HeaderComponent>
      <LogoDiv
        onClick={() => {
          navigate('/');
        }}
      >
        <Logo />
      </LogoDiv>
      <BtnWrap>
        <Button
          onClick={() => {
            localStorage.clear();
            navigate('/');
            window.location.reload();
          }}
          bgColor="white"
          width="80px"
          display={
            accesstoken &&
            refreshtoken &&
            accesstoken !== 'undefined' &&
            refreshtoken !== 'undefined'
              ? ''
              : 'none'
          }
        >
          로그아웃
        </Button>
        <Button
          onClick={() => {
            navigate('/login');
          }}
          bgColor="white"
          width="60px"
          display={
            accesstoken &&
            refreshtoken &&
            accesstoken !== 'undefined' &&
            refreshtoken !== 'undefined'
              ? 'none'
              : ''
          }
        >
          로그인
        </Button>
        <Button
          onClick={() => {
            navigate('/signup');
          }}
          bgColor="white"
          width="80px"
          display={
            accesstoken &&
            refreshtoken &&
            accesstoken !== 'undefined' &&
            refreshtoken !== 'undefined'
              ? 'none'
              : ''
          }
        >
          회원가입
        </Button>
        <Button
          onClick={() => {
            navigate('/mypage');
          }}
          bgColor="white"
        >
          마이페이지
        </Button>
      </BtnWrap>
    </HeaderComponent>
  );
};

const HeaderComponent = styled.div`
  position: fixed;
  left: 50%;
  top: 0;
  z-index: 1000;
  transform: translateX(-50%);
  width: 100%;
  height: auto;
  background-color: white;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  color: black;
  padding: 10px 0px;
  border-bottom: 1px solid blue;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export default Header;
