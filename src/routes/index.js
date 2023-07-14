import React from "react";
import {Routes, Navigate, Route, Router } from "react-router-dom";

import Products from "../components/products";
import ProductItemView from "../components/productView";
import HomePage from "../views/Home/home.page";
import WishListPage from "../components/wishlist";
import CartPage from './../components/cartPage';
import CheckOutPage from "../components/checkOutPage";
import ProfilePage from "../components/newNavBar";
import config from "../config";


//-----------------------|| ROUTING RENDER ||-----------------------//
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={config.defaultPath} />} />
      <Route path="/" element={<HomePage />}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/productview" element={<ProductItemView/>}/>
      <Route path="/wishlist" element={<WishListPage/>}/>
      <Route path='/checkout' element={<CheckOutPage />}/>
      <Route path="/cart" element={<CartPage />}/>
      <Route path="/home" element={<HomePage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
    </Routes>
  );
};

export default AppRoutes;
