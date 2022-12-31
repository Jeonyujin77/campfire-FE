import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservation: null,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = reservationSlice.actions;
export default reservationSlice;
