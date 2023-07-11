import React from "react";
import {Routes, Navigate, Route, Router } from "react-router-dom";


import App from "../views/Home/home.page";
import Products from "../components/products";
import ProductItemView from "../components/productView";
import HomePage from "../components/home";
import WishListPage from "../components/wishlist";
import CartPage from './../components/cartPage';

//-----------------------|| ROUTING RENDER ||-----------------------//
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/productview" element={<ProductItemView/>}/>
      <Route path="/wishlist" element={<WishListPage/>}/>
      <Route path="/cart" element={<CartPage />}/>
      <Route path="/home" element={<Navigate replace to={"app/home"} />} />
      <Route path="app/home" element={<App />} />
    </Routes>
  );
};

export default AppRoutes;
