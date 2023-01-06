import styled from 'styled-components';

interface RoomCountProps {
  roomCount: number;
  setRoomCount: React.Dispatch<React.SetStateAction<number>>;
}

const RoomCount = ({ roomCount, setRoomCount }: RoomCountProps) => {
  return (
    <RoomCountWrap>
      <RCText>객실수</RCText>
      <RCBtn
        onClick={() => {
          if (roomCount === 1) return;
          setRoomCount(roomCount - 1);
        }}
      >
        -
      </RCBtn>
      <RCount>{roomCount}</RCount>
      <RCBtn
        onClick={() => {
          //최대객실수에 도달하면 +1 안되도록 설정필요함
          alert('최대객실수에 도달하면 +1 안되도록 설정필요함');
          setRoomCount(roomCount + 1);
        }}
      >
        +
      </RCBtn>
    </RoomCountWrap>
  );
};

const RoomCountWrap = styled.div`
  border: 1px solid blue;
  margin: 15px 20px 20px 20px;
  width: 580px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RCText = styled.div`
  border: 1px solid red;
  width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RCBtn = styled.div`
  border: 1px solid green;
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
`;

const RCount = styled.div`
  border: 1px solid red;
  width: 320px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default RoomCount;
