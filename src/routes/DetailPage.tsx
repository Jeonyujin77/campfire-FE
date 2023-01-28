//라이브러리
import styled from '@emotion/styled';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
//api
import { __getCampsByParams } from '../apis/campApi';
//훅
import { campGeocoder } from '../utils/Geocoder';
import useGeolocation from '../hooks/useGeolocation';
//interface
import { SiteList } from '../interfaces/camp';
import { countType, dateType } from '../interfaces/Reservations';
//컴포넌트
import CommentList from '../components/reservations/commentList';
import Button from '../components/common/Button';
import CheckAuth from '../components/common/CheckAuth';
import Sites from '../components/camps/Sites';
import CampAmenities from '../components/reservations/campAmenities';
import ImgSwiper from '../components/reservations/imgSwiper';
import CategoryFromBounds from '../components/camps/CategoryFromBounds';
//이미지
import locationImg from '../asset/locationImg.png';
import phoneImg from '../asset/phoneImg.png';
import CampLikeButton from '../components/camps/CampLikeButton';
import CampDatePicker from '../components/camps/CampDatePicker';
import CampHeadCounter from '../components/camps/CampHeadCounter';

const DetailPage = () => {
  const dispatch = useAppDispatch();
  const params = Number(useParams().campId); // 캠핑장 아이디
  const { pathname } = useLocation(); // 현재 경로
  const [camp, setCamp] = useState<any>(); // 캠핑장 정보
  const [start, setStart] = useState(new Date()); // 시작일
  const [end, setEnd] = useState(new Date()); // 종료일
  const [adult, setAdult] = useState(2); // 성인수
  const [child, setChild] = useState(0); // 아동수
  const [sites, setSites] = useState<SiteList | null>(); // 사이트리스트
  const [isCmtOpen, setIsCmtOpen] = useState(false); // 더보기
  const [dateObj, setDateObj] = useState<dateType>({
    startday: '',
    endday: '',
  }); // 날짜
  const [countObj, setCountObj] = useState<countType>({
    adult: adult,
    child: child,
  }); // 인원수
  const [campLat, setCampLat] = useState(''); // 캠핑장위도
  const [campLng, setCampLng] = useState(''); // 캠핑장경도
  const location = useGeolocation(); //사용자 위치정보 불러오기

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
      }
      // 에러처리
      else if (type === 'getCampsByParams/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, []);

  //검색 후 날짜나 인원수를 바꾸면 사이트목록을 비워 다시 검색하도록 유도한다.
  useEffect(() => {
    if (sites) {
      setSites(null);
    }
  }, [start, end, adult, child]);

  // 날짜 변경
  useEffect(() => {
    setDateObj({ ...dateObj, startday: start, endday: end });
  }, [start, end]);

  // 인원수 변경
  useEffect(() => {
    setCountObj({ ...countObj, adult: adult, child: child });
  }, [adult, child]);

  // 캠핑장 위치 위도, 경도 구하기
  useEffect(() => {
    if (camp) {
      campGeocoder(camp.campAddress, setCampLat, setCampLng);
    }
  }, [camp]);

  //길찾기 버튼 이동함수
  const getDirection = useCallback(() => {
    if (location.error) {
      alert(
        `위치 액세스가 허용되어야 사용이 가능합니다.\n허용된 상태라면 새로고침을 해주세요.`,
      );
      return;
    }
    if (location.coordinates) {
      window.open(
        `https://map.kakao.com/link/from/사용자위치,${location.coordinates.lat},${location.coordinates.lng}/to/${camp.campName},${campLat},${campLng}/`,
      );
    }
  }, [campLat, campLng]);

  //번호 복사 함수
  const handleCopyClipBoard = async () => {
    try {
      navigator.clipboard.writeText(camp.phoneNumber);
      alert('클립보드에 번호가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다.');
    }
  };

  // 접기/열기
  const isCmtOpenChange = useCallback(() => {
    setIsCmtOpen(!isCmtOpen);
  }, [isCmtOpen]);

  return camp ? (
    <>
      <CheckAuth />
      <Wrap>
        <ImgSwiper
          campMainImage={camp.campMainImage}
          campSubImages={camp.campSubImages}
        />
        <DescWrap>
          <div>
            <div>
              <DescBox>
                <CampName>{camp.campName}</CampName>
                <CampLikeButton params={params} />
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
          <CampDatePicker
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
          />
          <CampHeadCounter
            params={params}
            adult={adult}
            child={child}
            start={start}
            end={end}
            setSites={setSites}
            setAdult={setAdult}
            setChild={setChild}
          />
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
                      <CampAmenities key={amenity} amenity={amenity} />
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
            <CategoryFromBounds
              campLat={campLat}
              campLng={campLng}
              campName={camp.campName}
            />
          </MapBox>
          <CommentList
            isCmtOpen={isCmtOpen}
            setIsCmtOpen={setIsCmtOpen}
            campId={params}
          />
          {isCmtOpen ? (
            <CmtBox onClick={() => isCmtOpenChange()}>{'접기 '}</CmtBox>
          ) : (
            <CmtBox onClick={() => isCmtOpenChange()}>{'열기 '}</CmtBox>
          )}
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
    border-radius: 20px;
  }

  @media (max-width: 1200px) {
    height: 400px;
  }
`;

export default DetailPage;
