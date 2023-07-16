import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import NavbarHeader from "../../components/navbar";
import axios from "axios";
import Card from "../../components/card";
import { Typography } from "@mui/material";
import { Grid,Container } from "@mui/material";
import { useStyles } from "../Home/home.page";
import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";


const FavouritePage = () => {
  const customStyles = useStyles();
  const [favouriteItems, setFavouriteItems] = useState([]);

  const handleFetchProducts = () => {
    privateApiGET(Api.products)
      .then((res) => {
        const { status, data } = res;
        let favourite_items = data?.data.filter(
          (product) => product.is_favourite === true
        );
        setFavouriteItems(favourite_items);
        console.log("data", data);
        setFavouriteItems(favourite_items);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleChange = () => {
    handleFetchProducts();
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <Page title="Favourites">
      <NavbarHeader />
      <Container maxWidth="md" className={customStyles.container}>
        <Typography variant="h1" alignItems="left" marginTop="50px">Wishlist</Typography>
        <hr bordertop="2px solid black" fontWeight="bold"></hr>
        <Grid container spacing={2} mt={2}>
          {favouriteItems &&
            favouriteItems.map((product, id) => {
              return (
                <Grid item key={id} xs={6} md={4}>
                  <Card
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
