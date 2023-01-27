//라이브러리
import styled from '@emotion/styled';
import { useState, memo } from 'react';
//인터페이스
import { Reservation } from '../../interfaces/Users';
import Button from '../common/Button';
//이미지
import closeArrow from '../../asset/downArrow.png';
import openArrow from '../../asset/upArrow.png';
import ReservationItemDetail from './ReservationItemDetail';

const ReservationItem = ({ book }: { book: Reservation }) => {
  // 상세보기 플래그
  const [display, setDisplay] = useState(1);

  return (
    <>
      <ReservationItemDetail book={book} status={0} />
      <DropdownBtn>
        <Button
          width="1111px"
          height="47px"
          bgColor="#fe802c"
          color="#fff"
          borderRadius="29px"
          onClick={() => {
            if (display === 0) {
              setDisplay(1);
            } else if (display === 1) {
              setDisplay(0);
            }
          }}
        >
          {display === 0 ? (
            <>
              <ArrowImg src={openArrow} />
              접기
            </>
          ) : (
            <>
              <ArrowImg src={closeArrow} />
              상세보기
            </>
          )}
        </Button>
      </DropdownBtn>
      <DropdownWrap display={display}>
        <h3>{book.siteName}</h3>
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
    </>
  );
};

const DropdownBtn = styled.div`
  button {
    margin: 0;
  }
  @media (max-width: 1200px) {
    width: 100%;
    button {
      width: 100%;
      margin: 0;
    }
  }
`;

const DropdownWrap = styled.div<{ display: number }>`
  display: ${({ display }) => (display === 0 ? 'block' : 'none')};
  background-color: #ffece0;
  margin-top: -30px;
  padding: 20px;
  width: 1071px;
  z-index: -1;

  @media (max-width: 1200px) {
    width: calc(100% - 40px);
    font-size: 14px;
  }
`;

const ArrowImg = styled.img`
  width: 30px;
  height: 20px;
  vertical-align: middle;
  @media (max-width: 1200px) {
    width: 20px;
    height: 12px;
  }
`;

const CampAboutBox = styled.div`
  margin-bottom: 10px;
`;

const CampAboutTitle = styled.p`
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

const CamtAbout = styled.p`
  word-break: break-all;
  white-space: pre-wrap;
`;

export default memo(ReservationItem);
