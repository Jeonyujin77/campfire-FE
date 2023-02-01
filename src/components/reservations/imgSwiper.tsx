//라이브러리
import styled from '@emotion/styled';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
// Swiper css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './imgSwiper.css';
//이미지
import noMainImg from '../../asset/campItem/noMainImg.png';

export interface DetailCampDesc {
  campMainImage: string;
  campSubImages?: any;
}

const ImgSwiper = ({ campMainImage, campSubImages }: DetailCampDesc) => {
  const [display, setDisplay] = useState(0);
  return (
    <>
      {campMainImage ? (
        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          display={display}
        >
          {campSubImages ? (
            <>
              {[campMainImage, ...campSubImages].map(image => (
                <StyledSwiperSlide key={image + Math.random()}>
                  <CampImg
                    src={image}
                    onError={() => {
                      setDisplay(1);
                    }}
                  />
                </StyledSwiperSlide>
              ))}
            </>
          ) : (
            <StyledSwiperSlide>
              <CampImg src={campMainImage} />
            </StyledSwiperSlide>
          )}
        </StyledSwiper>
      ) : (
        <></>
      )}
    </>
  );
};

const StyledSwiper = styled(Swiper)<{ display: number }>`
  width: 1200px;
  height: 600px;
  display: ${({ display }) => (display === 0 ? 'flex' : 'none')};
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
