import styled from '@emotion/styled';
import spinner from '../../asset/spinner.gif';

const Loading = () => {
  return (
    <Wrap>
      <img src={spinner} alt="로딩중" />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 200px auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 30px;
    padding: 0px;
  }
`;

export default Loading;
