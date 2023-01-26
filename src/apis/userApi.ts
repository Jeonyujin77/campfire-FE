import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DeleteUser,
  LikesCamp,
  PutUserInfo,
  UserInfo,
  UserLogin,
} from '../interfaces/Users';
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
      localStorage.clear();

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

// 수정페이지 정보가져오기
export const __getUser = createAsyncThunk(
  'getUser',
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.get(`/api/users/${payload}`);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 수정페이지 정보수정하기
export const __putUser = createAsyncThunk(
  'putUser',
  async (payload: PutUserInfo, thunkAPI) => {
    const { userId, formData } = payload;
    try {
      const response = await api.put(`/api/users/${userId}`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      console.log(response);
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 회원탈퇴하기
export const __withdrawalUser = createAsyncThunk(
  'withdrawalUser',
  async (payload: DeleteUser, thunkAPI) => {
    const { userId, password } = payload;
    console.log(password);
    try {
      const response = await api.delete(`/api/users/${userId}`, {
        data: { password },
      });
      console.log(response);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//카카오로그인
export const __kakaoLogin = createAsyncThunk(
  'kakaoLogin',
  async (payload: any, thunkAPI) => {
    console.log(payload);
    try {
      const response = await api.get<any>(`/api/auths/kakao?code=${payload}`);
      console.log(response);
      if (response.status === 200) {
        const { accesstoken, refreshtoken }: any = response.headers;
        localStorage.setItem('accessToken', accesstoken);
        localStorage.setItem('refreshToken', refreshtoken);
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//네이버로그인
export const __naverLogin = createAsyncThunk(
  'naverLogin',
  async (payload: any, thunkAPI) => {
    console.log(payload);
    try {
      const response = await api.get<any>(
        `/api/auths/naver?code=${payload.code}&state=${payload.state}`,
      );
      console.log(response);
      if (response.status === 200) {
        const { accesstoken, refreshtoken }: any = response.headers;
        localStorage.setItem('accessToken', accesstoken);
        localStorage.setItem('refreshToken', refreshtoken);
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//구글로그인
export const __googleLogin = createAsyncThunk(
  'googleLogin',
  async (payload: any, thunkAPI) => {
    console.log(payload);
    try {
      const response = await api.get<any>(`/api/auths/google?code=${payload}`);
      console.log(response);
      if (response.status === 200) {
        const { accesstoken, refreshtoken }: any = response.headers;
        localStorage.setItem('accessToken', accesstoken);
        localStorage.setItem('refreshToken', refreshtoken);
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//찜한 캠핑장 불러오기
export const __likeCamps = createAsyncThunk(
  'likeCamps',
  async (payload, thunkAPI) => {
    try {
      const response = await api.get<LikesCamp>(`/api/likes`);

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
