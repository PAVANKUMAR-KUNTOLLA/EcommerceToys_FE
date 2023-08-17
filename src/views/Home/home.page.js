import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import CategoriesCard from "../../components/categoryCard";
import ProductSlider from "../../components/slider";
import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoadingSpin } from "../../redux/products/produtsSlice";
import MyFooter from "./Footer";
import AdverstiesmentImagesSlider from "./Advertisement";

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

  return (
    <Page title="home">
      <AdverstiesmentImagesSlider />
      {products.length > 0 && (
        <Container maxWidth="md" className={customStyles.container}>
          {favourites.length > 0 && (
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12}>
                <Typography className={customStyles.title}>
                  Favourites
                </Typography>
              </Grid>
              <ProductSlider products={favourites} />
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
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12}>
              <Typography className={customStyles.title}>
                You May Like
              </Typography>
              <ProductSlider
                products={products.filter(
                  (product, id) => product.is_favourite === false
                )}
              />
            </Grid>
          </Grid>
        </Container>
      )}

      <MyFooter />
    </Page>
  );
};

export default HomePage;
