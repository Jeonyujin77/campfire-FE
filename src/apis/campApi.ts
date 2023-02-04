import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  PagenoCamps,
  SearchCampsByKeyword,
  SiteDesc,
  SiteList,
} from '../interfaces/camp';
import {
  Comment,
  GetComments,
  ModifyOrDeleteComment,
} from '../interfaces/Comment';
import api from './api';

// 메인 데이터 가져오기
export const __getCampsByPageno = createAsyncThunk(
  'getCampsByPageno',
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.get<PagenoCamps>(
        `api/camps/page?pageno=${payload}`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 프리미엄 캠핑장 가져오기
export const __getPremiumCamps = createAsyncThunk(
  'getPremiumCamps',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get<any>(`api/events/premium`);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 디테일페이지 타겟데이터 가져오기
export const __getCampsByParams = createAsyncThunk(
  'getCampsByParams',
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.get<PagenoCamps>(`api/camps/${payload}`);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 디테일페이지 캠핑사이트 리스트 가져오기
export const __getCampSitesByParams = createAsyncThunk(
  'getCampSitesByParams',
  async (payload: any, thunkAPI) => {
    const { params, adult, child, start, end }: any = payload;
    const paramsquery = `campid=${params}`;
    const adultquery = `adults=${adult}`;
    const childquery = `children=${child}`;
    const checkindatequery = `checkindate=${start}`;
    const checkoutdatequery = `checkoutdate=${end}`;
    try {
      const response = await api.get<SiteList>(
        `api/search/sites/?${paramsquery}&${adultquery}&${childquery}&${checkindatequery}&${checkoutdatequery}`,
      );
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 예약상세페이지 타겟사이트 데이터 가져오기
export const __getSiteByParams = createAsyncThunk(
  'getSiteByParams',
  async (payload: {}, thunkAPI) => {
    try {
      const { campparams, siteparams }: any = payload;
      const response = await api.get<SiteDesc>(
        `api/camps/${campparams}/sites/${siteparams}`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 특정캠핑장 찜하기 버튼
export const __likeCampByParams = createAsyncThunk(
  'likeCampByParams',
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.put(`api/likes/${payload}`);
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 캠핑장 리뷰 등록
export const __writeCampReview = createAsyncThunk(
  'writeCampReview',
  async (payload: Comment, thunkAPI) => {
    const { campId, content } = payload;
    try {
      const response = await api.post(`api/camps/${campId}/reviews`, {
        content,
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 캠핑장 리뷰 수정
export const __modifyCampReview = createAsyncThunk(
  'modifyCampReview',
  async (payload: ModifyOrDeleteComment, thunkAPI) => {
    const { campId, reviewId, content } = payload;
    try {
      const response = await api.put(
        `api/camps/${campId}/reviews/${reviewId}`,
        {
          content,
        },
      );
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 캠핑장 리뷰 삭제
export const __deleteCampReview = createAsyncThunk(
  'deleteCampReview',
  async (payload: ModifyOrDeleteComment, thunkAPI) => {
    const { campId, reviewId } = payload;
    try {
      const response = await api.delete(
        `api/camps/${campId}/reviews/${reviewId}`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 캠핑장 리뷰 조회-페이지네이션
export const __getCampReviews = createAsyncThunk(
  'getCampReviews',
  async (payload: GetComments, thunkAPI) => {
    const { campId, pageno } = payload;
    try {
      const response = await api.get(
        `api/camps/${campId}/reviews/page?pageno=${pageno}`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 캠핑장 통합 검색
export const __searchCampsByKeyword = createAsyncThunk(
  'searchCampsByKeyword',
  async (payload: SearchCampsByKeyword, thunkAPI) => {
    const { search, types, themes, amenities, envs, location } = payload;
    // console.log('----------------------------------');
    // console.log('검색어', search);
    // console.log('숙소유형', types.toString());
    // console.log('테마', themes.toString());
    // console.log('주요시설', amenities.toString());
    // console.log('환경', envs.toString());
    // console.log('지역', location);

    // 검색어
    const searchQuery = search !== '' ? `search=${search}` : 'search';
    // 숙소유형
    const typesQuery =
      types.toString() !== '' ? `types=${types.toString()}` : 'types';
    // 테마
    const themesQuery =
      themes.toString() !== '' ? `themes=${themes.toString()}` : 'themes';
    // 부대시설
    const amenitiesQuery =
      amenities.toString() !== ''
        ? `amenities=${amenities.toString()}`
        : 'amenities';
    // 자연환경
    const envsQuery =
      envs.toString() !== '' ? `envs=${envs.toString()}` : 'envs';
    // 검색어
    const locationQuery = location !== '' ? `location=${location}` : 'location';

    try {
      const response = await api.get(
        `api/search/camps?${searchQuery}&${typesQuery}&${themesQuery}&${amenitiesQuery}&${envsQuery}&${locationQuery}`,
      );

      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 찜하기 순위 캠핑장조회
export const __getLikeRank = createAsyncThunk(
  'getLikeRank',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`api/events/likes`);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 리뷰 순위 캠핑장조회
export const __getReviewRank = createAsyncThunk(
  'getReviewRank',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`api/events/reviews`);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
