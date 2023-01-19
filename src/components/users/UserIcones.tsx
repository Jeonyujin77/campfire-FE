//라이브러리
import styled from '@emotion/styled';

interface Icons {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  navigate?: string;
  imgSrc: string;
  imgText: string;
}

//현재 미사용 컴포넌트 > 추후 사용여부 결정되면 삭제예정
const UserIcones = ({
  imgSrc,
  imgText,
  isOpen,
  setIsOpen,
  navigate,
}: Icons) => {
  return (
    <Icon>
      <img src="https://via.placeholder.com/80" alt="내예약 이미지" />
      <div>내 예약</div>
    </Icon>
  );
};

const Icon = styled.div`
  border: 1px solid blue;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default UserIcones;
