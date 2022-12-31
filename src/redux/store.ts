import { combineReducers, configureStore } from "@reduxjs/toolkit";
import campSlice from "./modules/campSlice";
import reservationSlice from "./modules/reservationSlice";
import userSlice from "./modules/userSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  camp: campSlice.reducer,
  reservation: reservationSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production", // dev 환경에서만 redux devtool이 활성화
});
