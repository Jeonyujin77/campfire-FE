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

  return site ? (
    <>
      <CheckAuth />
      <TextModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        headText={headText}
        bodyText={bodyText}
      />
      <Wrap onSubmit={onSubmit}>
        <ImgSwiper
          campMainImage={site.siteMainImage}
          campSubImages={site.siteSubImages}
        />
        <TextBox minWidth="40px" fontSize="33px" fontWeight="bold">
          {site.siteName}
        </TextBox>
        <DdayBox dDay={dDay} />
        <TextBox>
          <TextBoxHeader>상품정보</TextBoxHeader>
          <div
            style={{
              margin: '10px 10px 10px 10px',
            }}
          >
            <CampIntro>{site.siteDesc}</CampIntro>
          </div>
        </TextBox>
        <TextBox>
          <TextBoxHeader>상품소개</TextBoxHeader>
          <div
            style={{
              margin: '10px 10px 0px 10px',
            }}
          >
            <CampInfo>{site.siteDesc}</CampInfo>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DetailBtn
              onClick={() => {
                setHeadText('캠핑장 이용안내');
                setBodyText(`${site.siteDesc}`);
                setIsOpen(!isOpen);
              }}
            >
              상세보기
            </DetailBtn>
          </div>
        </TextBox>
        <TextBox>
          <TextBoxHeader>주의사항</TextBoxHeader>
          <div
            style={{
              margin: '10px 10px 10px 10px',
            }}
          >
            <CampInfo>{site.siteInfo}</CampInfo>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DetailBtn
              onClick={() => {
                setHeadText('캠핑장 이용 주의사항');
                setBodyText(`${site.siteInfo}`);
                setIsOpen(!isOpen);
              }}
            >
              상세보기
            </DetailBtn>
          </div>
        </TextBox>
        <>
          {/* <CheckBox
          isAllChecked={isAllChecked}
          setAllChecked={setAllChecked}
          checkedState={checkedState}
          setCheckedState={setCheckedState}
          handleAllCheck={handleAllCheck}
          handleMonoCheck={handleMonoCheck}
        /> */}
          {/* <CancleBox>
          <CancleTextBox onClick={() => setCancleInfo(!cancleInfo)}>
            <CancleText>취소 수수료 안내</CancleText>
            <CancleBtnOpen cancleInfo={cancleInfo}>[열기 🔽]</CancleBtnOpen>
            <CancleBtnClose cancleInfo={cancleInfo}>[닫기 🔼]</CancleBtnClose>
          </CancleTextBox>
          <CancleDetail cancleInfo={cancleInfo}>
            <CancleDetailLeft>
              <div>수수료테이블 만들어야함 이것도 서버에서 줘야할듯</div>
            </CancleDetailLeft>
            <CancleDetailRight>
              <span>[ 취소수수료 규정 안내 ]</span>
              <span>
                * 예약취소는 구매한 사이트 "MYPAGE" 혹은 "예약확인/취소"에서
                가능합니다.
              </span>
              <span>
                * 취소수수료는 예약 시점과는 무관하게 '입실일로부터 남은 날짜'
                기준으로 부과되오니 신중히 예약 바랍니다.
              </span>
              <span>
                * 예약 이용일 변경은 불가합니다. (취소 수수료 확인 후) 기존 예약
                건 취소 및 재예약하셔야 합니다.
              </span>
              <span>
                * 중복예약 취소, 업체 요청에 의한 취소, 법령에 의한 취소 등은
                반드시 캠프파이어 고객센터(000-0000-0000) 또는 해당 숙소를
                통하여 도움을 받으십시오.
              </span>
              <span>
                * 미성년자는 예약이 불가하며, 보호자 동반 없이 이용 불가합니다.
              </span>
            </CancleDetailRight>
          </CancleDetail>
        </CancleBox> */}
        </>
        <RepresentDate
          representStart={representStart}
          representEnd={representEnd}
        />
        <ReservationPageNav>
          <Button
            onClick={() => {
              return;
            }}
            width="250px"
            height="50px"
            fontSize="22px"
            fontWeight="bold"
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
  border: 1px solid red;
`;

const TextBox = styled.div<{
  minWidth?: string;
  fontWeight?: string;
  fontSize?: string;
}>`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200;
  max-height: 100%;
  min-height: ${({ minWidth }) => (minWidth ? minWidth : '100px')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  margin-bottom: 5px;
  padding: 10px;
  word-break: break-all;
  word-wrap: break-word;
`;

const TextBoxHeader = styled.div`
  margin: 10px 10px 0px 10px;
  font-size: 25px;
  font-weight: bold;
`;

const CampInfo = styled.p`
  white-space: pre-wrap;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 75px;
  margin-bottom: 0px;
`;

const DetailBtn = styled.div`
  width: 150px;
  height: 40px;
  background-color: #d9d6d6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  &:hover {
    background-color: #bcbcbc;
  }
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
