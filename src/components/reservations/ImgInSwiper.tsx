import React from 'react';
import styled from 'styled-components';
import { DetailCampDesc } from './imgSwiper';

const ImgInSwiper = ({ data }: { data: DetailCampDesc }) => {
  return <CampImg src={data.img} />;
};

const CampImg = styled.img`
  /* object-fit: fill; */
  width: 1200px;
`;

export default ImgInSwiper;
