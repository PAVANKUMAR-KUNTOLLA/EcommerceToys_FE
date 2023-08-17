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
import { setSessionState } from "../redux/app/appSlice";
import Api from "../components/Api";
import { privateApiGET } from "../components/PrivateRoute";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: "24px",
    paddingBottom: "24px",
    positon: "absolute",
    bottom: 0,
  },
}));

const AppLayout = () => {
  const customStyles = useStyles();
  const { initialAppLoading } = useSelector((state) => state.app);
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

  useEffect(() => {
    dispatch(setSessionState(true));
  });

  return (
    <>
      {!initialAppLoading && (
        <div>
          <div>
            <ResponsiveAppBar />
          </div>
          <div>{!isSearchOn ? <Outlet /> : <SearchResultsPage />}</div>
          {/* <div className={customStyles.footer}>
            Copyright 2023 © @kuntollapavankumar
          </div> */}
        </div>
      )}
    </>
  );
};

export default AppLayout;
