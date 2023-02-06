//라이브러리
import styled from '@emotion/styled';

interface DDayProps {
  dDay: string;
  representStart: any;
  representEnd: any;
}

const DdayBox = ({ dDay, representStart, representEnd }: DDayProps) => {
  return (
    <DdayTextBox>
      <DdayTextWrap>
        <DdayText>
          {'D - '}
          {dDay}
        </DdayText>
        <VerticlalLine></VerticlalLine>
        <div>{representStart}</div>~<div>{representEnd}</div>
      </DdayTextWrap>
    </DdayTextBox>
  );
};

const DdayTextBox = styled.div`
  border: 3px solid #fe802c;
  border-radius: 20px;
  margin: 10px 10px 0px 10px;
  width: 250px;
  padding: 7.5px;
  min-height: 20px;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DdayTextWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;

const DdayText = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const VerticlalLine = styled.div`
  border-left: 2px solid #fe802c;
  width: 1px;
  height: 33px;
`;

export default DdayBox;
