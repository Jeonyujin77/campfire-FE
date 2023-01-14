import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';
import { useAppDispatch } from '../../redux/store';
import { __reserveUser } from '../../apis/reservationApi';
import {
  LikesCamp,
  Reservation,
  ReservationList,
} from '../../interfaces/Users';
import { useNavigate } from 'react-router-dom';
import ReservationItem from './ReservationItem';
import { __likeCamps } from '../../apis/userApi';
import LikeItem from './likeItem';

interface MLProps {
  isLikeOpen: boolean;
  setIsLikeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyLikeList = (props: MLProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [likeList, setLikeList] = useState<LikesCamp>();

  useEffect(() => {
    dispatch(__likeCamps()).then(res => {
      const { type, payload }: any = res;
      console.log('res:', res);
      console.log('type:', type);
      console.log('payload:', payload);
      if (type === 'likeCamps/fulfilled') {
        setLikeList(payload);
      } else if (type === 'likeCamps/rejected') {
        console.log(payload);
      }
    });
  }, []);

  return (
    <>
      <ModalBackground
        onClick={() => {
          props.setIsLikeOpen(!props.isLikeOpen);
        }}
        isLikeOpen={props.isLikeOpen}
      ></ModalBackground>
      <ModalWrap isLikeOpen={props.isLikeOpen}>
        <ModalHeader>
          <ModalCloseBtn
            onClick={() => {
              props.setIsLikeOpen(!props.isLikeOpen);
            }}
          >
            x
          </ModalCloseBtn>
        </ModalHeader>
        <Title>찜한 캠핑장</Title>
        {likeList ? (
          likeList.Likes.map(like => <LikeItem key={like.likeId} like={like} />)
        ) : (
          <></>
        )}
      </ModalWrap>
    </>
  );
};

const ModalBackground = styled.div<{ isLikeOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  display: ${({ isLikeOpen }) => (isLikeOpen ? 'block' : 'none')};
  z-index: 1500;
`;

const ModalWrap = styled.div<{ isLikeOpen: boolean }>`
  border: 1px solid red;
  position: fixed;
  margin: auto;
  top: calc(50vh - 25vh);
  left: calc(50vw - 300px);
  background-color: white;
  width: 600px;
  /* max-height: 100%; */
  height: 50vh;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 5px;
  gap: 10px;
  z-index: 2000;
  display: ${({ isLikeOpen }) => (isLikeOpen ? 'flex' : 'none')};
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  border: 1px solid green;
  width: 580px;
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

const Title = styled.div`
  width: 540px;
  height: 40px;
  border: 1px solid black;
  margin: 5px;
  padding: 10px 15px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export default MyLikeList;
