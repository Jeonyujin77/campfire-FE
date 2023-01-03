import styled from 'styled-components';
import temporalLogo from '../../asset/temporalLogo.png';

const Logo = () => {
  return <Image src={temporalLogo} alt="캠프파이어 로고사진" />;
};

const Image = styled.img`
  margin-bottom: 10px;
`;

export default Logo;
