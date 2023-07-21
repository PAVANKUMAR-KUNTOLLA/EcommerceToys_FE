import { createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";

const initialState = {products:[], favourites:[], latest:[], cart:[]};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action){
      const {products, favourites, latest, cart} = action.payload;
      state.products= products;
      state.favourites = favourites,
      state.latest = latest;
      state.cart=cart;
    }
  },
});
export const {setProducts} = productsSlice.actions;

export default productsSlice.reducer;