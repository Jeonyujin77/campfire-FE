//라이브러리
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
//api
import { __likeCamps } from '../../apis/userApi';
//인터페이스
import { LikesCamp } from '../../interfaces/Users';
//컴포넌트
import LikeItem from './likeItem';
import closePopBtn from '../../asset/closePopupBtn.png';

interface MLProps {
  isLikeOpen: boolean;
  setIsLikeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyLikeList = (props: MLProps) => {
  const dispatch = useAppDispatch();
  const [likeList, setLikeList] = useState<LikesCamp>();
  const { isLikeOpen, setIsLikeOpen } = props;

  useEffect(() => {
    if (isLikeOpen === true) {
      dispatch(__likeCamps()).then(res => {
        const { type, payload }: any = res;
        if (type === 'likeCamps/fulfilled') {
          setLikeList(payload);
        } else if (type === 'likeCamps/rejected') {
          console.log(payload);
          alert(`${payload.response.data.errorMessage}`);
        }
      });
      document.body.style.overflow = 'hidden';
    }
  }, [isLikeOpen]);

  const onClose = () => {
    setIsLikeOpen(!isLikeOpen);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <ModalBackground
        onClick={onClose}
        isLikeOpen={isLikeOpen}
      ></ModalBackground>
      <ModalWrap isLikeOpen={isLikeOpen}>
        <ModalHeader>
          <ModalCloseBtn onClick={onClose}>
            <img src={closePopBtn} alt="닫기" width="19px" />
          </ModalCloseBtn>
        </ModalHeader>
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
  background: rgba(0, 0, 0, 0.6);
  display: ${({ isLikeOpen }) => (isLikeOpen ? 'block' : 'none')};
  z-index: 1500;
`;

const ModalWrap = styled.div<{ isLikeOpen: boolean }>`
  position: fixed;
  margin: auto;
  top: calc(50vh - 25vh);
  left: calc(50vw - 300px);
  background-color: white;
  width: 600px;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  padding: 7px 10px;
  gap: 10px;
  z-index: 2000;
  display: ${({ isLikeOpen }) => (isLikeOpen ? 'flex' : 'none')};
  overflow-y: auto;
  scrollbar-width: none;
  border-radius: 20px;
  border: 1px solid #fe802c;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 600px) {
    width: calc(100% - 20px);
    left: 0;
    right: 0;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default MyLikeList;
