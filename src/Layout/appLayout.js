import { AppBar } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ResponsiveAppBar from "../components/AppBar";
import MobileNavFooterPage from "./MobileNavFooter";
import { useDispatch, useSelector } from "react-redux";
import SearchResultsPage from "../components/SearchResults";
import {
  setProducts,
  setSearch,
  setLoadingSpin,
} from "../redux/products/produtsSlice";
import Api from "../components/Api";
import { privateApiGET } from "../components/PrivateRoute";

const AppLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector((state) => state.products.products);
  const isSearchOn = useSelector((state) => state.products.isSearchOn);

  const handleFetchProducts = () => {
    dispatch(setLoadingSpin(true));
    privateApiGET(Api.products)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
          dispatch(setLoadingSpin(false));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setLoadingSpin(false));
      });
  };

  useEffect(() => {
    if (
      !location.pathname.startsWith("/app/products") ||
      products.length === 0
    ) {
      if (products.length !== 157) {
        handleFetchProducts();
      }
    }
  }, [location.pathname]);

  return (
    <>
      <ResponsiveAppBar />
      {!isSearchOn ? <Outlet /> : <SearchResultsPage />}
      {/* <MobileNavFooterPage /> */}
    </>
  );
};

export default AppLayout;
