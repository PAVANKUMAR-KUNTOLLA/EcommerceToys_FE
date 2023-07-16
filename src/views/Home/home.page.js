import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import Card from "../../components/card";
import NavbarHeader from "../../components/navbar";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.breakpoints.values.sm,
    },
  },
}));

const HomePage = () => {
  const customStyles = useStyles();

  const [products, setProducts] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const favouriteItems = products.filter(
    (product) => product.is_favourite === true
  );
  const latestItems = products.filter(
    (product) => product.is_item_in_cart === true
  );

  const handleFetchProducts = () => {
    const url = "/api/v1/products/";
    setIsSearchLoading(true);
    axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        
      },
    })
      .then((res) => {
        const { status, data } = res;
        setProducts(data?.data);
        console.log("data", data);
        setIsSearchLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setIsSearchLoading(true);
        setIsSearchLoading(false);
      });
  };

  const handleChange = () => {
    handleFetchProducts();
  };

  const handleSearchChange = (value) => {
    if (value) {
      let filtered_items = products.filter(
        (product) =>
          product.title.toLowerCase().startsWith(value.toLowerCase()) ===
            true || product.category.startsWith(value) === true
      );
      console.log(value, filtered_items);
      setSearchItems(filtered_items);
    } else {
      setSearchItems([]);
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <Page title="home">
      <ResponsiveAppBar handleChange={handleSearchChange} />
      <Container maxWidth="md" className={customStyles.container}>
        <Grid container spacing={2} mt={2}>
          {isSearchLoading && (
            <Box
              display="flex"
              height="100%"
              width="100%"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "absolute",
                backgroundColor: "background.paper",
                zIndex: "10",
                left: 0,
                top: 0,
              }}
            >
              <CircularProgress size={30} color="primary" />
            </Box>
          )}
          {searchItems.length > 0
            ? searchItems.map((product, id) => (
                <Grid item key={id} xs={6} md={4}>
                  <Card product={product} handleChange={handleChange} />
                </Grid>
              ))
            : null}
          {latestItems.map((product, id) => (
            <Grid item key={id} xs={6} md={4}>
              <Card product={product} handleChange={handleChange} />
            </Grid>
          ))}
          {favouriteItems.map((product, id) => (
            <Grid item key={id} xs={6} md={4}>
              <Card product={product} handleChange={handleChange} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default HomePage;
