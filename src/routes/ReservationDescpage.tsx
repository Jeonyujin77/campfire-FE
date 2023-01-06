import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ImgSwiper from '../components/reservations/imgSwiper';
import Button from '../components/common/Button';
import TextModal from '../components/common/TextModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RepresentDate from '../components/reservations/RepresentDate';

const ReservationDescpage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  //DetailPage에서 서버로부터 get한 해당 camp의 데이터를 store에 저장해두고
  //store에서 params === campId 인 데이터를 가져와서 뿌려주는 형식으로 해야할 것 같음
  //혹은 여기서 다시 서버에 get요청을 해도 되는데 효율적인 행동인지?
  //캠프 예약정보 페이지에 접근하는 방법이 디테일페이지를 타고 들어오는것 밖에 없다면
  //store에 저장하는 것이 맞고, 다른 방법이 있다면 여기서 다시 get하는게 맞을 것으로 보임

  const navigate = useNavigate();
  const params = useParams().campId;
  const location = useLocation();
  const state = location.state as { dateState: { startday: any; endday: any } };
  const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
  const startday = state.dateState.startday;
  const endday = state.dateState.endday;
  const representStart =
    startday.getMonth() +
    1 +
    '.' +
    startday.getDate() +
    ' (' +
    dayArr[startday.getDay()] +
    ')';
  const representEnd =
    endday.getMonth() +
    1 +
    '.' +
    endday.getDate() +
    ' (' +
    dayArr[endday.getDay()] +
    ')';

  // 확인 console
  // console.log(state);
  // console.log(`startday: ${startday} \n endday: ${endday}`);
  // console.log(`\n ${representStart} ${typeof representStart} \n ${representEnd} ${typeof representEnd}`);

  const [headText, setHeadText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [cancleInfo, setCancleInfo] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <TextModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        headText={headText}
        bodyText={bodyText}
      />
      <Wrap>
        {/* <ImgSwiper /> */}
        <TextBox minWidth="40px" fontWeight="bold">
          호스트가 적은 캠핑장 이름 및 간단한 정보 입력칸입니다.
        </TextBox>
        <TextBox>
          <TextBoxHeader>상품정보</TextBoxHeader>
          <div
            style={{
              margin: '10px 10px 10px 10px',
            }}
          >
            <CampIntro></CampIntro>
          </div>
        </TextBox>
        <TextBox>
          <TextBoxHeader>상품소개</TextBoxHeader>
          <div
            style={{
              margin: '10px 10px 10px 10px',
            }}
          >
            <p>※빠른 입실 원하시는 경우 업체로 직접 문의 바람</p>
            <p>※※늦은 퇴실 원하시는 경우 다음날 예약자 없을시에만 가능</p>
            <p>(빠른입실, 늦은 퇴실 모두 추가비용 발생 할 수 있음)</p>
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
                setBodyText('문자열 내 줄바꿈 처리 어떻게 해야하지');
                setIsOpen(!isOpen);
              }}
              width="150px"
              height="40px"
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
            <p>
              주의사항을 읽지 않고 이용 시 발생하는 불이익에 대해 책임지지
              않습니다. 꼭 읽어주세요.
            </p>
            <p>자세한 내용은 아래 상세보기 버튼을 눌러 확인해주세요.</p>
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
                setBodyText(
                  '문자열 내 줄바꿈 처리 어떻게 해야하지123123123해야하지12312312\n해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123해야하지123123123',
                );
                setIsOpen(!isOpen);
              }}
              width="150px"
              height="40px"
            >
              상세보기
            </Button>
          </div>
        </TextBox>
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
              navigate(`/camp/${params}/campreservation`, {
                state: {
                  dateState: { startday, endday, representStart, representEnd },
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
  word-break: break-all;
  word-wrap: break-word;
`;

const TextBoxHeader = styled.div`
  margin: 10px 10px 0px 10px;
`;

const CampIntro = styled.div`
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
