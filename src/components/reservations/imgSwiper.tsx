//라이브러리
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
// Swiper css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './imgSwiper.css';

export interface DetailCampDesc {
  campMainImage: string;
  campSubImages?: any;
}

const ImgSwiper = ({ campMainImage, campSubImages }: DetailCampDesc) => {
  const images = [campMainImage, ...campSubImages];

  return (
    <>
      <StyledSwiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        navigation
        loop={true}
        pagination={{ clickable: true }}
      >
        {images.map(image => (
          <StyledSwiperSlide key={image + Math.random()}>
            <CampImg src={image} />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
};

const StyledSwiper = styled(Swiper)`
  width: 1200px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: center;
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
  height: 600px;
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

export default ImgSwiper;
