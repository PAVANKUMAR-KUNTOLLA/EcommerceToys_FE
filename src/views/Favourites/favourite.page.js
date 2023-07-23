import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import ProductCard from "../../components/card";
import { Typography } from "@mui/material";
import { Grid, Container } from "@mui/material";
import { useStyles } from "../Home/home.page";
import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import {
  setProducts,
  setSearch,
  setLoadingSpin,
} from "../../redux/products/produtsSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpin from "../../components/LoadingSpin";
import SearchResultsPage from "../../components/SearchResults";

const FavouritePage = () => {
  const customStyles = useStyles();
  const favourites = useSelector((state) => state.products.favourites);
  const dispatch = useDispatch();
  const isLoadingSpin = useSelector((state) => state.products.isLoadingSpin);
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
    dispatch(setSearch(false));
    if (favourites.length === 0) {
      handleFetchProducts();
    }
  }, []);

  return (
    <Page title="Favourites">
      {!isLoadingSpin && !isSearchOn ? (
        <Container maxWidth="md" className={customStyles.container}>
          <Typography variant="h1" alignItems="left" marginTop="50px">
            Wishlist
          </Typography>
          <hr bordertop="2px solid black" fontWeight="bold"></hr>
          <Grid container spacing={2} mt={2}>
            {favourites &&
              favourites.map((product, id) => {
                return (
                  <Grid item key={id} xs={6} md={4}>
                    <ProductCard key={id} product={product} />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      ) : isLoadingSpin ? (
        <LoadingSpin isBackdrop={true} />
      ) : isSearchOn && !isLoadingSpin ? (
        <SearchResultsPage />
      ) : null}
    </Page>
  );
};

export default FavouritePage;
