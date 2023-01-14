import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
  cancreser,
  Reservation,
  ReservationList,
} from '../../interfaces/Users';
import { useAppDispatch } from '../../redux/store';
import { __cancelReservation } from '../../apis/reservationApi';

const CancReserveItem = ({ book }: { book: cancreser }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <ReserveWrap key={book.bookId}>
        <Cover />
        <div>
          <MainImg src={book.siteMainImage} alt="캠핑장 메인 이미지" />
        </div>
        <CampDesc>
          <SiteName>{book.siteName}</SiteName>
          <DescText height="30px">
            {book.checkInDate.split(' ')[0] +
              ' ~ ' +
              book.checkInDate.split(' ')[0]}
          </DescText>
          <SiteDesc>
            <p>{book.siteDesc}</p>
          </SiteDesc>
          <SiteInfo>
            <p>{book.siteInfo}</p>
          </SiteInfo>
        </CampDesc>
      </ReserveWrap>
    </div>
  );
};
const Cover = styled.div`
  z-index: 2500;
  background-color: red;
  position: absolute;
  width: 1014px;
  height: 5px;
  top: 147px;
  left: -23px;
  transform: rotate(-17deg);
`;

const ReserveWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  width: 950px;
  height: 280px;
  border: 1px solid black;
  position: relative;
`;

const MainImg = styled.img`
  display: block;
  width: 500px;
  height: 260px;
`;

const SiteName = styled.div`
  width: 400px;
  height: 30px;
  padding: 5px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  gap: 10px;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 1px solid black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CampDesc = styled.div`
  /* border: 1px solid blue; */
  width: 400px;
  padding: 10px;
  min-height: 240px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
`;

const DescText = styled.div<{ height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: ${({ height }) => height};
  border-bottom: 1px solid black;
  padding-bottom: 7px;
`;

const SiteDesc = styled.div`
  white-space: pre-wrap;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px;
  height: 80px;
  border-bottom: 1px solid black;
`;

const SiteInfo = styled.div`
  white-space: pre-wrap;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px;
  height: 77px;
  margin-bottom: 7px;
`;

const DropdownWrap = styled.div<{ display: number }>`
  display: ${({ display }) => (display === 0 ? 'block' : 'none')};
  border: 1px solid green;
  z-index: 2100;
  position: absolute;
  background-color: #c5c5c5;
  width: 890px;
  margin: 5px 20px 0px 20px;
  padding: 10px;
`;

const CampName = styled.h3``;

const CampAboutBox = styled.div`
  margin-bottom: 10px;
`;

const CampAboutTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const CamtAbout = styled.p`
  word-break: break-all;
  white-space: pre-wrap;
`;

export default CancReserveItem;
