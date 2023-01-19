//라이브러리
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
//컴포넌트
import CheckAuth from '../components/common/CheckAuth';
import CampItemList from '../components/camps/campItemList';

const Home = () => {
  //페이지 이동 시 스크롤바 상단으로 이동
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Wrap>
      <CheckAuth />
      <HomeTitle>쉽고 편한 캠핑장 예약 시스템 캠프파이어</HomeTitle>
      <CampItemList />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 0px auto;
  margin-top: 120px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const HomeTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  color: rgb(254, 128, 44);

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export default Home;
