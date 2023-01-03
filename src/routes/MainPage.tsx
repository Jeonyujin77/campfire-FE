import styled from 'styled-components';
import CampItemList from '../components/camps/campItemList';

const MainPage = () => {
  return (
    <Wrap>
      <SearchWrap>
        <input />
        <button>검색</button>
      </SearchWrap>
      <CampItemList />
    </Wrap>
  );
};

const Wrap = styled.div`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 100px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  border: 1px solid red;
`;

const SearchWrap = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainPage;
