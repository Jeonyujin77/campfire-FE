//라이브러리
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import ReactGa from 'react-ga';
//api
import { __likeCampByParams } from '../../apis/campApi';
import {
  updateCampList,
  updateSearchedCampList,
} from '../../redux/modules/campSlice';
//이미지
import Likedheart from '../../asset/Likedheart.png';
import unLikedheart from '../../asset/unLikedheart.png';

const Liked = ({
  campId,
  likeStatus,
  likes,
}: {
  campId: number;
  likeStatus: boolean;
  likes: number;
}) => {
  const dispatch = useAppDispatch();
  const [like, setLike] = useState<boolean>();

  //찜하기, 찜취소하기 버튼 onClick
  const likeCamp = (payload: number) => {
    dispatch(__likeCampByParams(payload)).then(res => {
      const { type, payload }: any = res;
      if (type === 'likeCampByParams/fulfilled') {
        if (payload.message === '좋아요 성공!') {
          setLike(true);
          dispatch(
            updateCampList({
              campId: payload.campId,
              likes: likes + 1,
            }),
          );
          dispatch(
            updateSearchedCampList({
              campId: payload.campId,
              likes: likes + 1,
            }),
          );
        }
        if (payload.message === '좋아요 취소!') {
          setLike(false);
          dispatch(
            updateCampList({
              campId: payload.campId,
              likes: likes - 1,
            }),
          );
          dispatch(
            updateSearchedCampList({
              campId: payload.campId,
              likes: likes - 1,
            }),
          );
        }
      } else {
      }
    });
  };

  useEffect(() => {
    setLike(likeStatus);
  }, []);

  const likeBtn = () => {
    likeCamp(campId);
    ReactGa.event({
      category: '찜하기 버튼',
      action: '찜하기',
    });
  };

  return (
    <>
      {like ? (
        <Back onClick={likeBtn}>
          <LikedImg src={Likedheart} />
        </Back>
      ) : (
        <UnLBack onClick={likeBtn}>
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
