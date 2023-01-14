import React from 'react';
import styled from '@emotion/styled';
import unLikedheart from '../../asset/unLikedheart.png';

const Liked = () => {
  return (
    <Back>
      <UnLikedImg src={unLikedheart} />
    </Back>
  );
};

const Back = styled.div`
  width: 30px;
  height: 30px;
  background-color: rgba;
  border-radius: 15px;
  border: 1px solid black;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UnLikedImg = styled.img`
  width: 25px;
  height: 25px;
`;

export default Liked;
