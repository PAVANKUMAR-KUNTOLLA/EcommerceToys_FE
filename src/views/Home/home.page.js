import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import ProductCard from "../../components/card";
// import NavbarHeader from "../../components/navbar";
import CategoriesCard from "../../components/categoryCard";
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
import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import Categories from "./../../components/categories";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/products/produtsSlice";
import ProductSlider from "../../components/slider";

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.breakpoints.values.sm,
    },
    Typography: {},
  },
}));

const HomePage = () => {
  const customStyles = useStyles();

  const products = useSelector((state) => state.products.products);
  const favourites = useSelector((state) => state.products.favourites);
  const latest = useSelector((state) => state.products.latest);
  const dispatch = useDispatch();
  const [searchItems, setSearchItems] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

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
    privateApiGET(Api.products)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleChange = () => {
    handleFetchProducts();
  };

  // const handleSearchChange = (value) => {
  //   if (value) {
  //     let filtered_items = products.filter(
  //       (product) =>
  //         product.title.toLowerCase().startsWith(value.toLowerCase()) ===
  //           true || product.category.startsWith(value) === true
  //     );
  //     setSearchItems(filtered_items);
  //   } else {
  //     setSearchItems([]);
  //   }
  // };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <Page title="home">
      {/* <ResponsiveAppBar handleChange={handleSearchChange} /> */}
      <Container maxWidth="md" className={customStyles.container}>
        {products && (
          <Grid container spacing={2} mt={3}>
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
              ? searchItems.map((product) => (
                  <Grid item key={product.id} xs={6} md={4} lg={3}>
                    <ProductCard
                      product={product}
                      handleChange={handleChange}
                    />
                  </Grid>
                ))
              : null}
            {latest.map((product) => (
              <Grid item key={product.id} xs={6} md={3} lg={3}>
                <ProductCard product={product} handleChange={handleChange} />
              </Grid>
            ))}
            {favourites.map((product) => (
              <Grid item key={product.id} xs={6} md={3} lg={3}>
                <ProductCard product={product} handleChange={handleChange} />
              </Grid>
            ))}
            <Typography
              variant="h1"
              sx={{
                alignItems: "center",
                marginTop: "50px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Categories
            </Typography>
            <hr
              sx={{
                borderTop: "2px solid black",
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></hr>
            <Grid container spacing={2} mt={2}>
              {categoriesItems.map((product) => (
                <Grid item key={product.id} xs={6} md={3} lg={3}>
                  <CategoriesCard
                    product={product}
                    handleChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>
            <ProductSlider products={favourites} handleChange={handleChange} />
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default HomePage;
