import dayjs from 'dayjs';
import styled from '@emotion/styled';
import React, { Dispatch, useCallback } from 'react';
import Button from '../common/Button';
import adultImg from '../../asset/adultImg.png';
import childImg from '../../asset/childImg.png';
import { __getCampSitesByParams } from '../../apis/campApi';
import { useAppDispatch } from '../../redux/store';
import { SiteList } from '../../interfaces/camp';

const CampHeadCounter = ({
  params, // 캠핑장 아이디
  adult, // 성인수
  child, // 아동수
  start, // 시작일
  end, // 종료일
  setSites, // 사이트목록 setter
  setAdult, // 성인수 setter
  setChild, // 아동수 setter
}: {
  params: number;
  adult: number;
  child: number;
  start: Date;
  end: Date;
  setSites: Dispatch<React.SetStateAction<SiteList | null | undefined>>;
  setAdult: React.Dispatch<React.SetStateAction<number>>;
  setChild: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();

  // 성인수 감소
  const adultMinusButton = useCallback(() => {
    if (adult <= 1) return;
    setAdult(adult - 1);
  }, [adult, setAdult]);

  // 성인수 증가
  const adultPlusButton = useCallback(() => {
    setAdult(adult + 1);
  }, [adult, setAdult]);

  // 아동수 감소
  const childMinusButton = useCallback(() => {
    if (child <= 0) return;
    setChild(child - 1);
  }, [child, setChild]);

  // 아동수 증가
  const childPlusButton = useCallback(() => {
    setChild(child + 1);
  }, [child, setChild]);

  //사이트 검색 버튼 onClick
  const getCampSites = useCallback(() => {
    if (start && end) {
      dispatch(
        __getCampSitesByParams({
          params,
          adult,
          child,
          start: dayjs(start).format('YYYY-MM-DD'),
          end: dayjs(end).format('YYYY-MM-DD'),
        }),
      ).then(res => {
        const { type, payload }: any = res;
        if (type === 'getCampSitesByParams/fulfilled') {
          setSites(payload);
        }
        // 에러처리
        else if (type === 'getCampSitesByParams/rejected') {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    } else {
      alert('날짜를 선택하세요!');
    }
  }, [adult, child, start, end, params, setSites, dispatch]);

  return (
    <HeadCountWrap>
      <HeadText>방문인원</HeadText>
      <HeadCount>
        <CountWrap>
          <AdultWrap>
            <IconAd src={adultImg} />
            성인
            <Button
              width="27px"
              height="27px"
              bgColor="rgb(254,128,44)"
              borderRadius="13.5px"
              fontSize="23px"
              fontWeight="bold"
              color="white"
              margin="12px"
              onClick={() => {
                adultMinusButton();
              }}
            >
              -
            </Button>
            {adult}
            <Button
              width="27px"
              height="27px"
              bgColor="rgb(254,128,44)"
              borderRadius="13.5px"
              fontSize="23px"
              fontWeight="bold"
              color="white"
              margin="12px"
              onClick={() => {
                adultPlusButton();
              }}
            >
              +
            </Button>
          </AdultWrap>
          <AdultWrap>
            <IconAd src={childImg} />
            아동
            <Button
              width="27px"
              height="27px"
              bgColor="rgb(254,128,44)"
              borderRadius="13.5px"
              fontSize="23px"
              fontWeight="bold"
              color="white"
              margin="12px"
              onClick={() => {
                childMinusButton();
              }}
            >
              -
            </Button>
            {child}
            <Button
              width="27px"
              height="27px"
              bgColor="rgb(254,128,44)"
              borderRadius="13.5px"
              fontSize="23px"
              fontWeight="bold"
              color="white"
              margin="12px"
              onClick={() => {
                childPlusButton();
              }}
            >
              +
            </Button>
          </AdultWrap>
        </CountWrap>
        <Button bgColor="#FFECE0" onClick={getCampSites}>
          검색하기
        </Button>
      </HeadCount>
    </HeadCountWrap>
  );
};

const IconAd = styled.img`
  width: 22px;
  height: 23px;
`;

const HeadCountWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;

const HeadText = styled.div`
  font-weight: bold;
  margin: 10px 0px;
`;

const HeadCount = styled.div`
  display: flex;
  gap: 5px;
  @media (max-width: 1200px) {
    font-size: 12px;
    gap: 2px;
  }

  button {
    font-size: 12px;
  }
`;

const CountWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 0px 25px 0px 25px;
  border-radius: 20px;
  gap: 10px;
  background-color: rgb(255, 236, 224);

  @media (max-width: 1200px) {
    gap: 3%;
  }
`;

const AdultWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default CampHeadCounter;
