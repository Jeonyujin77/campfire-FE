//라이브러리
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import ReactGa from 'react-ga';
// Swiper css
import 'swiper/css';
//이미지
import event from '../../asset/banner/event.png';
import reservation from '../../asset/banner/reservation.png';

const BannerSwiper = () => {
  const Imgs = [
    {
      img: event,
      href: 'https://forms.gle/PgDn7qxoJYzkmyet6',
      action: '이벤트배너',
    },
    { img: reservation, href: '/premiumcamps', action: '프리미엄배너' },
  ];
  return (
    <StyledSwiper
      modules={[Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
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
