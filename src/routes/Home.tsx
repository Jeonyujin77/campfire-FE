import styled from '@emotion/styled';
import CampItemList from '../components/camps/campItemList';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import CheckAuth from '../components/common/CheckAuth';

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
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 120px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  /* border: 1px solid red; */
`;

const HomeTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  color: rgb(254, 128, 44);
`;

export default Home;
