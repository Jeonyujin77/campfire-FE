import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

interface CampsData {
  pageno: number;
}

export interface PagenoCamps {
  camps: [
    {
      campId: number;
      hostId: number;
      campName: string;
      campAddress: string;
      campPrice: number;
      campMainImage: string;
      campSubImages: [string];
      campDesc: string;
      campAmenities: [string];
      checkIn: string;
      checkOut: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ];
}

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
