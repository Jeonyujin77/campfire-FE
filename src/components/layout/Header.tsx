import styled from '@emotion/styled';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderImg from '../../asset/HeaderImg.png';
import TopButton from '../common/TopButton';

const Header = () => {
  const navigate = useNavigate();

  // const [accesstoken, setAccesstoken] = useState<any>();
  // const [refreshtoken, setRefreshtoken] = useState<any>();

  // useEffect(() => {
  //   setAccesstoken(localStorage.getItem('accessToken'));
  //   setRefreshtoken(localStorage.getItem('refreshToken'));
  // }, []);

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
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: flex-start;
  color: black;
  padding: 10px 0px;
  /* border-bottom: 1px solid blue; */
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 160px;
  margin-right: 1000px;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 320px;
  /* border: 1px solid black; */
`;

export default Header;
