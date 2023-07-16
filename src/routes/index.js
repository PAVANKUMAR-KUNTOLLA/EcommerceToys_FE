import React, { lazy } from "react";
import { Routes, Navigate, Route, Router } from "react-router-dom";
import Loadable from "../components/Loadable";

import config from "../config";


const HomePage = Loadable(lazy(() => import("../views/Home/home.page")));

const ProductsPage = Loadable(
  lazy(() => import("../views/Products/products.page"))
);

const ProductViewPage = Loadable(
  lazy(() => import("../views/Products/ProductView"))
);

const FavouritePage = Loadable(
  lazy(() => import("../views/Favourites/favourite.page"))
);

const CartPage = Loadable(lazy(() => import("../views/Cart/cart.page")));

const CheckOutPage = Loadable(
  lazy(() => import("../../src/components/checkOutPage"))
);

const SignUpPage = Loadable(
  lazy(() => import("../views/Login/signup.page"))
);

const SignInPage = Loadable(
  lazy(() => import("../views/Login/signin.page"))
);


//-----------------------|| ROUTING RENDER ||-----------------------//
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={config.defaultPath} />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:title" element={<ProductViewPage />} />
      <Route path="/favourites" element={<FavouritePage />} />
      <Route path="/checkout" element={<CheckOutPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  );
};

export default AppRoutes;
