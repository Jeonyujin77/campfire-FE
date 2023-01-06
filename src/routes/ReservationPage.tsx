import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import RepresentDate from '../components/reservations/RepresentDate';
import DdayBox from '../components/reservations/DdayBox';
import RoomCount from '../components/reservations/RoomCount';
import ClientInfo from '../components/reservations/ClientInfo';
import CheckBox from '../components/reservations/CheckBox';
import Button from '../components/common/Button';

const ReservationPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [roomCount, setRoomCount] = useState(1);

  //navigate로 받은 state
  const location = useLocation();
  const state = location.state as {
    dateState: {
      startday: any;
      endday: any;
      representStart: string;
      representEnd: string;
    };
  };

  //날짜 표시 State
  const startday = state.dateState.startday;
  const endday = state.dateState.endday;
  const representStart = state.dateState.representStart;
  const representEnd = state.dateState.representEnd;

  //디데이 표시 계산
  const userDate: any = new Date();
  const dDay = '' + Math.ceil((startday - userDate) / (1000 * 60 * 60 * 24));

  //예약자 필수정보
  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  //예약자 선택정보
  const [userEmail, setUserEmail] = useState('');
  const [userRequest, setUserRequest] = useState('');

  //약관 동의 체크박스
  const [isAllChecked, setAllChecked] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(5).fill(false));
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

  return (
    <Wrap>
      <TextBox>
        <TextBoxHeader>상품정보</TextBoxHeader>
        <TextBoxBody>
          <TextBoxP fontSize="22px">캠핑장 이름</TextBoxP>
          <TextBoxP fontSize="18px">캠핑장 간단한 소개</TextBoxP>
          <RepresentDate
            representStart={representStart}
            representEnd={representEnd}
          />
        </TextBoxBody>
      </TextBox>
      <DdayBox dDay={dDay} />
      <TextBox
        minHeight="150px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TextBoxHeader>예약객실수 최대 ~개 선택가능</TextBoxHeader>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 20px 0px 20px',
            fontSize: '22px',
            fontWeight: 'bold',
          }}
        >
          <RoomCount roomCount={roomCount} setRoomCount={setRoomCount} />
        </div>
      </TextBox>
      <ClientInfo
        userName={userName}
        phoneNum={phoneNum}
        userEmail={userEmail}
        userRequest={userRequest}
        setUserName={setUserName}
        setPhoneNum={setPhoneNum}
        setUserEmail={setUserEmail}
        setUserRequest={setUserRequest}
      />
      <CheckBox
        isAllChecked={isAllChecked}
        setAllChecked={setAllChecked}
        checkedState={checkedState}
        setCheckedState={setCheckedState}
        handleAllCheck={handleAllCheck}
        handleMonoCheck={handleMonoCheck}
      />
      <Button
        width="200px"
        onClick={() => {
          alert('결제작업!');
        }}
      >
        예약 결제하기
      </Button>
    </Wrap>
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
  padding-top: 20px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextBox = styled.div<{
  minHeight?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
}>`
  border: 1px solid black;
  margin: 0px 20px 5px 20px;
  width: 1160px;
  min-height: ${({ minHeight }) => (minHeight ? minHeight : '200px')};
  max-height: 100%;
  display: ${({ display }) => (display ? display : 'block')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'flex-start')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'flex-start'};
`;

const TextBoxHeader = styled.div`
  margin: 20px 20px 0px 20px;
  font-size: 27px;
  font-weight: bold;
`;

const TextBoxBody = styled.div`
  margin: 15px 30px 20px 30px;
  font-weight: 600;
  height: 100%;
`;

const TextBoxP = styled.div<{ fontSize: string }>`
  margin: 5px 0px;
  font-size: ${({ fontSize }) => fontSize};
`;

export default ReservationPage;