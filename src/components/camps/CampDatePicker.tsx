import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import Button from '../common/Button';
import dateImg from '../../asset/dateImg.png';
import DateChoiceModal from '../reservations/dateChoiceModal';

const CampDatePicker = ({
  start,
  end,
  setStart, // 시작일
  setEnd, // 종료일
}: {
  start: Date;
  end: Date;
  setStart: React.Dispatch<React.SetStateAction<Date>>;
  setEnd: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const [isOpen, setIsOpen] = useState(false); // 모달 isOpen

  // 요일 계산
  const getday = useCallback((dayNum: number) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dayNum];
  }, []);

  return (
    <DateWrap>
      <DateChoiceModal
        setStart={setStart}
        setEnd={setEnd}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
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
  );
};

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

const IconDa = styled.img`
  width: 20px;
  height: 20px;
`;

export default CampDatePicker;
