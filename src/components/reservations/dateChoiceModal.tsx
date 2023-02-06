//라이브러리
import styled from '@emotion/styled';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import ReactGa from 'react-ga';
//datePicker css
import 'react-datepicker/dist/react-datepicker.css';
import './dateChoiceModal.css';
//컴포넌트
import Button from '../common/Button';

interface MProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStart: React.Dispatch<React.SetStateAction<Date>>;
  setEnd: React.Dispatch<React.SetStateAction<Date>>;
}

const DateChoiceModal = (props: MProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    props.setStart(start);
    props.setEnd(end);
  };
  const getday = (dayNum: number) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dayNum];
  };

  const selectCompleted = () => {
    ReactGa.event({
      category: '디테일 페이지',
      action: '날짜 선택완료',
    });
    props.setIsOpen(!props.isOpen);
  };

  return (
    <>
      <ModalBackground
        onClick={selectCompleted}
        isOpen={props.isOpen}
      ></ModalBackground>
      <ModalWrap isOpen={props.isOpen}>
        <DateText>
          <div>
            {startDate?.getMonth() + 1}월 {startDate?.getDate()}일 (
            {getday(startDate?.getDay())})
          </div>
          -
          <div>
            {endDate ? (
              <>
                {endDate?.getMonth() + 1}월 {endDate?.getDate()}일 (
                {getday(endDate?.getDay())})
              </>
            ) : (
              '체크아웃날짜'
            )}
          </div>
        </DateText>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()} //지난 날짜는 선택하지 못하도록
          selectsRange
          inline
        />
        <ModalBottom>
          <Button
            onClick={() => {
              props.setIsOpen(!props.isOpen);
            }}
            margin="0px"
            bgColor="#fe802c"
            width="135px"
            height="43px"
            fontSize="18px"
            color="white"
            fontWeight="bold"
          >
            취소
          </Button>
          <Button
            onClick={selectCompleted}
            margin="0px"
            bgColor="#A1C182"
            width="135px"
            height="43px"
            fontSize="18px"
            color="white"
            fontWeight="bold"
          >
            완료
          </Button>
        </ModalBottom>
      </ModalWrap>
    </>
  );
};

const ModalBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1500;
`;

const ModalWrap = styled.div<{ isOpen: boolean }>`
  border: 3px solid #fe802c;
  border-radius: 20px;
  position: fixed;
  margin: auto;
  top: calc(50vh - 170px);
  left: calc(50vw - 150px);
  background-color: white;
  width: 340px;
  min-height: 370px;
  max-height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 5px;
  gap: 5px;
  z-index: 2000;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  @media (max-width: 1200px) {
    left: calc(50vw - 170px);
    width: 320px;
  }
`;

const DateText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 284px;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  gap: 30px;
  background-color: #ffdec8;
  border-radius: 15px;
  margin-bottom: 10px;
`;

const ModalBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
`;

export default DateChoiceModal;
