//라이브러리
import styled from '@emotion/styled';
//이미지
import CAMPFIRElogo from '../../asset/CAMPFIRElogo.png';

const Logo = () => {
  return <Image src={CAMPFIRElogo} alt="캠프파이어 로고사진" />;
};

const Image = styled.img`
  width: 286px;
  height: 43px;
  cursor: pointer;

  @media (max-width: 1200px) {
    width: 150px;
    height: 20px;
  }
`;

export default Logo;
