import { createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";

const initialState = {
  products: [],
  favourites: [],
  cart: [],
  //  latest:[],
  searchQuery: "",
  isSearchOn: false,
  // productFilters: {
  //   category: null,
  //   character: null,
  //   price: null,
  // },
  isLoadingSpin: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      const products = action.payload;
      state.products = products;
      state.favourites = products.filter(
        (product, id) => product.is_favourite === true
      );
      state.cart = products.filter(
        (product, id) => product.is_item_in_cart === true
      );
    },
    setSearch(state, action) {
      state.isSearchOn = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    // setCategoryFilter(state, action) {
    //   state.productFilters.category = action.payload;
    // },
    // setCharacterFilter(state, action) {
    //   state.productFilters.character = action.payload;
    // },
    // setPriceFilter(state, action) {
    //   state.productFilters.price = action.payload;
    // },
    setLoadingSpin(state, action) {
      state.isLoadingSpin = action.payload;
    },
  },
});
export const {
  setProducts,
  setSearch,
  setSearchQuery,
  setLoadingSpin,
  // setCategoryFilter,
  // setCharacterFilter,
  // setPriceFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
