import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Likedheart from '../../asset/Likedheart.png';
import unLikedheart from '../../asset/unLikedheart.png';
import { useAppDispatch } from '../../redux/store';
import { __likeCampByParams } from '../../apis/campApi';

const Liked = ({
  campId,
  likeStatus,
}: {
  campId: number;
  likeStatus: boolean;
}) => {
  const dispatch = useAppDispatch();

  const [like, setLike] = useState<boolean>();

  //찜하기, 찜취소하기 버튼 onClick
  const likeCamp = (payload: number) => {
    dispatch(__likeCampByParams(payload)).then(res => {
      const { type, payload }: any = res;
      if (type === 'likeCampByParams/fulfilled') {
        // console.log('res:', res);
        // console.log('type:', type);
        // console.log('payload:', payload);
        if (payload.message === '좋아요 성공!') {
          setLike(true);
        }
        if (payload.message === '좋아요 취소!') {
          setLike(false);
        }
      } else {
      }
    });
  };

  useEffect(() => {
    setLike(likeStatus);
  }, []);

  return (
    <>
      {like ? (
        <Back onClick={() => likeCamp(campId)}>
          <LikedImg src={Likedheart} />
        </Back>
      ) : (
        <UnLBack onClick={() => likeCamp(campId)}>
          <UnLikedImg src={unLikedheart} />
        </UnLBack>
      )}
    </>
  );
};

const Back = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 500;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 15px;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    box-shadow: 1px 1px 1px 1px #a5a5a5;
  }
`;

const LikedImg = styled.img`
  width: 19px;
  height: 17px;
`;

const UnLBack = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 500;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    box-shadow: 1px 1px 1px 1px #a5a5a5;
  }
`;

const UnLikedImg = styled.img`
  width: 19px;
  height: 17px;
`;

export default Liked;
