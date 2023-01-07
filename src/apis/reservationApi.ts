import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReserveInfo } from '../interfaces/Reservations';
import api from './api';

// 캠핑장예약
export const __reserveCamps = createAsyncThunk(
  'reserveCamps',
  async (payload: ReserveInfo, thunkAPI) => {
    const { campId, checkInDate, checkOutDate, adults, children } = payload;
    try {
      const response = await api.post(`/api/camps/${campId}/books`, {
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
