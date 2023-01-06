import styled from '@emotion/styled';
import CAMPFIRElogo from '../../asset/CAMPFIRElogo.png';

const Logo = () => {
  return <Image src={CAMPFIRElogo} alt="캠프파이어 로고사진" />;
};

const Image = styled.img`
  width: 378px;
  height: 79px;
  cursor: pointer;
`;

export default Logo;
