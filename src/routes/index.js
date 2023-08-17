import React, { lazy } from "react";
import { Outlet, Routes, Navigate, Route, Router } from "react-router-dom";
import Loadable from "../components/Loadable";
import PrivateRoute from "../components/PrivateRoute";
import AppLayout from "./../Layout/appLayout";

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
  lazy(() => import("../views/Checkout/checkout.page"))
);

const ProfilePage = Loadable(
  lazy(() => import("../views/Profile/profile.page"))
);

const LoginViewPage = Loadable(lazy(() => import("../views/Auth/LoginView")));
const RegisterView = Loadable(lazy(() => import("../views/Auth/RegisterView")));
const ResetPasswordView = Loadable(
  lazy(() => import("../views/Auth/ResetPasswordView"))
);

//-----------------------|| ROUTING RENDER ||-----------------------//
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={config.defaultPath} />} />
      <Route path="app" element={<AppLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route
          path="products/categories/:category"
          element={<ProductsPage />}
        />
        <Route path="products/:id/:title" element={<ProductViewPage />} />
        <Route path="favourites" element={<FavouritePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route
        path="app"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="checkout" element={<CheckOutPage />} />
      </Route>
      <Route path="/login" element={<LoginViewPage />} />
      <Route path="/register" element={<RegisterView />} />
      <Route
        path="/reset-password/:uidb64/:token"
        element={<ResetPasswordView />}
      />
    </Routes>
  );
};

export default AppRoutes;
