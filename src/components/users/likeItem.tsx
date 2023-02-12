//라이브러리
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import ReactGa from 'react-ga';
//인터페이스
import { Like } from '../../interfaces/Users';
//이미지
import noMainImg from '../../asset/campItem/noMainImg.png';

const LikeItem = ({ like }: { like: Like }) => {
  const navigate = useNavigate();
  return (
    <ItemWrap
      onClick={() => {
        ReactGa.event({
          category: '마이 페이지',
          action: '찜한 캠핑장으로 이동',
        });
        navigate(`/camp/${like.campId}`);
      }}
    >
      <ItemImg
        src={like.campMainImage}
        alt="캠핑장메인이미지"
        onError={event => {
          if (event.target instanceof HTMLImageElement) {
            event.target.src = `${noMainImg}`;
          }
        }}
      />
      <TextWrap>
        <div>
          <CampTitle>{like.campName}</CampTitle>
          <CampDesc>{like.typeLists}</CampDesc>
        </div>
        <CampDesc>{like.campAddress}</CampDesc>
      </TextWrap>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  width: 550px;
  height: 130px;
  border: 1px solid #dadada;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px 1px #c0bdbd;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ItemImg = styled.img`
  width: 250px;
  height: 130px;
  border-radius: 10px;
  @media (max-width: 600px) {
    width: 40%;
  }
`;

const TextWrap = styled.div`
  width: 280px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const CampTitle = styled.div`
  font-weight: bold;
  margin-bottom: 7px;
  font-size: 18px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const CampDesc = styled.p`
  font-size: 15px;
  word-break: keep-all;
  padding: 0;
  margin: 0;
  line-height: 1.5;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export default LikeItem;
