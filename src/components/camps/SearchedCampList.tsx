import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { CampType } from '../../interfaces/camp';
import CampItem from './campItem';

const SearchedCampList = ({ campList }: { campList: CampType[] }) => {
  const [camps, setCamps] = useState<CampType[]>();

  useEffect(() => {
    setCamps(campList);
  }, [campList]);

  return camps?.length !== 0 ? (
    <Wrap>
      <ListWrap>
        {camps?.map(camp => (
          <CampItem key={camp.campId} camp={camp} />
        ))}
      </ListWrap>
    </Wrap>
  ) : (
    <NoData>등록된 캠핑장이 없습니다.</NoData>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid red; */
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

const NoData = styled.div`
  text-align: center;
  margin: 50px 0;
`;

export default SearchedCampList;
