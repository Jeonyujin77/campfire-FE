//라이브러리
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
//api
import {
  __reserveCanceled,
  __reserveCompleted,
  __reserveUser,
} from '../../apis/reservationApi';
//인터페이스
import {
  CanceledReservationList,
  CompletedReservationList,
  ReservationList,
} from '../../interfaces/Users';
//컴포넌트
import ReservationItem from './ReservationItem';
//이미지
import closePopupBtn from '../../asset/reserveModalCloseBtn.png';
import ReservationItemDetail from './ReservationItemDetail';

interface MRProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyReservationModal = (props: MRProps) => {
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<ReservationList>(); //예약내역
  const [completedBooks, setCompletedBooks] =
    useState<CompletedReservationList>(); //이용 완료내역
  const [canceledBooks, setCanceledBooks] = useState<CanceledReservationList>(); //예약 취소내역
  const [selectBooks, setSelectBooks] = useState(true); //예약내역선택
  const [selectCompleted, setSelectCompleted] = useState(false); //이용 완료내역선택
  const [selectCanceled, setSelectCanceled] = useState(false); //예약 취소내역 선택

  //페이지 진입 시 예약내역부터 불러오고, 예약내역이 선택될 때마다 데이터를 불러옴
  useEffect(() => {
    if (props.isOpen === true) {
      dispatch(__reserveUser()).then(res => {
        const { type, payload }: any = res;
        if (type === 'reserveUser/fulfilled') {
          setBooks(payload);
        }
        // 에러처리
        else if (type === 'reserveUser/rejected') {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
      document.body.style.overflow = 'hidden';
    }
  }, [selectBooks, props.isOpen, dispatch]);

  //페이지 진입 시 완료내역 한번 불러오고, 완료내역이 선택될 때마다 데이터를 불러옴
  useEffect(() => {
    if (props.isOpen === true) {
      dispatch(__reserveCompleted()).then(res => {
        const { type, payload }: any = res;
        if (type === 'reserveCompleted/fulfilled') {
          setCompletedBooks(payload);
        }
        // 에러처리
        else if (type === 'reserveCompleted/rejected') {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
      document.body.style.overflow = 'hidden';
    }
  }, [selectCompleted, props.isOpen, dispatch]);

  //페이지 진입 시 취소내역 한번 불러오고, 취소내역이 선택될 때마다 데이터를 불러옴
  useEffect(() => {
    if (props.isOpen === true) {
      dispatch(__reserveCanceled()).then(res => {
        const { type, payload }: any = res;
        if (type === 'reserveCanceled/fulfilled') {
          setCanceledBooks(payload);
        }
        // 에러처리
        else if (type === 'reserveCanceled/rejected') {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
      document.body.style.overflow = 'hidden';
    }
  }, [selectCanceled, props.isOpen, dispatch]);

  // 팝업 종료
  const onClose = () => {
    props.setIsOpen(!props.isOpen);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <ModalBackground
        onClick={onClose}
        isOpen={props.isOpen}
      ></ModalBackground>
      <ModalBox isOpen={props.isOpen}>
        <ModalCloseBtn
          isOpen={props.isOpen}
          onClick={() => {
            props.setIsOpen(!props.isOpen);
          }}
        >
          <img src={closePopupBtn} alt="닫기" />
        </ModalCloseBtn>
        <ModalWrap>
          <ModalHeader>
            <TitleWrap>
              <ReserveTitle
                selectBooks={selectBooks}
                onClick={() => {
                  setSelectBooks(true);
                  setSelectCompleted(false);
                  setSelectCanceled(false);
                }}
              >
                예약 내역
              </ReserveTitle>
              <CompleteTitle
                selectCompleted={selectCompleted}
                onClick={() => {
                  setSelectBooks(false);
                  setSelectCompleted(true);
                  setSelectCanceled(false);
                }}
              >
                이용 완료내역
              </CompleteTitle>
              <CancleTitle
                selectCanceled={selectCanceled}
                onClick={() => {
                  setSelectBooks(false);
                  setSelectCompleted(false);
                  setSelectCanceled(true);
                }}
              >
                예약 취소내역
              </CancleTitle>
            </TitleWrap>
          </ModalHeader>
          {selectBooks ? (
            books ? (
              books.books.map(book => (
                <ReservationItem key={book.bookId} book={book} />
              ))
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {selectCompleted ? (
            completedBooks ? (
              completedBooks.expiredBooks.map(book => (
                <ReservationItemDetail
                  key={book.bookId}
                  book={book}
                  status={1}
                />
              ))
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {selectCanceled ? (
            canceledBooks ? (
              canceledBooks.cancelBooks.map(book => (
                <ReservationItemDetail
                  key={book.bookId}
                  book={book}
                  status={-1}
                />
              ))
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </ModalWrap>
      </ModalBox>
    </>
  );
};

const ModalBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1500;
`;

const ModalBox = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: relative;
  width: 1200px;
  margin: 0 auto;
  height: 80vh;
  @media (max-width: 1300px) {
    width: 100%;
  }
`;

const ModalWrap = styled.div`
  border: 1px solid #fe802c;
  border-radius: 20px 10px 10px 20px;
  position: fixed;
  margin: auto;
  top: calc(50vh - 40vh);
  left: calc(50vw - 590px);
  background-color: white;
  width: 1200px;
  height: 80vh;
  flex-direction: column;
  align-items: center;
  padding: 0px 5px 5px 5px;
  gap: 10px;
  z-index: 2000;
  display: flex;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: #fe802c;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  @media (max-width: 1300px) {
    width: 100%;
    left: 0;
    right: 0;
    padding: 0;
  }
`;

const ModalHeader = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1300px) {
    width: 100%;
  }
`;

const ModalCloseBtn = styled.button<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  img {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
  position: absolute;
  top: -14px;
  right: -10px;
  background: none;
  border: none;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  z-index: 1500;

  @media (max-width: 600px) {
    top: -10px;
    right: 0;
    width: 30px;
    img {
      width: 30px;
    }
  }
`;

const TitleWrap = styled.div`
  position: relative;
  width: 1149px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: #d9d9d9;
  border-radius: 29px;

  @media (max-width: 1300px) {
    width: 100%;
    height: 50px;
  }
`;

const ReserveTitle = styled.div<{ selectBooks: boolean }>`
  width: 383px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  border-radius: 25px;
  background-color: ${({ selectBooks }) =>
    selectBooks ? '#FE802C' : '#d9d9d9'};
  color: #fff;
  &:hover {
    background-color: ${({ selectBooks }) =>
      selectBooks ? '#FE802C' : '#FFECE0'};
  }

  @media (max-width: 1300px) {
    width: 33%;
    height: 50px;
    font-size: 16px;
  }
`;

const CompleteTitle = styled.div<{ selectCompleted: boolean }>`
  width: 383px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  border-radius: 25px;
  background-color: ${({ selectCompleted }) =>
    selectCompleted ? '#FE802C' : '#d9d9d9'};
  color: #fff;
  &:hover {
    background-color: ${({ selectCompleted }) =>
      selectCompleted ? '#FE802C' : '#FFECE0'};
  }
  @media (max-width: 1300px) {
    width: 33%;
    height: 50px;
    font-size: 16px;
  }
`;

const CancleTitle = styled.div<{ selectCanceled: boolean }>`
  width: 383px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  border-radius: 25px;
  background-color: ${({ selectCanceled }) =>
    selectCanceled ? '#FE802C' : '#d9d9d9'};
  color: #fff;
  &:hover {
    background-color: ${({ selectCanceled }) =>
      selectCanceled ? '#FE802C' : '#FFECE0'};
  }
  @media (max-width: 1300px) {
    width: 33%;
    height: 50px;
    font-size: 16px;
  }
`;

export default MyReservationModal;
