import { createAsyncThunk } from '@reduxjs/toolkit';
import { PagenoCamps, SiteDesc, SiteList } from '../interfaces/camp';
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
    const response = await api.get<PagenoCamps>(
      `api/camps/page?pageno=${payload}`,
    );
    if (response.status === 200) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  },
);

// 디테일페이지 타겟데이터 가져오기
export const __getCampsByParams = createAsyncThunk(
  'getCampsByParams',
  async (payload: number, thunkAPI) => {
    const response = await api.get<PagenoCamps>(`api/camps/${payload}`);
    if (response.status === 200) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  },
);

// 디테일페이지 캠핑사이트 리스트 가져오기
export const __getCampSitesByParams = createAsyncThunk(
  'getCampSitesByParams',
  async (payload: number, thunkAPI) => {
    const response = await api.get<SiteList>(`api/camps/${payload}/sites`);
    if (response.status === 200) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(response.data);
      // if (response.status === 400) {}
      // if (response.status === 404) {}
    }
  },
);

// 예약상세페이지 타겟사이트 데이터 가져오기
export const __getSiteByParams = createAsyncThunk(
  'getSiteByParams',
  async (payload: {}, thunkAPI) => {
    const { campparams, siteparams }: any = payload;
    const response = await api.get<SiteDesc>(
      `api/camps/${campparams}/sites/${siteparams}`,
    );
    if (response.status === 200) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  },
);

// 특정캠핑장 찜하기 버튼
export const __likeCampByParams = createAsyncThunk(
  'likeCampByParams',
  async (payload: number, thunkAPI) => {
    const { campparams }: any = payload;
    const response = await api.put(`api/likes/${campparams}`);
    if (response.status === 201) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(response.data);
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
