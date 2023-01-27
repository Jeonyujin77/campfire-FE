import { useCallback, memo } from 'react';
import { __cancelReservation } from '../../apis/reservationApi';
import { Reservation } from '../../interfaces/Users';
import { useAppDispatch } from '../../redux/store';
import styled from '@emotion/styled';
import Button from '../common/Button';

const ReservationItemDetail = ({
  book,
  status, // 0: 예약완료 / 1: 이용완료 / -1: 예약취소
}: {
  book: Reservation;
  status: number;
}) => {
  const dispatch = useAppDispatch();

  //예약취소버튼함수
  const cancleR = useCallback(
    (payload: number) => {
      if (window.confirm('해당 예약을 취소하시겠습니까?')) {
        dispatch(__cancelReservation(payload)).then(res => {
          const { type, payload } = res;
          if (type === 'cancelReservation/fulfilled') {
            if (
              payload.message ===
              '예약 취소 할 수 없습니다. 호스트에게 문의하세요.'
            ) {
              alert(
                `${payload.message} \n캠핑장 전화번호: ${payload.hostPhoneNumber}`,
              );
            }
            if (payload.message === '예약을 취소하였습니다') {
              alert(`${payload.message}`);
              window.location.reload();
            }
          } // 에러처리
          else if (type === 'cancelReservation/rejected') {
            alert(`${payload.response.data.errorMessage}`);
          }
        });
      }
    },
    [dispatch],
  );

  return (
    <>
      <ReserveWrap key={book.bookId} status={status}>
        <MainImgBox>
          <MainImg src={book.siteMainImage} alt="캠핑장 메인 이미지" />
        </MainImgBox>
        <CampDesc>
          <SiteName>
            <SiteNameText status={status}>{book.siteName}</SiteNameText>
            {status === 0 ? (
              <Button
                width="120px"
                height="36px"
                bgColor="#A1C182"
                color="#fff"
                borderRadius="29px"
                onClick={() => cancleR(book.bookId)}
              >
                예약취소
              </Button>
            ) : (
              <></>
            )}
          </SiteName>
          <ReserveInfo>
            <p>
              <label>요금</label>
              <span>{book.sitePrice.toLocaleString()}원</span>
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
                  book.checkOutDate.split(' ')[0]}
              </span>
            </p>
            {status === 0 ? (
              <>
                <hr style={{ border: '1px solid #D9D9D9' }} />
                <p>
                  <label>주의사항</label>
                  <span style={{ color: 'red' }}>
                    아래 내용을 읽지 않고 이용 시 발생하는 불이익에 대해
                    책임지지 않습니다. 꼭 읽어주세요.
                  </span>
                </p>
              </>
            ) : (
              <></>
            )}
          </ReserveInfo>
        </CampDesc>
      </ReserveWrap>
    </>
  );
};

const ReserveWrap = styled.div<{ status: number }>`
  opacity: ${({ status }) => (status === -1 ? '0.7' : '1')};
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 1111px;
  height: 377px;
  &:hover {
    box-shadow: 1px 1px 1px 1px #c0bdbd;
  }
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
    width: 100%;
    flex-direction: column;
    align-items: baseline;
    justify-content: left;
    button {
      width: 85px;
      height: 30px;
      font-size: 14px;
    }
  }
`;

const SiteNameText = styled.div<{ status: number }>`
  max-width: ${({ status }) => (status === 0 ? '350px' : '500px')};
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
  box-sizing: border-box;

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
export default memo(ReservationItemDetail);
