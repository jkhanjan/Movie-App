import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const tvlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    loadtv: (state, action) => {
      state.info = action.payload;
    },
    removetv: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadtv, removetv } = tvlice.actions;

export default tvlice.reducer;
