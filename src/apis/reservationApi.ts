import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReserveInfo } from '../interfaces/Reservations';
import {
  CanceledReservationList,
  CompletedReservationList,
  ReservationList,
} from '../interfaces/Users';
import api from './api';

// 캠핑장예약
export const __reserveCamps = createAsyncThunk(
  'reserveCamps',
  async (payload: ReserveInfo, thunkAPI) => {
    const { campId, siteId, checkInDate, checkOutDate, adults, children } =
      payload;
    try {
      const response = await api.post(`/api/books/${campId}/${siteId}`, {
        checkInDate,
        checkOutDate,
        adults,
        children,
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 특정유저 예약 캠핑장사이트 내역
export const __reserveUser = createAsyncThunk(
  'reserveUser',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get<ReservationList>(
        `/api/books/users/checkbooks`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 특정유저 특정 예약 취소
export const __cancelReservation = createAsyncThunk(
  'cancelReservation',
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.put<any>(`/api/books/users/${payload}`);
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 특정유저 이용완료 캠핑장사이트 내역
export const __reserveCompleted = createAsyncThunk(
  'reserveCompleted',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get<CompletedReservationList>(
        `/api/books/users/expiredbooks`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 특정유저 취소 캠핑장사이트 내역
export const __reserveCanceled = createAsyncThunk(
  'reserveCanceled',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get<CanceledReservationList>(
        `/api/books/users/cancelbooks`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
