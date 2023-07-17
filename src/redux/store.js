import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./app/appSlice";
import productsReducer from "./products/produtsSlice"
//-----------------------|| REDUX - MAIN STORE ||-----------------------//


export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});