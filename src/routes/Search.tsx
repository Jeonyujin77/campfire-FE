import styled from '@emotion/styled';
import searchIcon from '../asset/searchIcon.png';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RootState, useAppDispatch } from '../redux/store';
import { __searchCampsByKeyword } from '../apis/campApi';
// import { CampType } from '../interfaces/camp';
import SearchedCampList from '../components/camps/SearchedCampList';
import CheckAuth from '../components/common/CheckAuth';
import { addCampList } from '../redux/modules/campSlice';
import { useSelector } from 'react-redux';

const Search = () => {
  const dispatch = useAppDispatch();
  const campList = useSelector((state: RootState) => state.camp.camps);
  //페이지 이동 시 스크롤바 상단으로 이동
  const { pathname } = useLocation();
  //검색키워드 State
  const [searchKey, setSearchKey] = useState('');
  // const [campList, setCampList] = useState<CampType[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const searchCampsByKeyword = (searchKey: string) => {
    dispatch(__searchCampsByKeyword(searchKey)).then(res => {
      const { type, payload } = res;

      // 조회 성공
      if (type === 'searchCampsByKeyword/fulfilled') {
        // setCampList(payload.getCampLists);
        dispatch(addCampList(payload.getCampLists));
      }
      // 에러처리
      else if (type === 'searchCampsByKeyword/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  useEffect(() => {
    searchCampsByKeyword('');
  }, []);

  //input값 onChange함수
  const searchKeyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  //검색함수
  const searchHandler = (searchKey: string) => {
    searchCampsByKeyword(searchKey);
  };

  //엔터키 인식
  const keyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      searchHandler(searchKey);
    }
  };

  return (
    <>
      <CheckAuth />
      <Wrap>
        <SearchWrap>
          <Input
            placeholder="검색어를 입력하세요"
            onChange={searchKeyChangeHandler}
            onKeyDown={keyPressHandler}
          />
          <SearchIcon
            onClick={() => {
              searchHandler(searchKey);
            }}
            src={searchIcon}
            alt="돋보기아이콘"
          />
        </SearchWrap>
        <SearchedCampList campList={campList} />
      </Wrap>
    </>
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
  @media (max-width: 1200px) {
    width: 100%;
  }
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
  @media (max-width: 1200px) {
    width: 80%;
    height: 25px;
  }
`;

const SearchIcon = styled.img`
  @media (max-width: 1200px) {
    width: 20px;
  }
`;

export default Search;
