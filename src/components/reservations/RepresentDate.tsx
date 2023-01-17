import styled from '@emotion/styled';

interface DateProps {
  representStart: string;
  representEnd: string;
}

const RepresentDate = ({ representStart, representEnd }: DateProps) => {
  return (
    <RepresentDateBox>
      <RepresentText>
        {representStart} / {representEnd}
      </RepresentText>
    </RepresentDateBox>
  );
};

const RepresentDateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  height: 40px;
  border-radius: 15px;
`;

const RepresentText = styled.div`
  background-color: #e1e1e1;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;

export default RepresentDate;
