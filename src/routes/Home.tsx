//라이브러리
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
//컴포넌트
import CheckAuth from '../components/common/CheckAuth';
import CampItemList from '../components/camps/campItemList';
//이미지
import upArrowOrange from '../asset/upArrowOrange.png';
import BannerSwiper from '../components/banner/bannerSwiper';
import ReviewRank from '../components/rank/ReviewRank';
import LikeRank from '../components/rank/LikeRank';

const Home = () => {
  //페이지 이동 시 스크롤바 상단으로 이동
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Wrap>
      <CheckAuth />
      <HomeTitle>
        <div>
          <img
            style={{
              width: '25px',
              height: '25px',
              transform: 'rotate(-90deg)',
            }}
            src={upArrowOrange}
            alt="화살표"
          />
          쉽고 편한 캠핑장 예약 시스템 캠프파이어
          <img
            style={{
              width: '25px',
              height: '25px',
              transform: 'rotate(90deg)',
            }}
            src={upArrowOrange}
            alt="화살표"
          />
        </div>
      </HomeTitle>
      <BannerSwiper />
      <RankWrap>
        <LikeRank />
        <ReviewRank />
      </RankWrap>
      <CampItemList />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 0px auto;
  margin-top: 60px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 0px;
  }
`;

const HomeTitle = styled.div`
  height: 90px;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  color: rgb(254, 128, 44);
  div {
    width: 600px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border-bottom-left-radius: 45px;
    border-bottom-right-radius: 45px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const RankWrap = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export default Home;
