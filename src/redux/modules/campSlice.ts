import { createSlice } from '@reduxjs/toolkit';
import { CampType } from '../../interfaces/camp';

interface CampList {
  camps: CampType[];
  searchedCamps: CampType[];
}

const initialState: CampList = {
  camps: [],
  searchedCamps: [],
};

export const campSlice = createSlice({
  name: 'camp',
  initialState,
  reducers: {
    addCampList: (state, action) => {
      state.camps = [...state.camps, ...action.payload];
    },
    removeCampList: (state, action) => {
      state.camps = action.payload;
    },
    addSearchedCampList: (state, action) => {
      state.searchedCamps = [...action.payload];
    },
    updateCampList: (state, action) => {
      const { campId, likes } = action.payload;

      state.camps = state.camps.map(camp =>
        Number(camp.campId) === Number(campId)
          ? { ...camp, likes: likes }
          : camp,
      );
    },
    updateSearchedCampList: (state, action) => {
      const { campId, likes } = action.payload;

      state.searchedCamps = state.searchedCamps.map(camp =>
        Number(camp.campId) === Number(campId)
          ? { ...camp, likes: likes }
          : camp,
      );
    },
  },
  extraReducers: builder => {},
});

export const {
  addCampList,
  removeCampList,
  addSearchedCampList,
  updateCampList,
  updateSearchedCampList,
} = campSlice.actions;
export default campSlice;
