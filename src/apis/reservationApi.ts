import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReserveInfo } from '../interfaces/Reservations';
import { Reservation, ReservationList } from '../interfaces/Users';
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

// 특정유저 예약 특정사이트 정보
export const __reserveUserTarget = createAsyncThunk(
  'reserveUserTarget',
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.get<Reservation>(
        `/api/books/users/checkbooks/${payload}`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
