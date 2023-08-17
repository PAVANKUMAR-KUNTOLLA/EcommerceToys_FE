import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import ProductCard from "../../components/card";
import { Typography } from "@mui/material";
import { Box, Grid, Container, Alert, Link } from "@mui/material";
import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import {
  setProducts,
  setSearch,
  setLoadingSpin,
} from "../../redux/products/produtsSlice";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import ProductSlider from "../../components/slider";
import { useNavigate } from "react-router-dom";

export const customFavouriteStyles = makeStyles((theme) => ({
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
      marginTop: "20px",
    },
  },
}));

const FavouritePage = () => {
  const customStyles = customFavouriteStyles();
  const products = useSelector((state) => state.products.products);
  const favourites = useSelector((state) => state.products.favourites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFetchProducts = () => {
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
      });
  };

  return (
    <Page title="Favourites">
      {products.length > 0 ? (
        <Container maxWidth="md" className={customStyles.container}>
          {favourites.length > 0 ? (
            <Box>
              <Typography className={customStyles.title}>Favourites</Typography>
              <hr bordertop="2px solid black" fontWeight="bold"></hr>
              <Grid container spacing={2} mt={2}>
                {favourites.map((product, id) => {
                  return (
                    <Grid item key={id} xs={6} md={4}>
                      <ProductCard key={id} product={product} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ) : (
            <Container maxWidth="sm" className={customStyles.container}>
              <Alert severity="info" sx={{ marginTop: { xs: "3%", sm: "5%" } }}>
                Your Favourites is Empty{" "}
                <Link onClick={() => navigate("/app/products")}>
                  View Products
                </Link>
              </Alert>
            </Container>
          )}
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
      ) : null}
    </Page>
  );
};

export default FavouritePage;
