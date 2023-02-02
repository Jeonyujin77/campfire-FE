//라이브러리
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import ReactGa from 'react-ga';
//인터페이스
import { CampType } from '../../interfaces/camp';
import Button from '../common/Button';
//컴포넌트
import CampItem from './campItem';
import MultipleMarkerMaps from './MultipleMarkerMaps';

const SearchedCampList = ({ campList }: { campList: CampType[] }) => {
  const [camps, setCamps] = useState<CampType[]>();
  const [toggleMap, setToggleMap] = useState(false);

  useEffect(() => {
    setCamps(campList);
  }, [campList]);

  const listOrMap = () => {
    ReactGa.event({
      category: '검색 페이지',
      action: '지도로보기, 리스트로보기 버튼',
    });
    setToggleMap(!toggleMap);
  };

  return camps?.length !== 0 ? (
    <>
      <Button bgColor="#ffece0" onClick={listOrMap}>
        {toggleMap ? '리스트로 보기' : '지도로 보기'}
      </Button>
      {toggleMap ? (
        <MapBox>
          <MultipleMarkerMaps campList={campList} />
        </MapBox>
      ) : (
        <Wrap>
          <ListWrap>
            {camps?.map(camp => (
              <CampItem key={camp.campId} camp={camp} />
            ))}
          </ListWrap>
        </Wrap>
      )}
    </>
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

const MapBox = styled.div`
  width: 100%;
  height: 600px;
  margin-bottom: 20px;

  #map {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  @media (max-width: 1200px) {
    height: 400px;
  }
`;

export default SearchedCampList;
