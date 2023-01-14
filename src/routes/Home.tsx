import styled from '@emotion/styled';
import CampItemList from '../components/camps/campItemList';
import searchIcon from '../asset/searchIcon.png';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Liked from '../components/camps/Liked';

const Home = () => {
  //페이지 이동 시 스크롤바 상단으로 이동
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  //검색키워드 State
  const [searchKey, setSearchKey] = useState('');
  //input값 onChange함수
  const searchKeyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };
  //검색함수
  const searchHandler = (searchKey: string) => {
    if (searchKey === '') {
      alert('검색할 키워드를 입력해주세요!');
      return;
    }
    alert('키워드 입력 시 검색기능 작성');
    alert(searchKey);
  };
  //엔터키 인식
  const keyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      searchHandler(searchKey);
    }
  };

  const moveToTop = () => (document.documentElement.scrollTop = 0);

  return (
    <Wrap>
      <HomeTitle>쉽고 편한 캠핑장 예약 시스템 캠프파이어</HomeTitle>
      <SearchWrap>
        <Input
          placeholder="검색어를 입력하세요"
          onChange={searchKeyChangeHandler}
          onKeyPress={keyPressHandler}
        />
        <SearchIcon
          onClick={() => {
            searchHandler(searchKey);
          }}
          src={searchIcon}
          alt="돋보기아이콘"
        />
      </SearchWrap>
      <CampItemList />
    </Wrap>
  );
};

const Wrap = styled.div`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 120px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  /* border: 1px solid red; */
`;

const HomeTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  color: rgb(254, 128, 44);
`;

const SearchWrap = styled.div`
  margin-top: 30px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 700px;
  height: 40px;
  border: none;
  border-bottom: 2px solid rgb(255, 92, 0);
  ::placeholder {
    text-align: center;
  }
  :focus {
    outline: 2px solid rgb(255, 92, 0);
    border-bottom: none;
  }
`;

const SearchIcon = styled.img``;

export default Home;
