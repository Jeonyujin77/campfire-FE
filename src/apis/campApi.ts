import { createAsyncThunk } from '@reduxjs/toolkit';
import { PagenoCamps, SiteDesc, SiteList } from '../interfaces/camp';
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
