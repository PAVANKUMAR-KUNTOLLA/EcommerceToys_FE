import { createSlice } from "@reduxjs/toolkit";

const initialState = {name:"pavan",value:20};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeName(state, action){
      state.name=action.payload;
    }
  },
});

export const { changeName
} = appSlice.actions;

export default appSlice.reducer;

