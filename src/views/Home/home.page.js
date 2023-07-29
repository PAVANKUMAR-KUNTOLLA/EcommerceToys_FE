import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import ProductCard from "../../components/card";
import CategoriesCard from "../../components/categoryCard";
import ProductSlider from "../../components/slider";
import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoadingSpin,
  setSearch,
} from "../../redux/products/produtsSlice";
import LoadingSpin from "../../components/LoadingSpin";
import MyFooter from "./Footer";
import AdverstiesmentImagesSlider from "./Advertisement";
import SearchResultsPage from "../../components/SearchResults";

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.breakpoints.values.sm,
    },
  },
  title: {
    textTransform: "uppercase",
    color: "#3e4152",
    fontSize: "28px",
    fontWeight: "700",
    marginTop: "34px",
    marginBottom: "10px",
    letterSpacing: "1.5px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      fontSize: "20px",
      letterSpacing: "0.5px",
    },
  },
}));

const HomePage = () => {
  const customStyles = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const favourites = useSelector((state) => state.products.favourites);
  const isLoadingSpin = useSelector((state) => state.products.isLoadingSpin);
  const isSearchOn = useSelector((state) => state.products.isSearchOn);

  const selectedCategories = new Set();
  const categoriesItems = products
    ? products.filter((item) => {
        if (
          !selectedCategories.has(item.category) &&
          item.category != "accessories"
        ) {
          selectedCategories.add(item.category);
          return true;
        }
        return false;
      })
    : [];

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
    handleFetchProducts();
    dispatch(setSearch(false));
  }, []);

  return (
    <Page title="home">
      {!isSearchOn && <AdverstiesmentImagesSlider />}
      {!isLoadingSpin && !isSearchOn ? (
        <Container maxWidth="md" className={customStyles.container}>
          {favourites.length > 0 && (
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12}>
                <Typography className={customStyles.title}>
                  Favourites
                </Typography>
              </Grid>
              <ProductSlider products={favourites} />
              {/* {favourites.map((product) => (
                <Grid item key={product.id} xs={6} md={3} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))} */}
            </Grid>
          )}
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Typography className={customStyles.title}>Categories</Typography>
            </Grid>
            <Grid container spacing={2} mt={2}>
              {categoriesItems.map((product) => (
                <Grid item key={product.id} xs={6} md={3} lg={3}>
                  <CategoriesCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            mt={3}
            sx={{ display: isSearchOn ? "none" : "flex" }}
          >
            <Grid item xs={12}>
              <Typography className={customStyles.title}>
                you may also like
              </Typography>
            </Grid>
            <ProductSlider products={products} />
          </Grid>
        </Container>
      ) : isLoadingSpin ? (
        <LoadingSpin isBackdrop={true} />
      ) : isSearchOn ? (
        <SearchResultsPage customStyles={customStyles} />
      ) : null}

      {!isLoadingSpin && <MyFooter />}
      <Box
        sx={{
          textAlign: "center",
          marginRight: "auto",
          marginLeft: "auto",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        Copyright 2023 © @kuntollapavankumar
      </Box>
    </Page>
  );
};

export default HomePage;
