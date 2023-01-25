//라이브러리
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
//api
import { __getCampsByParams, __getSiteByParams } from '../apis/campApi';
import { __reserveCamps } from '../apis/reservationApi';
//훅
import useReserveInfo from '../hooks/useReserveInfo';
//컴포넌트
import RepresentDate from '../components/reservations/RepresentDate';
import DdayBox from '../components/reservations/DdayBox';
import CheckAuth from '../components/common/CheckAuth';
import ImgSwiper from '../components/reservations/imgSwiper';
import Button from '../components/common/Button';
import TextModal from '../components/common/TextModal';
//이미지
import closeArrow from '../asset/closeArrow.png';
import openArrow from '../asset/openArrow.png';

const ReservationDescpage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const campparams = Number(useParams().campId);
  const siteparams = Number(useParams().siteId);

  const { pathname } = useLocation();
  const [headText, setHeadText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  //해당 캠프 데이터 받아오기
  const [site, setSite] = useState<any>();

  // 상세페이지에서 넘어온 예약정보
  const state = location.state as {
    dateState: { startday: any; endday: any };
    countState: { adult: any; child: any };
  };
  // 캠핑장아이디,시작일, 종료일, 화면에 표시되는 시작/종료일, 디데이, 성인수, 아동수
  const [startday, endday, representStart, representEnd, dDay, adult, child] =
    useReserveInfo(state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(__getSiteByParams({ campparams, siteparams })).then(res => {
      const { payload, type }: any = res;
      console.log('res:', res);
      console.log('payload:', payload);
      console.log('type:', type);
      if (type === 'getSiteByParams/fulfilled') {
        setSite(payload.site);
      }
      // 에러처리
      else if (type === 'getSiteByParams/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, []);

  //예약하기 버튼
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('캠핑장아이디: ', state.campId);
    // console.log('시작일: ', startday);
    // console.log('종료일: ', endday);
    // console.log('성인수: ', adult);
    // console.log('아동수: ', child);

    const reserveInfo = {
      campId: campparams,
      siteId: siteparams,
      checkInDate: startday,
      checkOutDate: endday,
      adults: adult,
      children: child,
    };
    dispatch(__reserveCamps(reserveInfo)).then(res => {
      const { type, payload } = res;
      if (type === 'reserveCamps/fulfilled') {
        alert(`${payload.message}`);
        window.location.href = '/';
      } else if (type === 'reserveCamps/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  const [showInfo, setShowInfo] = useState(false);
  const [showCaution, setShowCaution] = useState(false);

  return site ? (
    <>
      <CheckAuth />
      <Wrap onSubmit={onSubmit}>
        <ImgSwiper
          campMainImage={site.siteMainImage}
          campSubImages={site.siteSubImages}
        />
        <TextBox
          fontStyle="SEBANG_Gothic"
          minWidth="1180px"
          fontSize="33px"
          fontWeight="bold"
          margin="20px"
        >
          {site.siteName}
        </TextBox>
        <TopWrap>
          <SiteDescWrap>
            <TextBoxHeader>내가 선택한 상품정보</TextBoxHeader>
            <SiteDesc>
              <DescLeft>
                <DescLeftItem>상품유형</DescLeftItem>
                <DescLeftItem>기준인원</DescLeftItem>
                <DescLeftItem>사이트크기</DescLeftItem>
                <DescLeftItem>입퇴실시간</DescLeftItem>
              </DescLeft>
              <DescRight>
                <DescRightItem>{site.typeLists.join(', ')}</DescRightItem>
                <DescRightItem>
                  {'기준인원 '}
                  {site.minPeople}
                  {' - '}
                  {'최대인원 '}
                  {site.maxPeople}
                </DescRightItem>
                <DescRightItem>업체에 문의</DescRightItem>
                <DescRightItem>
                  {'입실 '}
                  {site.checkIn.split(':')[0]}
                  {':'}
                  {site.checkIn.split(':')[1]}
                  {' - '}
                  {'퇴실 '}
                  {site.checkOut.split(':')[0]}
                  {':'}
                  {site.checkOut.split(':')[1]}
                </DescRightItem>
              </DescRight>
            </SiteDesc>
          </SiteDescWrap>
          <SiteDescWrap>
            <TextBoxHeader color="#FE802C">나의 캠핑까지</TextBoxHeader>
            <DdayBox
              dDay={dDay}
              representStart={representStart}
              representEnd={representEnd}
            />
          </SiteDescWrap>
        </TopWrap>
        <TextBox minWidth="1180px">
          <TextBoxHeader>상품정보</TextBoxHeader>
          <div
            style={{
              margin: '10px 10px 0px 10px',
              backgroundColor: '#FFECE0',
              padding: '20px',
              borderRadius: '20px',
            }}
          >
            <CampIntro>{site.siteDesc}</CampIntro>
          </div>
        </TextBox>
        <TextBox minWidth="1180px">
          <TextBoxHeader>상품소개</TextBoxHeader>
          <div
            style={{
              margin: '10px 10px 0px 10px',
              backgroundColor: '#FFECE0',
              padding: '20px',
              borderRadius: '20px 20px 0px 0px',
            }}
          >
            <CampInfo show={showInfo}>{site.siteDesc}</CampInfo>
          </div>
          {showInfo ? (
            <CloseBtn
              onClick={() => {
                setShowInfo(!showInfo);
              }}
            >
              <ArrowImg src={closeArrow} />
              접기
            </CloseBtn>
          ) : (
            <OpenBtn
              onClick={() => {
                setShowInfo(!showInfo);
              }}
            >
              <ArrowImg src={openArrow} />
              펼치기
            </OpenBtn>
          )}
        </TextBox>
        <TextBox minWidth="1180px">
          <TextBoxHeader>주의사항</TextBoxHeader>
          <div
            style={{
              margin: '10px 10px 0px 10px',
              backgroundColor: '#FFECE0',
              padding: '20px',
              borderRadius: '20px 20px 0px 0px',
            }}
          >
            <CampInfo show={showCaution}>{site.siteInfo}</CampInfo>
          </div>
          {showCaution ? (
            <>
              <CloseBtn
                onClick={() => {
                  setShowCaution(!showCaution);
                }}
              >
                <ArrowImg src={closeArrow} />
                접기
              </CloseBtn>
            </>
          ) : (
            <OpenBtn
              onClick={() => {
                setShowCaution(!showCaution);
              }}
            >
              <ArrowImg src={openArrow} />
              펼치기
            </OpenBtn>
          )}
        </TextBox>
        <ReservationPageNav>
          <Button
            onClick={() => {
              return;
            }}
            width="1100px"
            height="50px"
            fontSize="22px"
            fontWeight="bold"
            margin="10px 30px"
            bgColor="#A1C182"
            color="white"
            mwidth="300px"
          >
            예약하기
          </Button>
        </ReservationPageNav>
      </Wrap>
    </>
  ) : (
    <button
      style={{ marginTop: '100px' }}
      onClick={() => {
        console.log(site);
      }}
    ></button>
  );
};

const Wrap = styled.form`
  margin: 0px auto;
  margin-top: 100px;
  margin-bottom: 50px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const TopWrap = styled.div`
  display: flex;
  width: 1180px;
  gap: 50px;
  padding: 10px;
  @media (max-width: 1200px) {
    display: block;
    width: 90%;
  }
`;

const SiteDescWrap = styled.div``;

const SiteDesc = styled.div`
  margin: 10px 10px 0px 10px;
  background-color: #ffece0;
  padding: 10px;
  border-radius: 20px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1200px) {
    width: 95%;
    padding: 0px;
  }
`;

const DescLeft = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 130px;
  @media (max-width: 1200px) {
    width: 30%;
  }
`;

const DescLeftItem = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const DescRight = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 250px;
  @media (max-width: 1200px) {
    width: 60%;
  }
`;

const DescRightItem = styled.div`
  margin: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const OpenBtn = styled.div`
  margin: 0px 10px 10px 10px;
  background-color: #ffece0;
  padding: 0px 20px 20px 20px;
  border-radius: 0px 0px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

const CloseBtn = styled.div`
  margin: 0px 10px 10px 10px;
  background-color: #ffece0;
  padding: 0px 20px 20px 20px;
  border-radius: 0px 0px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

const ArrowImg = styled.img`
  width: 30px;
  height: 20px;
`;

const TextBox = styled.div<{
  minWidth?: string;
  fontWeight?: string;
  fontSize?: string;
  fontStyle?: string;
  margin?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100%;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '100px')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  font-family: ${({ fontStyle }) => (fontStyle ? fontStyle : 'NanumSquare')};
  margin-bottom: 5px;
  margin: ${({ margin }) => (margin ? margin : '0px')};
  padding: 10px;
  word-break: break-all;
  word-wrap: break-word;
  @media (max-width: 1200px) {
    min-width: 90%;
  }
`;

const TextBoxHeader = styled.div<{ color?: string }>`
  margin: 10px 10px 0px 10px;
  padding: 0px 20px;
  font-size: 25px;
  font-weight: bold;
  color: ${({ color }) => (color ? color : 'black')};
`;

const CampInfo = styled.p<{ show: boolean }>`
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: ${({ show }) => (show ? 'inherit' : '3')};
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ffd8be;
  /* height: ${({ show }) => (show ? '100%' : '40px')};
  max-height: 10000px;
  transition: max-height 1s; */
`;

const CampIntro = styled.div`
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReservationPageNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ReservationDescpage;
