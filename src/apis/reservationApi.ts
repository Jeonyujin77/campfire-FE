import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// 예시
// export const __getPosts = createAsyncThunk(
//   "getPosts",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await api.get(`/api/posts`);
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       const { status, data } = error.response;
//       if (status === 404) {
//         alert(data.errorMessage);
//       }
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
