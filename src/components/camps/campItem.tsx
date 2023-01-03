import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DetailCamp } from './campItemList';

const CampItem = ({ camp }: { camp: DetailCamp }) => {
  const navigate = useNavigate();
  return (
    <ItemWrap
      onClick={() => {
        navigate(`/camp/${camp.campId}`);
      }}
    >
      <CampImg src={camp.img} alt="캠프장사진" />
      <div>
        <CampDesc>{camp.name}</CampDesc>
        <CampDesc>캠핑, 글램핑</CampDesc>
        <CampDesc>{camp.address}</CampDesc>
      </div>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  width: 275px;
  height: 350px;
  border: 1px solid blue;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const CampImg = styled.img`
  border: 1px solid green;
  width: 260px;
  height: 200px;
`;

const CampDesc = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  border: 1px solid gray;
`;

export default CampItem;
