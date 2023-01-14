import DateChoiceModal from '../components/reservations/dateChoiceModal';
import { useState, useEffect } from 'react';
import ImgSwiper from '../components/reservations/imgSwiper';
import styled from '@emotion/styled';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CommentList from '../components/reservations/commentList';
import Button from '../components/common/Button';
import CampAmenities from '../components/reservations/campAmenities';
import { useAppDispatch } from '../redux/store';
import {
  __getCampsByParams,
  __getCampSitesByParams,
  __likeCampByParams,
} from '../apis/campApi';
import { SiteList, SiteListsRes } from '../interfaces/camp';
import Sites from '../components/camps/Sites';
import CheckAuth from '../components/common/CheckAuth';
import likeOn from '../asset/likeOn.png';
import likeOff from '../asset/likeOff.png';

interface dateType {
  startday?: any;
  endday?: any;
}

interface countType {
  adult?: any;
  child?: any;
}

const DetailPage = () => {
  //페이지 이동 시 스크롤 최상단
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();
  const params = Number(useParams().campId);
  const dispatch = useAppDispatch();
  const [camp, setCamp] = useState<any>();

  useEffect(() => {
    dispatch(__getCampsByParams(params)).then(res => {
      const { payload, type }: any = res;
      if (type === 'getCampsByParams/fulfilled') {
        setCamp(payload.camp);
        setLike(payload.camp.likeStatus);
      }
      // 에러처리
      else if (type === 'getCampsByParams/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const getday = (dayNum: number) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dayNum];
  };

  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const adultMinusButton = () => {
    if (adult <= 1) return;
    setAdult(adult - 1);
  };
  const adultPlusButton = () => {
    setAdult(adult + 1);
  };
  const childMinusButton = () => {
    if (child <= 0) return;
    setChild(child - 1);
  };
  const childPlusButton = () => {
    setChild(child + 1);
  };

  const [isCmtOpen, setIsCmtOpen] = useState(false);
  const isCmtOpenChange = () => {
    setIsCmtOpen(!isCmtOpen);
  };

  const [dateObj, setDateObj] = useState<dateType>({
    startday: '',
    endday: '',
  });

  const [sites, setSites] = useState<SiteList>();
  //사이트 검색 버튼 onClick
  const getCampSites = () => {
    dispatch(__getCampSitesByParams(params)).then(res => {
      console.log(res);
      const { type, payload }: any = res;
      console.log('type:', type);
      console.log('payload:', payload);
      if (type === 'getCampSitesByParams/fulfilled') {
        setSites(payload);
      }
      // 에러처리
      else if (type === 'getCampSitesByParams/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  const [like, setLike] = useState<boolean>();

  useEffect(() => {});
  //찜하기, 찜취소하기 버튼 onClick
  const likeCamp = () => {
    dispatch(__likeCampByParams(params)).then(res => {
      const { type, payload }: any = res;
      if (type === 'likeCampByParams/fulfilled') {
        // console.log('res:', res);
        // console.log('type:', type);
        // console.log('payload:', payload);
        if (payload.message === '좋아요 성공!') {
          setLike(true);
        }
        if (payload.message === '좋아요 취소!') {
          setLike(false);
        }
      }
      // 에러처리
      else if (type === 'likeCampByParams/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  useEffect(() => {
    setDateObj({ ...dateObj, startday: start, endday: end });
  }, [start, end]);
  const [countObj, setCountObj] = useState<countType>({
    adult: adult,
    child: child,
  });

  useEffect(() => {
    setCountObj({ ...countObj, adult: adult, child: child });
  }, [adult, child]);

  return camp ? (
    <Wrap>
      <DateChoiceModal
        setStart={setStart}
        setEnd={setEnd}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ImgSwiper
        campMainImage={camp.campMainImage}
        campSubImages={camp.campSubImages}
      />
      <button
        onClick={() => {
          console.log('dateObj:', dateObj);
          console.log('countObj:', countObj);
        }}
      ></button>
      <DescWrap>
        <div>
          <div>
            <div
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                width: '1130px',
                border: '1px solid red',
              }}
            >
              <CampName>{camp.campName}</CampName>
              <div style={{ cursor: 'pointer' }} onClick={likeCamp}>
                {like ? (
                  <img
                    src={likeOn}
                    width="40px"
                    height="40px"
                    alt="좋아요버튼"
                  />
                ) : (
                  <img
                    src={likeOff}
                    width="40px"
                    height="40px"
                    alt="좋아요버튼"
                  />
                )}
              </div>
            </div>
            <CampDesc>{camp.campAddress}</CampDesc>
            <CampDesc>campPhonenumber</CampDesc>
          </div>
        </div>
        <DateText
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div>
            {start?.getMonth() + 1}.{start?.getDate()}({getday(start?.getDay())}
            ){' / '}
            {end?.getMonth() + 1}.{end?.getDate()}({getday(end?.getDay())})
          </div>
        </DateText>
        <HeadCountWrap>
          <div>방문하시는 인원을 선택하세요</div>
          <HeadCount>
            <CountWrap>
              성인
              <Button
                width="25px"
                height="25px"
                bgColor="transparent"
                borderRadius="5px"
                fontSize="16px"
                onClick={() => {
                  adultMinusButton();
                }}
              >
                -
              </Button>
              {adult}
              <Button
                width="25px"
                height="25px"
                bgColor="transparent"
                borderRadius="5px"
                fontSize="16px"
                onClick={() => {
                  adultPlusButton();
                }}
              >
                +
              </Button>
              아동
              <Button
                width="25px"
                height="25px"
                bgColor="transparent"
                borderRadius="5px"
                fontSize="16px"
                onClick={() => {
                  childMinusButton();
                }}
              >
                -
              </Button>
              {child}
              <Button
                width="25px"
                height="25px"
                bgColor="transparent"
                borderRadius="5px"
                fontSize="16px"
                onClick={() => {
                  childPlusButton();
                }}
              >
                +
              </Button>
              <Button
                //navigate하면서 date값도 보내줌
                // onClick={() => {
                //   navigate(`/camp/${params}/campdesc`, {
                //     state: { dateState: dateObj, countState: countObj },
                //   });
                // }}
                onClick={getCampSites}
              >
                검색하기
              </Button>
            </CountWrap>
          </HeadCount>
        </HeadCountWrap>
        {camp.campAmenities ? (
          <AmenityWrap>
            <div
              style={{
                width: '100px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '5px',
              }}
            >
              부대시설
            </div>
            {camp.campAmenities ? (
              <Amenities>
                {camp.campAmenities.map((amenity: any) => (
                  <CampAmenities key={amenity}>{amenity}</CampAmenities>
                ))}
              </Amenities>
            ) : (
              <></>
            )}
          </AmenityWrap>
        ) : (
          <></>
        )}
        <SiteLists sites={sites}>
          {sites ? (
            sites.sites.map(site => (
              <Sites
                key={site.siteId}
                theme={camp.themeLists}
                type={camp.typeLists}
                dateObj={dateObj}
                countObj={countObj}
                site={site}
              />
            ))
          ) : (
            <></>
          )}
        </SiteLists>
        {isCmtOpen ? (
          <CmtBox onClick={() => isCmtOpenChange()}>접기 🔼</CmtBox>
        ) : (
          <CmtBox onClick={() => isCmtOpenChange()}>열기 🔽</CmtBox>
        )}
        <CommentList
          isCmtOpen={isCmtOpen}
          setIsCmtOpen={setIsCmtOpen}
          campId={params}
        />
      </DescWrap>
    </Wrap>
  ) : null;
};

const Wrap = styled.div`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 100px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  border: 1px solid red;
`;

const DescWrap = styled.div`
  padding: 15px 30px 15px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CampName = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const CampDesc = styled.div`
  font-size: 25px;
  font-weight: 500;
`;

const DateText = styled.div`
  text-align: center;
  background-color: #afadad;
  width: 200px;
  height: 40px;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

const HeadCountWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadCount = styled.div`
  display: flex;
  gap: 5px;
`;

const CountWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const AmenityWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;
`;

const Amenities = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 5px;
`;

const SiteLists = styled.div<{ sites: any }>`
  display: ${({ sites }) => (sites ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 20px 0px 20px 0px;
  gap: 15px;
`;

const CmtBox = styled.div`
  border: 1px solid lightgray;
  text-align: center;
  font-size: 23px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DetailPage;
