import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
// import NavbarHeader from "../../components/navbar";
import axios from "axios";
import ProductCard from "../../components/card";
import { Typography } from "@mui/material";
import { Grid, Container } from "@mui/material";
import { useStyles } from "../Home/home.page";
import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";

import { useDispatch, useSelector } from "react-redux";

const FavouritePage = () => {
  const customStyles = useStyles();
  const favourites = useSelector((state) => state.products.favourites);

  const handleChange = () => {
    handleFetchProducts();
  };

  return (
    <Page title="Favourites">
      {/* <NavbarHeader /> */}
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
                  <ProductCard
                    key={id}
                    product={product}
                    handleChange={handleChange}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Page>
  );
};

export default FavouritePage;
