//라이브러리
import styled from '@emotion/styled';
import searchIcon from '../asset/searchIcon.png';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import ReactGa from 'react-ga';
//api
import { __searchCampsByKeyword } from '../apis/campApi';
import { addSearchedCampList } from '../redux/modules/campSlice';
import { onChecked } from '../utils/CampsUtil';
//컴포넌트
import SearchedCampList from '../components/camps/SearchedCampList';
import CheckAuth from '../components/common/CheckAuth';
import TabPanel from '../components/common/TabPanel';
//리스트
import {
  AMENITIES_LIST,
  ENV_LIST,
  THEME_LIST,
  TYPE_LIST,
} from '../constant/camps';

const Search = () => {
  const dispatch = useAppDispatch();
  const campList = useSelector((state: RootState) => state.camp.searchedCamps);
  //페이지 이동 시 스크롤바 상단으로 이동
  const { pathname } = useLocation();
  const [value, setValue] = useState(0);
  //검색키워드 State
  const [searchKey, setSearchKey] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]); // 부대시설
  const [envs, setEnvs] = useState<string[]>([]); // 자연환경
  const [themes, setThemes] = useState<string[]>([]); // 테마
  const [types, setTypes] = useState<string[]>([]); // 테마

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setSearchKey('');
    setAmenities([]);
    setEnvs([]);
    setThemes([]);
    setTypes([]);

    searchCampsByKeyword('', [], [], [], []);
  }, []);

  // 부대시설 체크박스
  const onAmenitiesChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(e, amenities, setAmenities);
  };

  // 자연환경 체크박스
  const onEnvsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(e, envs, setEnvs);
  };

  // 테마 체크박스
  const onThemesChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(e, themes, setThemes);
  };

  // 숙소유형 체크박스
  const onTypesChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(e, types, setTypes);
  };

  // 탭 변경 이벤트
  const handleChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      setValue(newValue);
    },
    [],
  );

  // 탭별 아이디 생성
  const a11yProps = useCallback((index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }, []);

  // 키워드 검색
  const searchCampsByKeyword = (
    searchKey: string,
    types: string[],
    themes: string[],
    amenities: string[],
    envs: string[],
  ) => {
    ReactGa.event({
      category: '검색 페이지',
      action: '검색 버튼으로 검색',
    });
    dispatch(
      __searchCampsByKeyword({
        search: searchKey,
        types,
        themes,
        amenities,
        envs,
      }),
    ).then(res => {
      const { type, payload } = res;
      // 조회 성공
      if (type === 'searchCampsByKeyword/fulfilled') {
        dispatch(addSearchedCampList(payload.getCampLists));
      }
      // 에러처리
      else if (type === 'searchCampsByKeyword/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  //input값 onChange함수
  const searchKeyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  //검색함수
  const searchHandler = (
    searchKey: string,
    types: string[],
    themes: string[],
    amenities: string[],
    envs: string[],
  ) => {
    ReactGa.event({
      category: '검색 페이지',
      action: '돋보기 버튼 클릭으로 검색',
    });
    searchCampsByKeyword(searchKey, types, themes, amenities, envs);
  };

  //엔터키 인식
  const keyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      ReactGa.event({
        category: '검색 페이지',
        action: '키보드 엔터로 검색',
      });
      searchHandler(searchKey, types, themes, amenities, envs);
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
              searchHandler(searchKey, types, themes, amenities, envs);
            }}
            src={searchIcon}
            alt="돋보기아이콘"
          />
        </SearchWrap>
        <SearchCatTab>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="캠핑장검색"
              >
                <Tab label="숙소유형" {...a11yProps(0)} />
                <Tab label="테마" {...a11yProps(1)} />
                <Tab label="주요시설" {...a11yProps(2)} />
                <Tab label="자연환경" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {TYPE_LIST.map(item => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    value={item.data}
                    onChange={onTypesChecked}
                    checked={
                      types !== null && types.includes(item.data) ? true : false
                    }
                  />
                  {item.data}
                </label>
              ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {THEME_LIST.map(item => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    value={item.data}
                    onChange={onThemesChecked}
                    checked={
                      themes !== null && themes.includes(item.data)
                        ? true
                        : false
                    }
                  />
                  {item.data}
                </label>
              ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {AMENITIES_LIST.map(item => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    value={item.data}
                    onChange={onAmenitiesChecked}
                    checked={
                      amenities !== null && amenities.includes(item.data)
                        ? true
                        : false
                    }
                  />
                  {item.data}
                </label>
              ))}
            </TabPanel>
            <TabPanel value={value} index={3}>
              {ENV_LIST.map(item => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    value={item.data}
                    onChange={onEnvsChecked}
                    checked={
                      envs !== null && envs.includes(item.data) ? true : false
                    }
                  />
                  {item.data}
                </label>
              ))}
            </TabPanel>
          </Box>
          <SearchButton
            onClick={() =>
              searchHandler(searchKey, types, themes, amenities, envs)
            }
          >
            검색
          </SearchButton>
        </SearchCatTab>
        <SearchedCampList campList={campList} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin: 0px auto;
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

const SearchCatTab = styled.div`
  button.Mui-selected {
    color: #ff7a50;
  }
  span.MuiTabs-indicator {
    background-color: #ff7a50;
  }

  label {
    margin: 0 1%;
    line-height: 2.5;
  }
  margin: 20px 0;
`;

const SearchButton = styled.div`
  background-color: #ffece0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #e8d2c4;
  }

  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;
export default Search;
