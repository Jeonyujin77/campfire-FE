import React from 'react';
import styled from 'styled-components';
import CampItem from './campItem';

export interface DetailCamp {
  campId: number;
  img: string;
  name: string;
  address: string;
}

const CampItemList = () => {
  const dummyData = [
    {
      campId: 1,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 2,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 3,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 4,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 5,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 6,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 7,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
    {
      campId: 8,
      img: 'https://ldb-phinf.pstatic.net/20210316_181/1615889940906JODyL_JPEG/03119896_%282%29.jpg?type=f804_408_60_sharpen',
      name: '진주 캠핑소사이어티 럭셔리 글램핑&피크닉',
      address: '경상남도 진주시',
    },
  ];

  return (
    <ListWrap>
      {dummyData.map(camp => (
        <CampItem key={camp.campId} camp={camp} />
      ))}
    </ListWrap>
  );
};

const ListWrap = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default CampItemList;
