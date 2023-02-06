//라이브러리
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
//api
import { __getPremiumCamps } from '../../apis/campApi';
//컴포넌트
import CampItem from './campItem';
import { CampType } from '../../interfaces/camp';

const PremiumCampsList = () => {
  const dispatch = useAppDispatch();
  const [campList, setCampList] = useState<CampType[]>();

  useEffect(() => {
    window.scrollTo(0, 0);
    getInitData();
  }, []);

  //처음 입장시 데이터 조회
  const getInitData = async () => {
    dispatch(__getPremiumCamps()).then(res => {
      const { payload, type }: any = res;
      if (type === 'getPremiumCamps/fulfilled') {
        setCampList(payload.premium);
      }
      // 에러처리
      else if (type === 'getPremiumCamps/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  return campList ? (
    <Wrap>
      <ListWrap>
        {campList?.map(camp => (
          <CampItem key={camp.campId} camp={camp} />
        ))}
      </ListWrap>
    </Wrap>
  ) : (
    <>등록된 캠핑장이 없습니다.</>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100%;
  min-height: 100vh;
`;

const ListWrap = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default PremiumCampsList;
