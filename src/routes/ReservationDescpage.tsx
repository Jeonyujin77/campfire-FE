import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import ImgSwiper from '../components/reservations/imgSwiper';
import Button from '../components/common/Button';
import TextModal from '../components/common/TextModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RepresentDate from '../components/reservations/RepresentDate';
import { useAppDispatch } from '../redux/store';
import { __getCampsByParams, __getSiteByParams } from '../apis/campApi';
import DdayBox from '../components/reservations/DdayBox';
import CheckBox from '../components/reservations/CheckBox';
import useReserveInfo from '../hooks/useReserveInfo';
import CheckAuth from '../components/common/CheckAuth';

const ReservationDescpage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const campparams = Number(useParams().campId);
  const siteparams = Number(useParams().siteId);
  console.log('campparams:', campparams);
  console.log('siteparams:', siteparams);
  const { pathname } = useLocation();
  const [headText, setHeadText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [cancleInfo, setCancleInfo] = useState(false);
  //해당 캠프 데이터 받아오기
  const [site, setSite] = useState<any>();
  //약관 동의 체크박스
  const [isAllChecked, setAllChecked] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(5).fill(false));
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

  const handleAllCheck = () => {
    setAllChecked(prev => !prev);
    let array = new Array(5).fill(!isAllChecked);
    setCheckedState(array);
  };

  const handleMonoCheck = (position: number) => {
    //각 체크박스별로 검사해서 누른 체크박스만 변하도록
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    );
    setCheckedState(updatedCheckedState);
    //위에서 map을 돌린 체크박스에 reduce를 사용해서 개수를 더한 값과
    //체크된 박스의 개수가 같다면 Allchecked를 true로 바꾼다.
    //(개별로 체크를 다 해도 전체체크박스가 자동으로 체크된다는 뜻)
    const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
      if (currentState === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setAllChecked(checkedLength === updatedCheckedState.length);
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
      <Wrap>
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
            <Button
              onClick={() => {
                setHeadText('캠핑장 이용안내');
                setBodyText(`${site.siteDesc}`);
                setIsOpen(!isOpen);
              }}
              width="150px"
              height="40px"
              margin="0px 0px 10px 0px"
            >
              상세보기
            </Button>
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
            <Button
              onClick={() => {
                setHeadText('캠핑장 이용 주의사항');
                setBodyText(`${site.siteInfo}`);
                setIsOpen(!isOpen);
              }}
              width="150px"
              height="40px"
            >
              상세보기
            </Button>
          </div>
        </TextBox>
        {/* <CheckBox
          isAllChecked={isAllChecked}
          setAllChecked={setAllChecked}
          checkedState={checkedState}
          setCheckedState={setCheckedState}
          handleAllCheck={handleAllCheck}
          handleMonoCheck={handleMonoCheck}
        /> */}
        <CancleBox>
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
        </CancleBox>
        <RepresentDate
          representStart={representStart}
          representEnd={representEnd}
        />
        <ReservationPageNav>
          <Button
            onClick={() => {
              navigate(`/camp/${campparams}/sitereservation/${siteparams}`, {
                state: {
                  dateState: { startday, endday, representStart, representEnd },
                  countState: { adult, child },
                  campId: site.siteId,
                },
              });
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

const CampIntro = styled.div`
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CancleBox = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200;
  max-height: 100%;
  min-height: 60px;
  font-size: 25px;
  margin-bottom: 10px;
  gap: 10px;
`;

const CancleTextBox = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1200px;
  max-height: 100%;
  min-height: 60px;
  font-size: 25px;
  gap: 10px;
`;

const CancleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancleBtnOpen = styled.div<{ cancleInfo: boolean }>`
  display: ${({ cancleInfo }) => (cancleInfo ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
`;

const CancleBtnClose = styled.div<{ cancleInfo: boolean }>`
  display: ${({ cancleInfo }) => (cancleInfo ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const CancleDetail = styled.div<{ cancleInfo: boolean }>`
  border: 1px solid black;
  display: ${({ cancleInfo }) => (cancleInfo ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
`;

const CancleDetailLeft = styled.div`
  border: 1px solid black;
  width: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancleDetailRight = styled.div`
  border: 1px solid black;
  width: 580px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const ReservationPageNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ReservationDescpage;
