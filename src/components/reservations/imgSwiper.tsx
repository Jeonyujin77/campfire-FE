import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import styled from 'styled-components';
import ImgInSwiper from './ImgInSwiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
          <StyledSwiperSlide key={image}>
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
`;

export default ImgSwiper;
