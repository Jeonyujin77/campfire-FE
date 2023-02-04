//라이브러리
import styled from '@emotion/styled';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
//api
import { __getCampsByPageno } from '../../apis/campApi';
import { addCampList, removeCampList } from '../../redux/modules/campSlice';
//컴포넌트
import CampItem from './campItem';

let pageno = 1;
const CampItemList = () => {
  const dispatch = useAppDispatch();
  const [target, setTarget] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const campList = useSelector((state: RootState) => state.camp.camps);

  useEffect(() => {
    window.scrollTo(0, 0);
    getInitData();
  }, []);

  //처음 입장시 데이터 조회
  const getInitData = async () => {
    pageno = 1;
    dispatch(removeCampList([]));
    setIsLoaded(true);
    dispatch(__getCampsByPageno(1)).then(res => {
      const { payload, type }: any = res;
      if (type === 'getCampsByPageno/fulfilled') {
        dispatch(addCampList(payload.camps));
      }
      // 에러처리
      else if (type === 'getCampsByPageno/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
    setIsLoaded(false);
  };
  // //추가 데이터 조회
  const getMoreCamps = useCallback(async () => {
    setIsLoaded(true);
    pageno++;
    dispatch(__getCampsByPageno(pageno)).then(res => {
      const { type, payload }: any = res;
      if (type === 'getCampsByPageno/fulfilled') {
        dispatch(addCampList(payload.camps));
        setIsLoaded(false);
      } else if (type === 'getPostsByPageno/rejected') {
        setTarget(null);
        setIsLoaded(false);
      }
    });
  }, [dispatch]);

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

  return campList ? (
    <Wrap>
      <ListWrap>
        {campList?.map(camp => (
          <CampItem key={camp.campId} camp={camp} />
        ))}
      </ListWrap>
      {campList?.length !== 0 ? (
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
  max-height: 100%;
  min-height: 100vh;
`;

const ListWrap = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Footer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CampItemList;
