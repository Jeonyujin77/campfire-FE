import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Reservation, ReservationList } from '../../interfaces/Users';

const ReservationItem = ({ book }: { book: Reservation }) => {
  const navigate = useNavigate();
  //   const [book, setBook] = useState<Reservation>();
  const [display, setDisplay] = useState(1);

  return (
    <div>
      <ReserveWrap
        onClick={() => {
          if (display === 0) {
            setDisplay(1);
          } else if (display === 1) {
            setDisplay(0);
          }
        }}
        key={book.bookId}
        // onMouseOver={() => {
        //   setDisplay(0);
        //   console.log(display);
        // }}
      >
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
      <DropdownWrap display={display}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            border: '1px solid red',
          }}
        >
          <button
            onClick={() => {
              setDisplay(1);
            }}
          >
            x
          </button>
        </div>
        <CampName>{book.siteName}</CampName>
        <CampAboutBox>
          <CampAboutTitle>상세정보</CampAboutTitle>
          <CamtAbout>{book.siteDesc}</CamtAbout>
        </CampAboutBox>
        <CampAboutBox>
          <CampAboutTitle>주의사항</CampAboutTitle>
          <CamtAbout>{book.siteInfo}</CamtAbout>
        </CampAboutBox>
        <div>
          <p>
            {'예약날짜 : '}
            {book.checkInDate.split(' ')[0] +
              '-' +
              book.Camp_checkIn.split(':')[0] +
              ':' +
              book.Camp_checkIn.split(':')[1] +
              ' ~ ' +
              book.checkInDate.split(' ')[0] +
              '-' +
              book.Camp_checkOut.split(':')[0] +
              ':' +
              book.Camp_checkOut.split(':')[1]}
          </p>
          <p>예약인원수 : {book.children + book.adults}</p>
          <p>가격 : {book.sitePrice}원</p>
        </div>
      </DropdownWrap>
    </div>
  );
};

const ReserveWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  width: 930px;
  height: 260px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px 1px #c0bdbd;
  }
  border: 1px solid black;
  position: relative;
`;

const MainImg = styled.img`
  width: 500px;
  height: 260px;
`;

const SiteName = styled.div`
  width: 400px;
  height: 30px;
  padding: 5px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 1px solid black;
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

export default ReservationItem;
