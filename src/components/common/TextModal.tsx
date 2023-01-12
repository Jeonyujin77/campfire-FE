import { useEffect } from 'react';
import styled from '@emotion/styled';

interface TMProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headText?: string;
  bodyText?: string;
}

const TextModal = (props: TMProps) => {
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
          <div>{props.headText}</div>
          <ModalCloseBtn
            onClick={() => {
              props.setIsOpen(!props.isOpen);
            }}
          >
            x
          </ModalCloseBtn>
        </ModalHeader>
        <ModalBody>{props.bodyText}</ModalBody>
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
  /* position: absolute; */
  position: fixed;
  margin: auto;
  top: calc(50vh - 40vh);
  left: calc(50vw - 300px);
  background-color: white;
  width: 600px;
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
  width: 560px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  font-weight: bold;
  padding: 0px 10px;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  width: 560px;
  padding: 5px 10px;
  max-height: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid black;
  //줄바꿈도 인식하면서 긴 문자열은 자동 줄바꿈처리해줌
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 30px;
  overflow-y: scroll;
`;

export default TextModal;
