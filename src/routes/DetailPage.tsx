import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

//axios관련
import { useAppDispatch } from '../redux/store';
import {
  __getCampsByParams,
  __getCampSitesByParams,
  __likeCampByParams,
} from '../apis/campApi';

//interface
import { SiteList, SiteListsRes } from '../interfaces/camp';

//컴포넌트
import DateChoiceModal from '../components/reservations/dateChoiceModal';
import CommentList from '../components/reservations/commentList';
import Button from '../components/common/Button';
import CheckAuth from '../components/common/CheckAuth';
import Sites from '../components/camps/Sites';
import CampAmenities from '../components/reservations/campAmenities';
import ImgSwiper from '../components/reservations/imgSwiper';

//이미지 불러오기
import likeOn from '../asset/likeOn.png';
import likeOff from '../asset/likeOff.png';
import dateImg from '../asset/dateImg.png';
import locationImg from '../asset/locationImg.png';
import phoneImg from '../asset/phoneImg.png';
import adultImg from '../asset/adultImg.png';
import childImg from '../asset/childImg.png';
import upArrowOrange from '../asset/upArrowOrange.png';

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
  //사이트진입시 params로 camp데이터 가져오기
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

  //모달 isOpen값
  const [isOpen, setIsOpen] = useState(false);

  const [sites, setSites] = useState<SiteList>();
  //사이트 검색 버튼 onClick
  const getCampSites = () => {
    if (start && end) {
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
    } else {
      alert('날짜를 선택하세요!');
    }
  };

  const [like, setLike] = useState<boolean>();
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

  //인원수, 날짜
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
        {/* <button
        // onClick={() => {
        //   console.log('dateObj:', dateObj);
        //   console.log('countObj:', countObj);
        // }}
        onClick={() => {
          console.log(camp);
        }}
      ></button> */}
        <DescWrap>
          <div>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  width: '1130px',
                  // border: '1px solid red',
                  // margin: '20px',
                  marginBottom: '20px',
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
            <CmtBox onClick={() => isCmtOpenChange()}>
              {'접기 '}
              <ArrImg src={upArrowOrange} />
            </CmtBox>
          ) : (
            <CmtBox onClick={() => isCmtOpenChange()}>
              {'열기 '}
              <ArrImgDown src={upArrowOrange} />
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
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 100px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  /* border: 1px solid red; */
`;

const DescWrap = styled.div`
  padding: 15px 30px 15px 30px;
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
`;

const CampName = styled.div`
  font-size: 25px;
  font-weight: bold;
  font-family: 'SEBANG_Gothic';
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CampDesc = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 7px;
  /* justify-content: center; */
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
  /* background-color: #afadad; */
  /* width: 200px;
  height: 40px; */
  /* border-radius: 15px; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

const HeadCountWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const HeadText = styled.div`
  font-weight: bold;
  margin: 10px 0px;
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
  padding: 0px 25px 0px 25px;
  border-radius: 20px;
  gap: 10px;
  background-color: rgb(255, 236, 224);
`;

const AmenityWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 5px;
`;

const Amenities = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: flex-start; */
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
  /* border: 1px solid black; */
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
  gap: 10px;
`;

const ArrImg = styled.img`
  width: 23px;
  height: 23px;
`;

const ArrImgDown = styled.img`
  width: 23px;
  height: 23px;
  transform: rotate(180deg);
`;

export default DetailPage;
