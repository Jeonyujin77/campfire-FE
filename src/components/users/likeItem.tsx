import React from 'react';
import styled from '@emotion/styled';
import { Like } from '../../interfaces/Users';
import { useNavigate } from 'react-router-dom';

const LikeItem = ({ like }: { like: Like }) => {
  const navigate = useNavigate();
  return (
    <ItemWrap
      onClick={() => {
        navigate(`/camp/${like.campId}`);
      }}
    >
      <ItemImg src={like.campMainImage} alt="캠핑장메인이미지" />
      <TextWrap>
        <div>
          <CampTitle>{like.campName}</CampTitle>
          <div>
            {like.typeLists}
            {/* {like.typeLists.join(',')} */}
          </div>
        </div>
        <div>{like.campAddress}</div>
      </TextWrap>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  width: 550px;
  height: 130px;
  border: 1px solid blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px 1px #c0bdbd;
  }
`;

const ItemImg = styled.img`
  width: 250px;
  height: 130px;
`;

const TextWrap = styled.div`
  width: 280px;
  height: 110px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const CampTitle = styled.div`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 7px;
`;

export default LikeItem;
