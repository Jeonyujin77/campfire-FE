import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import ReactGa from 'react-ga';
import { __getReviewRank } from '../../apis/campApi';
import { ReviewRankTypes } from '../../interfaces/camp';
import rankReview from '../../asset/rank/rankReview.png';

const ReviewRank = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<ReviewRankTypes[]>();

  useEffect(() => {
    dispatch(__getReviewRank()).then(res => {
      const { payload, type }: any = res;
      if (type === 'getReviewRank/fulfilled') {
        setItems(payload.reviews);
      }
      // 에러처리
      else if (type === 'getReviewRank/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <Wrap>
      <Title>
        <img src={rankReview} alt="리뷰아이콘" />
        리뷰가 많은 캠핑장
      </Title>
      <RankWrap>
        {items?.map((item, i) => (
          <RankItem
            key={item.campId}
            onClick={() => {
              ReactGa.event({
                category: '메인 페이지',
                action: '리뷰캠핑장 선택',
              });
              navigate(`/camp/${item.campId}`);
            }}
          >
            <RankItemNum>{`${i + 1}.`}</RankItemNum>
            <RankItemName>{item.campName}</RankItemName>
          </RankItem>
        ))}
      </RankWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 536px;
  height: 130px;
  border-radius: 44px;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.2);
  font-family: 'SEBANG_Gothic';
  padding: 18px 17px 18px 17px;

  @media (max-width: 1200px) {
    width: 97%;
  }
`;

const Title = styled.div`
  background-color: #a1c182;
  border-radius: 22.5px;
  font-size: 25px;
  font-weight: bold;
  margin: 0px 0px 7px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0px;
  gap: 5px;
  color: white;

  img {
    width: 24px;
    height: 24px;
  }
`;

const RankWrap = styled.div`
  max-width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  font-weight: bold;
  gap: 3px;
  @media (max-width: 1200px) {
    padding-bottom: 3px;
    overflow-x: scroll;
  }
`;

const RankItem = styled.div`
  width: 167px;
  height: 26px;
  border-radius: 13px;
  cursor: pointer;
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  background-color: #e8e8e8;
  :hover {
    background-color: #a1c182;
    color: white;
  }
  @media (max-width: 1200px) {
    width: 130px;
  }
  @media (max-width: 800px) {
    width: 200px;
  }
  @media (max-width: 600px) {
    width: 150px;
  }
  @media (max-width: 400px) {
    width: 130px;
  }
`;

const RankItemNum = styled.div`
  color: #fe802c;

  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

const RankItemName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

export default ReviewRank;
