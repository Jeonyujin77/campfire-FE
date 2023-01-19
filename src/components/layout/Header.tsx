//라이브러리
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
//컴포넌트
import TopButton from '../common/TopButton';
import Logo from '../common/Logo';
//이미지
import HeaderImg from '../../asset/HeaderImg.png';

const Header = () => {
  const navigate = useNavigate();

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
  margin-right: 1000px;

  @media (max-width: 1200px) {
    margin: 0 auto;
  }
`;

export default Header;
