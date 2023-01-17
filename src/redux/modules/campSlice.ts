import { createSlice } from '@reduxjs/toolkit';
import { CampType } from '../../interfaces/camp';

interface CampList {
  camps: CampType[];
}

const initialState: CampList = {
  camps: [],
};

export const campSlice = createSlice({
  name: 'camp',
  initialState,
  reducers: {
    addCampList: (state, action) => {
      state.camps = [...state.camps, ...action.payload];
    },
    updateCampList: (state, action) => {
      const { campId, likes } = action.payload;

      state.camps = state.camps.map(camp =>
        Number(camp.campId) === Number(campId)
          ? { ...camp, likes: likes }
          : camp,
      );
    },
  },
  extraReducers: builder => {},
});

export const { addCampList, updateCampList } = campSlice.actions;
export default campSlice;
