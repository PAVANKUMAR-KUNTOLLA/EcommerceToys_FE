import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSessionActive: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSessionState(state, action) {
      state.isSessionActive = action.payload;
    },
  },
});

export const { setSessionState } = appSlice.actions;

export default appSlice.reducer;
