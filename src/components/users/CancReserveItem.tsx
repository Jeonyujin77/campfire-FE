//라이브러리
import styled from '@emotion/styled';
//인터페이스
import { cancreser } from '../../interfaces/Users';

const CancReserveItem = ({ book }: { book: cancreser }) => {
  return (
    <>
      <ReserveWrap key={book.bookId}>
        <MainImgBox>
          <MainImg src={book.siteMainImage} alt="캠핑장 메인 이미지" />
        </MainImgBox>
        <CampDesc>
          <SiteName>
            <SiteNameText>{book.siteName}</SiteNameText>
          </SiteName>
          <ReserveInfo>
            <p>
              <label>요금</label>
              <span>{book.sitePrice}원</span>
            </p>
            <p>
              <label>선택인원</label>
              <span>
                성인{book.adults} / 아동{book.children}
              </span>
            </p>
            <p>
              <label>입퇴실시간</label>
              <span>
                입실 {book.Camp_checkIn} / 퇴실 {book.Camp_checkOut}
              </span>
            </p>
            <p>
              <label>예약일</label>
              <span>
                {book.checkInDate.split(' ')[0] +
                  ' ~ ' +
                  book.checkInDate.split(' ')[0]}
              </span>
            </p>
          </ReserveInfo>
        </CampDesc>
      </ReserveWrap>
    </>
  );
};

const ReserveWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 1111px;
  height: 377px;
  opacity: 0.7;
  position: relative;
  background-color: #f3f3f3;
  border-radius: 20px;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 900px) {
    height: auto;
  }
`;

const MainImgBox = styled.div`
  width: 549px;
  height: 347px;
  padding: 15px;
  @media (max-width: 1300px) {
    width: 45%;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const SiteName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1200px) {
    justify-content: left;
    button {
      width: 85px;
      height: 30px;
      font-size: 14px;
    }
  }
`;

const SiteNameText = styled.div`
  font-size: 22px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1200px) {
    width: 99%;
    font-size: 18px;
  }
`;

const CampDesc = styled.div`
  width: 47%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 900px) {
    width: 100%;
    padding: 20px;
    font-size: 14px;
  }
`;

const ReserveInfo = styled.div`
  padding-right: 20px;
  p {
    display: flex;
  }

  label,
  span {
    display: inline-block;
  }

  label {
    min-width: 130px;
    font-weight: bold;
  }

  @media (max-width: 900px) {
    padding: 0;
    width: 100%;
  }
`;
export default CancReserveItem;
