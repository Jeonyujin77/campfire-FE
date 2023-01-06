import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';

interface MRProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyReservationModal = (props: MRProps) => {
  useEffect(() => {}, []);

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
        {/* {__.map(reserveation=> ( */}
        <ReserveWrap>
          <div>
            <img
              src="https://via.placeholder.com/500x260"
              alt="캠핑장 이미지"
            />
          </div>
          <CampDesc>
            <DescText height="30px">캠핑장이름</DescText>
            <DescText height="30px">startday / endday</DescText>
            <DescText height="70px">campName</DescText>
            <DescText height="100px">campdesc</DescText>
          </CampDesc>
        </ReserveWrap>
        {/* ))} */}
        <PagenoBtnWrap>
          <Button
            width="30px"
            bgColor="#e5e5e5f"
            onClick={() => {
              alert('pageno에 따른 예약내역 2개씩 불러오기!');
            }}
          >
            1
          </Button>
          <Button
            width="30px"
            bgColor="#e5e5e5f"
            onClick={() => {
              alert('pageno에 따른 예약내역 2개씩 불러오기!');
            }}
          >
            2
          </Button>
          <Button
            width="30px"
            bgColor="#e5e5e5f"
            onClick={() => {
              alert('pageno에 따른 예약내역 2개씩 불러오기!');
            }}
          >
            3
          </Button>
        </PagenoBtnWrap>
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
  position: absolute;
  top: calc(50vh-500px);
  left: calc(50vw - 500px);
  background-color: white;
  width: 1000px;
  max-height: 100%;
  min-height: 80vh;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 5px;
  gap: 10px;
  z-index: 2000;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
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
  border: 1px solid black;
`;

const CampDesc = styled.div`
  border: 1px solid blue;
  width: 400px;
  padding: 10px;
  min-height: 240px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DescText = styled.div<{ height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: ${({ height }) => height};
  border-bottom: 1px solid black;
`;

const PagenoBtnWrap = styled.div``;

export default MyReservationModal;
