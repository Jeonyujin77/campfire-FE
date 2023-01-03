import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import styled from 'styled-components';
import ImgInSwiper from './ImgInSwiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface DetailCampDesc {
  campId: number;
  img: string;
  name: string;
  address: string;
}

const ImgSwiper = () => {
  const dummyDatas = [
    {
      campId: 1,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 2,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 3,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 4,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 5,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 6,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 7,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 8,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
  ];

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
        {dummyDatas.map(data => (
          <StyledSwiperSlide key={data.campId}>
            <ImgInSwiper data={data} />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
};

const StyledSwiper = styled(Swiper)`
  width: 1200px;
  height: 400px;
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

export default ImgSwiper;
