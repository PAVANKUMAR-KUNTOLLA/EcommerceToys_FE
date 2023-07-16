import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import NavbarHeader from "../../components/navbar";
import axios from "axios";
import Card from "../../components/card";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

const FavouritePage = () => {
  const [favouriteItems, setFavouriteItems] = useState([]);

  const handleFetchProducts = () => {
    const url = "/api/v1/products/";

    axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        
      },
    })
      .then((res) => {
        const { status, data } = res;
        let favourite_items = data?.data.filter(
          (product) => product.is_favourite === true
        );
        setFavouriteItems(favourite_items);
        console.log("data", data);
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
      <Typography variant="h1">Wishlist</Typography>
      <Grid
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {favouriteItems.map((product, id) => (
          <Card
            key={id}
            product={product}
            handleChange={handleChange}
            style={{ maxWidth: "100%", marginRight: "10px" }}
          />
        ))}
      </Grid>
    </Page>
  );
};

export default FavouritePage;
