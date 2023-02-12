//라이브러리
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import ReactGa from 'react-ga';
// Swiper css
import 'swiper/css';
import '../reservations/imgSwiper.css';
//이미지
import reservation from '../../asset/banner/reservation.png';

const BannerSwiper = () => {
  const Imgs = [
    { img: reservation, href: '/premiumcamps', action: '프리미엄배너' },
  ];
  return Imgs.length !== 1 ? ( //이벤트 배너가 1개일 때 img태그로 출력되도록 처리
    <StyledSwiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      loop={true}
    >
      {Imgs.map(image => (
        <StyledSwiperSlide key={Math.random()}>
          <CampImg
            onClick={() => {
              ReactGa.event({
                category: '배너 클릭',
                action: `${image.action}`,
              });
              window.location.href = `${image.href}`;
            }}
            src={image.img}
          />
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  ) : (
    <CampImg
      onClick={() => {
        ReactGa.event({
          category: '배너 클릭',
          action: `${Imgs[0].action}`,
        });
        window.location.href = `${Imgs[0].href}`;
      }}
      src={Imgs[0].img}
    />
  );
};

const StyledSwiper = styled(Swiper)`
  width: 1200px;
  height: 509px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  border-radius: 20px;
  margin-top: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 1200px) {
    width: 100%;
    height: 500px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 250px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: center;
`;

const CampImg = styled.img`
  object-fit: fill;
  width: 1200px;
  height: 509px;
  cursor: pointer;
  border-radius: 20px;
  @media (max-width: 1200px) {
    width: 100%;
    height: 500px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 250px;
  }
`;

export default BannerSwiper;
