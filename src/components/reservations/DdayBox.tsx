//라이브러리
import styled from '@emotion/styled';

interface DDayProps {
  dDay: string;
}

const DdayBox = ({ dDay }: DDayProps) => {
  return (
    <DdayTextBox>
      <DdayTextWrap>
        캠핑까지 D - <DdayText>{dDay}</DdayText>
      </DdayTextWrap>
    </DdayTextBox>
  );
};

const DdayTextBox = styled.div`
  border: 1px solid black;
  margin: 0px 20px 5px 20px;
  width: 1120px;
  padding: 20px;
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
  font-size: 20px;
  font-weight: bold;
  background-color: #e8e8e8;
  border-radius: 15px;
  width: 200px;
  height: 35px;
`;

const DdayText = styled.div`
  color: #ee8e4d;
`;

export default DdayBox;
