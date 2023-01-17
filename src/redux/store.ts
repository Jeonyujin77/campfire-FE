import { combineReducers, configureStore } from '@reduxjs/toolkit';
import campSlice from './modules/campSlice';
import reservationSlice from './modules/reservationSlice';
import userSlice from './modules/userSlice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  camp: campSlice.reducer,
  reservation: reservationSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production', // dev 환경에서만 redux devtool이 활성화
});

//useSelector 사용시 타입으로 사용하기 위함
export type RootState = ReturnType<typeof store.getState>;

//useDispatch를 좀 더 명확하게 사용하기 위함
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
