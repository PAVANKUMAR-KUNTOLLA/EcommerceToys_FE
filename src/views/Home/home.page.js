import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import Card from "../../components/card";
import NavbarHeader from '../../components/navbar';
import axios from 'axios';
import { Box, Container, Grid, Typography } from '@mui/material';

const HomePage = () => {
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);

  const handleFetchProducts = () => {
    const url = "http://127.0.0.1:8000/api/v1/home/";

    axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        const { status, data } = res;
        setFavouriteItems(data?.data["favourite_items"]);
        setLatestItems(data?.data["latest_products"]);
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
    <Page title="home">
      <NavbarHeader />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {latestItems.map((product) => (
            <Grid item key={product.id} xs={6} md={4}>
              <Card product={product} handleChange={handleChange} />
            </Grid>
          ))}
          {favouriteItems.map((product) => (
            <Grid item key={product.id} xs={6} md={4}>
              <Card product={product} handleChange={handleChange} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default HomePage;
