import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';

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
  return (
    <>
      <ModalBackground
        onClick={() => {
          props.setIsOpen(!props.isOpen);
        }}
        isOpen={props.isOpen}
      ></ModalBackground>
      <ModalWrap isOpen={props.isOpen}>
        <ModalHeader>
          <div>날짜선택</div>
          <ModalCloseBtn
            onClick={() => {
              props.setIsOpen(!props.isOpen);
            }}
          >
            x
          </ModalCloseBtn>
        </ModalHeader>
        <DateText>
          <div>
            {startDate?.getMonth() + 1}.{startDate?.getDate()}(
            {getday(startDate?.getDay())})
          </div>
          /
          <div>
            {endDate?.getMonth() + 1}.{endDate?.getDate()}(
            {getday(endDate?.getDay())})
          </div>
        </DateText>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
        <ModalBottom>
          <CompleteBtn
            onClick={() => {
              props.setIsOpen(!props.isOpen);
            }}
          >
            선택완료
          </CompleteBtn>
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
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1500;
`;

const ModalWrap = styled.div<{ isOpen: boolean }>`
  border: 1px solid red;
  position: absolute;
  top: calc(50vh - 170px);
  left: calc(50vw - 150px);
  background-color: white;
  width: 340px;
  height: 400px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  gap: 5px;
  z-index: 2000;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
`;

const ModalHeader = styled.div`
  border: 1px solid green;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: red;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

const DateText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  border: 1px solid blue;
`;

const ModalBottom = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row-reverse;
  width: 250px;
`;

const CompleteBtn = styled.button``;

export default DateChoiceModal;
