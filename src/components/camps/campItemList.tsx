import styled from '@emotion/styled';
import CampItem from './campItem';
import { useEffect, useState, useCallback } from 'react';
import { __getCampsByPageno } from '../../apis/campApi';
import { useAppDispatch } from '../../redux/store';

export interface CampType {
  campAddress: string;
  campAmenities: any;
  campDesc: string;
  campId: number;
  campMainImage: string;
  campName: string;
  campPrice: number;
  campSubImages: any;
  checkIn: any;
  checkOut: any;
  cretedAt: any;
  hostId: number;
  updatedAt: any;
  typeLists: [];
}

let pageno = 1;
const CampItemList = () => {
  const dispatch = useAppDispatch();

  const [target, setTarget] = useState<any>();
  const [camps, setCamps] = useState<CampType[]>();
  const [isLoaded, setIsLoaded] = useState(false);

  //처음 입장시 데이터 조회
  const getInitData = async () => {
    setIsLoaded(true);
    dispatch(__getCampsByPageno(1)).then(res => {
      const { payload, type }: any = res;
      if (type === 'getCampsByPageno/fulfilled') {
        setCamps(payload.camps);
      }
    });
    setIsLoaded(false);
  };

  useEffect(() => {
    getInitData();
  }, []);

  // //추가 데이터 조회
  const getMoreCamps = useCallback(async () => {
    setIsLoaded(true);
    pageno++;
    dispatch(__getCampsByPageno(pageno)).then(res => {
      const { type, payload }: any = res;
      if (type === 'getCampsByPageno/fulfilled') {
        console.log(payload.camps);
        if (camps !== undefined) {
          const mergeData = camps.concat(...payload.camps);
          setCamps(mergeData);
        }
        setIsLoaded(false);
      } else if (type === 'getPostsByPageno/rejected') {
        setTarget(null);
        setIsLoaded(false);
      }
    });
    // setPageno((prev) => prev +1)
  }, [camps, dispatch]);

  const onIntersect: IntersectionObserverCallback = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        getMoreCamps();
        observer.observe(entry.target);
      }
    },
    [getMoreCamps, isLoaded],
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  return camps ? (
    <Wrap>
      {/* <button
        onClick={() => {
          console.log(camps);
        }}
      ></button> */}
      <ListWrap>
        {/* <button
        onClick={() => {
          console.log(camps);
        }}
      ></button> */}
        {camps?.map(camp => (
          <CampItem key={camp.campId} camp={camp} />
        ))}
      </ListWrap>
      {camps?.length !== 0 ? (
        <Footer ref={setTarget}>{isLoaded && <br />}</Footer>
      ) : (
        <>등록된 캠핑장이 없습니다.</>
      )}
    </Wrap>
  ) : (
    <>등록된 캠핑장이 없습니다.</>
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

const Footer = styled.div`
  border: 1px solid black;
  height: 30px;
`;

export default CampItemList;
