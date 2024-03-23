import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const movieslice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadmovie: (state, action) => {
      state.info = action.payload;
    },
    removemovie: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadmovie, removemovie } = movieslice.actions;

export default movieslice.reducer;
