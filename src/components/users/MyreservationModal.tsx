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
          <ModalCloseBtn
            onClick={() => {
              props.setIsOpen(!props.isOpen);
            }}
          >
            ❌
          </ModalCloseBtn>
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
  /* outline: 3px solid #fe802c; */
  border: 3px solid #fe802c;
  border-radius: 20px 10px 10px 20px;
  position: fixed;
  margin: auto;
  top: calc(50vh - 45vh);
  left: calc(50vw - 550px);
  background-color: white;
  width: 1100px;
  height: 90vh;
  flex-direction: column;
  align-items: center;
  padding: 0px 5px 5px 5px;
  gap: 10px;
  z-index: 2000;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
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
`;

const ModalHeader = styled.div`
  /* border: 1px solid green; */
  width: 99%;
  /* margin-bottom: 10px; */
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* flex-direction: column; */
`;

const ModalCloseBtn = styled.button`
  background: none;
  height: 50px;
  border: none;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: red;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const TitleWrap = styled.div`
  width: 980px;
  height: 50px;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ReserveTitle = styled.div<{ selectBooks: boolean }>`
  width: 320px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  border-radius: 25px;
  background-color: ${({ selectBooks }) => (selectBooks ? '#FE802C' : 'white')};
  color: ${({ selectBooks }) => (selectBooks ? 'white' : 'black')};
  &:hover {
    background-color: ${({ selectBooks }) =>
      selectBooks ? '#FE802C' : '#FFECE0'};
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
  font-size: 20px;
  font-weight: bold;
  border-radius: 25px;
  background-color: ${({ selectCompleted }) =>
    selectCompleted ? '#FE802C' : 'white'};
  color: ${({ selectCompleted }) => (selectCompleted ? 'white' : 'black')};
  &:hover {
    background-color: ${({ selectCompleted }) =>
      selectCompleted ? '#FE802C' : '#FFECE0'};
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
  font-size: 20px;
  font-weight: bold;
  border-radius: 25px;
  background-color: ${({ selectCanceled }) =>
    selectCanceled ? '#FE802C' : 'white'};
  color: ${({ selectCanceled }) => (selectCanceled ? 'white' : 'black')};
  &:hover {
    background-color: ${({ selectCanceled }) =>
      selectCanceled ? '#FE802C' : '#FFECE0'};
  }
`;

export default MyReservationModal;
