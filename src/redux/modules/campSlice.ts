import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  camp: null,
};

export const campSlice = createSlice({
  name: "camp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = campSlice.actions;
export default campSlice;
