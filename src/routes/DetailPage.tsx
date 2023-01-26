//라이브러리
import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
//api
import {
  __getCampsByParams,
  __getCampSitesByParams,
  __likeCampByParams,
} from '../apis/campApi';
//interface
import { SiteList } from '../interfaces/camp';
//컴포넌트
import DateChoiceModal from '../components/reservations/dateChoiceModal';
import CommentList from '../components/reservations/commentList';
import Button from '../components/common/Button';
import CheckAuth from '../components/common/CheckAuth';
import Sites from '../components/camps/Sites';
import CampAmenities from '../components/reservations/campAmenities';
import ImgSwiper from '../components/reservations/imgSwiper';
//이미지
import likeOn from '../asset/likeOn.png';
import likeOff from '../asset/likeOff.png';
import dateImg from '../asset/dateImg.png';
import locationImg from '../asset/locationImg.png';
import phoneImg from '../asset/phoneImg.png';
import adultImg from '../asset/adultImg.png';
import childImg from '../asset/childImg.png';
import { roadMap } from '../utils/CampsUtil';
import { KAKAO_AUTH_URL } from '../apis/loginkeys';
import { campGeocoder } from '../utils/Geocoder';
import campSlice from '../redux/modules/campSlice';
import useGeolocation from '../hooks/useGeolocation';
import { changeFormat } from '../hooks/useChangeDateFormat';

interface dateType {
  startday?: any;
  endday?: any;
}

interface countType {
  adult?: any;
  child?: any;
}

const DetailPage = () => {
  const dispatch = useAppDispatch();
  const params = Number(useParams().campId); // 캠핑장 아이디
  const { pathname } = useLocation(); // 현재 경로
  const [camp, setCamp] = useState<any>(); // 캠핑장 정보
  const [start, setStart] = useState(new Date()); // 시작일
  const [end, setEnd] = useState(new Date()); // 종료일
  const [adult, setAdult] = useState(2); // 성인수
  const [child, setChild] = useState(0); // 아동수
  const [isOpen, setIsOpen] = useState(false); // 모달 isOpen
  const [sites, setSites] = useState<SiteList | null>(); // 사이트리스트
  const [like, setLike] = useState<boolean>(); // 좋아요
  const [isCmtOpen, setIsCmtOpen] = useState(false); // 더보기
  const [dateObj, setDateObj] = useState<dateType>({
    startday: '',
    endday: '',
  }); // 날짜
  const [countObj, setCountObj] = useState<countType>({
    adult: adult,
    child: child,
  }); // 인원수
  const mapContainer = useRef(null); // 캠핑장 지도

  //페이지 이동 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
  }, [pathname]);

  //사이트 진입 시 params로 camp데이터 가져오기
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

  useEffect(() => {
    setDateObj({ ...dateObj, startday: start, endday: end });
  }, [start, end]);

  useEffect(() => {
    setCountObj({ ...countObj, adult: adult, child: child });
  }, [adult, child]);

  //검색 후 날짜나 인원수를 바꾸면 사이트목록을 비워
  //다시 검색하도록 유도한다.
  useEffect(() => {
    if (sites) {
      setSites(null);
    }
  }, [start, end, adult, child]);

  // 카카오 맵 API로 지도 출력
  useEffect(() => {
    if (mapContainer !== null && camp !== undefined) {
      roadMap(camp.campAddress, camp.campName);
    }
  }, [mapContainer, camp]);

  //캠핑장 위도, 경도 불러오기
  const [campLat, setCampLat] = useState(); //위도
  const [campLng, setCampLng] = useState(); //경도
  useEffect(() => {
    if (camp) {
      campGeocoder(camp.campAddress, setCampLat, setCampLng);
    }
  }, [camp]);

  //사용자 위치정보 불러오기
  const location = useGeolocation();
  //길찾기 버튼 이동함수
  const getDirection = () => {
    if (location.error) {
      alert(`위치 액세스가 허용되어야 사용이 가능합니다!`);
      return;
    }
    if (location.coordinates) {
      window.open(
        `https://map.kakao.com/link/from/사용자위치,${location.coordinates.lat},${location.coordinates.lng}/to/${camp.campName},${campLat},${campLng}/`,
      );
    }
  };

  // 요일 계산
  const getday = (dayNum: number) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dayNum];
  };

  // 성인수 감소
  const adultMinusButton = () => {
    if (adult <= 1) return;
    setAdult(adult - 1);
  };
  // 성인수 증가
  const adultPlusButton = () => {
    setAdult(adult + 1);
  };
  // 아동수 감소
  const childMinusButton = () => {
    if (child <= 0) return;
    setChild(child - 1);
  };
  // 아동수 증가
  const childPlusButton = () => {
    setChild(child + 1);
  };
  // 접기/열기
  const isCmtOpenChange = () => {
    setIsCmtOpen(!isCmtOpen);
  };

  //사이트 검색 버튼 onClick
  const getCampSites = () => {
    if (start && end) {
      dispatch(
        __getCampSitesByParams({
          params,
          adult,
          child,
          start: changeFormat(start, 'yyyy-MM-DD'),
          end: changeFormat(end, 'yyyy-MM-DD'),
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
  };

  //찜하기, 찜취소하기 버튼 onClick
  const likeCamp = () => {
    dispatch(__likeCampByParams(params)).then(res => {
      const { type, payload }: any = res;
      if (type === 'likeCampByParams/fulfilled') {
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

  //번호 복사 함수
  const handleCopyClipBoard = async () => {
    try {
      navigator.clipboard.writeText(camp.phoneNumber);
      alert('클립보드에 번호가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다.');
    }
  };

  return camp ? (
    <>
      <CheckAuth />
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
        <DescWrap>
          <div>
            <div>
              <DescBox>
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
              </DescBox>
              <CampDesc>
                <IconLo src={locationImg} />
                <div>{camp.campAddress}</div>
                <Button
                  bgColor="#fff2e9"
                  width="54px"
                  height="27px"
                  fontSize="12px"
                  borderRadius="13.5px"
                  margin="0px"
                  onClick={getDirection}
                >
                  길찾기
                </Button>
              </CampDesc>
              <CampDesc>
                <IconPh src={phoneImg} />
                <div>{camp.phoneNumber}</div>
                <Button
                  bgColor="#fff2e9"
                  fontSize="12px"
                  width="45px"
                  height="27px"
                  borderRadius="13.5px"
                  margin="0px"
                  onClick={handleCopyClipBoard}
                >
                  복사
                </Button>
              </CampDesc>
            </div>
          </div>
          <DateWrap>
            <IconDa src={dateImg} />
            <DateText>
              <div>
                {start?.getMonth() + 1}월 {start?.getDate()}일 (
                {getday(start?.getDay())}){' - '}
                {end ? (
                  <>
                    {end?.getMonth() + 1}월 {end?.getDate()}일 (
                    {getday(end?.getDay())})
                  </>
                ) : (
                  '체크아웃날짜'
                )}
              </div>
            </DateText>
            <Button
              bgColor="#fff2e9"
              fontSize="12px"
              width="67px"
              height="27px"
              borderRadius="13.5px"
              margin="0px"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              날짜선택
            </Button>
          </DateWrap>
          <HeadCountWrap>
            <HeadText>방문인원</HeadText>
            <HeadCount>
              <CountWrap>
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
              </CountWrap>
              <Button bgColor="#FFECE0" onClick={getCampSites}>
                검색하기
              </Button>
            </HeadCount>
          </HeadCountWrap>

          {camp.campAmenities ? (
            <AmenityWrap>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                부대시설
              </div>
              <div style={{ display: 'flex' }}>
                {camp.campAmenities ? (
                  <Amenities>
                    {camp.campAmenities.map((amenity: any) => (
                      <CampAmenities key={amenity}>{amenity}</CampAmenities>
                    ))}
                  </Amenities>
                ) : (
                  <></>
                )}
              </div>
            </AmenityWrap>
          ) : (
            <></>
          )}
          {sites ? (
            <>
              <SiteLists sites={sites}>
                {sites.getSiteLists.map(site => (
                  <Sites
                    key={site.siteId}
                    theme={camp.themeLists}
                    type={camp.typeLists}
                    dateObj={dateObj}
                    countObj={countObj}
                    site={site}
                  />
                ))}
              </SiteLists>
            </>
          ) : (
            <></>
          )}
          <MapBox>
            <div id="map" className="mapViewPopUp" ref={mapContainer}></div>
          </MapBox>
          {isCmtOpen ? (
            <CmtBox onClick={() => isCmtOpenChange()}>
              {'접기 '}
              {/* <ArrImg src={upArrowOrange} /> */}
            </CmtBox>
          ) : (
            <CmtBox onClick={() => isCmtOpenChange()}>
              {'열기 '}
              {/* <ArrImgDown src={upArrowOrange} /> */}
            </CmtBox>
          )}
          <CommentList
            isCmtOpen={isCmtOpen}
            setIsCmtOpen={setIsCmtOpen}
            campId={params}
          />
        </DescWrap>
      </Wrap>
    </>
  ) : null;
};

const Wrap = styled.div`
  margin: 0px auto;
  margin-top: 100px;
  margin-bottom: 50px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const DescWrap = styled.div`
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    padding: 15px;
  }
`;

const DescBox = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 1130px;
  margin-bottom: 20px;
  @media (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 20px;
      height: 20px;
    }
  }
`;
const CampName = styled.div`
  font-size: 25px;
  font-weight: bold;
  font-family: 'SEBANG_Gothic';
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
`;

const CampDesc = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 7px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const IconLo = styled.img`
  width: 20px;
  height: 27px;
`;

const IconPh = styled.img`
  width: 20px;
  height: 20px;
`;

const IconDa = styled.img`
  width: 20px;
  height: 20px;
`;

const IconAd = styled.img`
  width: 22px;
  height: 23px;
`;

const DateWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 20px;
`;

const DateText = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
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

const AmenityWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;

const Amenities = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: rgb(255, 236, 224);
  gap: 5px;
`;

const SiteLists = styled.div<{ sites: any }>`
  display: ${({ sites }) => (sites ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px 20px 0px;
  gap: 15px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const CmtBox = styled.div`
  border: 1px solid lightgray;
  background-color: #a1c182;
  border-radius: 20px;
  color: white;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
  #map {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1200px) {
    height: 300px;
  }
`;

export default DetailPage;
