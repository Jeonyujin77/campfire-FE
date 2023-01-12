import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';
import { useAppDispatch } from '../../redux/store';
import { __reserveUser } from '../../apis/reservationApi';
import { Reservation, ReservationList } from '../../interfaces/Users';
import { useNavigate } from 'react-router-dom';
import ReservationItem from './ReservationItem';

interface MRProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyReservationModal = (props: MRProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

  const [display, setDisplay] = useState(1);

  // const representStart =
  // const representEnd =

  useEffect(() => {
    dispatch(__reserveUser()).then(res => {
      const { type, payload }: any = res;
      console.log('res:', res);
      console.log('type:', type);
      console.log('payload:', payload);
      if (type === 'reserveUser/fulfilled') {
        setBooks(payload);
      }
    });
  }, []);

  const [books, setBooks] = useState<ReservationList>();

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
        {books ? (
          books.books.map(book => (
            <ReservationItem key={book.bookId} book={book} />
          ))
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
  left: calc(50vw - 500px);
  background-color: white;
  width: 1000px;
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: red;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

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

const PagenoBtnWrap = styled.div``;

export default MyReservationModal;
