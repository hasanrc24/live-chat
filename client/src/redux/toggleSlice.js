import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: true,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleLeft: (state) => {
      state.toggle = true;
    },
    toggleRight: (state) => {
      state.toggle = false;
    },
  },
});

export const toggleSelector = (state) => state.toggleReducer;
export const { toggleLeft, toggleRight } = toggleSlice.actions;
export default toggleSlice.reducer;
