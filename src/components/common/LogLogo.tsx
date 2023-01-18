import styled from '@emotion/styled';
import loginLogo from '../../asset/loginLogo.png';

const LogLogo = () => {
  return <Image src={loginLogo} alt="캠프파이어 로고사진" />;
};

const Image = styled.img`
  width: 300px;
  height: 136px;
  cursor: pointer;
  margin: 50px;

  @media (max-width: 1200px) {
    width: 200px;
    height: 90px;
  }
`;

export default LogLogo;
