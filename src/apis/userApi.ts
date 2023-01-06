import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfo, UserLogin } from '../interfaces/Users';
import api from './api';

// 이메일 중복확인
export const __checkEmailDup = createAsyncThunk(
  'checkEmailDup',
  async (payload: string, thunkAPI) => {
    try {
      const email = payload;
      const response = await api.get(
        `/api/users/signup/findDup?email=${email}`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 닉네임 중복확인
export const __checkNickDup = createAsyncThunk(
  'checkNickDup',
  async (payload: string, thunkAPI) => {
    try {
      const username = payload;
      const response = await api.get(
        `/api/users/signup/findDup?userName=${username}`,
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 회원가입
export const __signup = createAsyncThunk(
  'signup',
  async (payload: UserInfo, thunkAPI) => {
    try {
      const { email, userName, password, phoneNumber } = payload;

      const response = await api.post('/api/users/signup', {
        email,
        userName,
        password,
        phoneNumber,
        profileImg: null,
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 로그인
export const __signin = createAsyncThunk(
  'signin',
  async (payload: UserLogin, thunkAPI) => {
    try {
      const { email, password } = payload;

      const response = await api.post('/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { accesstoken, refreshtoken } = response.headers;
        const { userId } = response.data;

        if (accesstoken && refreshtoken && userId) {
          localStorage.setItem('accessToken', accesstoken);
          localStorage.setItem('refreshToken', refreshtoken);
          localStorage.setItem('userId', userId);
        }

        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
