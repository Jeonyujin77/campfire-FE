import { combineReducers, configureStore } from '@reduxjs/toolkit';
import campSlice from './modules/campSlice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  camp: campSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production', // dev 환경에서만 redux devtool이 활성화
});

//useSelector 사용시 타입으로 사용하기 위함
export type RootState = ReturnType<typeof rootReducer>;

//useDispatch를 좀 더 명확하게 사용하기 위함
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
