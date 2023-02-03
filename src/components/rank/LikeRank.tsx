import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { __getLikeRank } from '../../apis/campApi';
import { LikeRankTypes } from '../../interfaces/camp';
import { useAppDispatch } from '../../redux/store';
import ReactGa from 'react-ga';

const LikeRank = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState<LikeRankTypes[]>();

  useEffect(() => {
    dispatch(__getLikeRank()).then(res => {
      const { payload, type }: any = res;
      if (type === 'getLikeRank/fulfilled') {
        setItems(payload.likes);
      }
      // 에러처리
      else if (type === 'getLikeRank/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, []);

  return (
    <Wrap>
      <Title>실시간 인기 캠핑장</Title>
      <RankWrap>
        {items?.map((item, i) => (
          <RankItem
            key={item.campId}
            onClick={() => {
              ReactGa.event({
                category: '메인 페이지',
                action: '인기캠핑장 선택',
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
  font-size: 25px;
  font-weight: bold;
  margin: 0px 0px 19px 10px;
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
  :hover {
    background-color: #e8e8e8;
  }
`;

const RankItemNum = styled.div`
  color: #fe802c;
`;

const RankItemName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default LikeRank;
