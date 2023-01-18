import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';
import { useAppDispatch } from '../../redux/store';
import {
  __reserveCanceled,
  __reserveCompleted,
  __reserveUser,
} from '../../apis/reservationApi';
import {
  CanceledReservationList,
  CompletedReservationList,
  Reservation,
  ReservationList,
} from '../../interfaces/Users';
import { useNavigate } from 'react-router-dom';
import ReservationItem from './ReservationItem';
import CompReserveItem from './CompReserveItem';
import CancReserveItem from './CancReserveItem';

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
        console.log('res:', res);
        console.log('type:', type);
        console.log('payload:', payload);
        if (type === 'reserveUser/fulfilled') {
          setBooks(payload);
        }
        // 에러처리
        else if (type === 'reserveUser/rejected') {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    }
  }, [selectBooks, props.isOpen]);

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
    }
  }, [selectCompleted, props.isOpen]);

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
    }
  }, [selectCanceled, props.isOpen]);

  return (
    <>
      <ModalBackground
        onClick={() => {
          props.setIsOpen(!props.isOpen);
        }}
        isOpen={props.isOpen}
      ></ModalBackground>
      <ModalWrap isOpen={props.isOpen}>
        <ModalHeader>
          <ModalCloseBtn
            onClick={() => {
              props.setIsOpen(!props.isOpen);
            }}
          >
            x
          </ModalCloseBtn>
        </ModalHeader>
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
              <CompReserveItem key={book.bookId} book={book} />
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
              <CancReserveItem key={book.bookId} book={book} />
            ))
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </ModalWrap>
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

const ModalWrap = styled.div<{ isOpen: boolean }>`
  border: 1px solid red;
  position: fixed;
  margin: auto;
  top: calc(50vh - 45vh);
  left: calc(50vw - 550px);
  background-color: white;
  width: 1100px;
  /* max-height: 100%; */
  height: 90vh;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 5px;
  gap: 10px;
  z-index: 2000;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  overflow-y: scroll;
`;

const ModalHeader = styled.div`
  border: 1px solid green;
  width: 980px;
  margin: 10px;
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  width: 980px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReserveTitle = styled.div<{ selectBooks: boolean }>`
  width: 320px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  background-color: ${({ selectBooks }) => (selectBooks ? '#dddddd' : 'white')};
  &:hover {
    background-color: #f7f3f3;
  }
`;

const CompleteTitle = styled.div<{ selectCompleted: boolean }>`
  width: 320px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  background-color: ${({ selectCompleted }) =>
    selectCompleted ? '#dddddd' : 'white'};
  &:hover {
    background-color: #f7f3f3;
  }
`;

const CancleTitle = styled.div<{ selectCanceled: boolean }>`
  width: 320px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  background-color: ${({ selectCanceled }) =>
    selectCanceled ? '#dddddd' : 'white'};
  &:hover {
    background-color: #f7f3f3;
  }
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: red;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

export default MyReservationModal;
