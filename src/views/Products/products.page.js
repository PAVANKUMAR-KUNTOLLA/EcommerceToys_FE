import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import axios from "axios";
import Card from "../../components/card";
import { useLocation } from "react-router-dom";
import Categories from "../../components/categories";
import { Grid, Container, Typography } from "@mui/material";

import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";

import { useStyles } from "../Home/home.page";

const ProductsPage = () => {
  const customStyles = useStyles();
  const [items, setItems] = useState([]);
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState([location.state?.category]);



  const filteredItems =
  selectedCategory.length > 0
    ? items.filter((item) => selectedCategory.includes(item.category))
    : items;

  const handleFetchProducts = () => {
    privateApiGET(Api.products)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setItems(data?.data);
        }
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

  const handleCategoryClick = (category) => {
    if (selectedCategory.includes(category)) {
      let categories = selectedCategory.filter((each) => each !== category);
      setSelectedCategory(categories);
    } else {
      setSelectedCategory((prev) => [...prev, category]);
    }
  };

  return (
    <Page title="products">
      {/* <NavbarHeader /> */}
      <Categories
        items={items}
        onItemClick={handleCategoryClick}
        isActive={selectedCategory}
      />
      <Container maxWidth="md" className={customStyles.container}>
        <Typography variant="h1" alignItems="left" marginTop="50px">Products</Typography>
        <hr bordertop="2px solid black" fontWeight="bold"></hr>
        <Grid container spacing={2} mt={2}>
          {filteredItems &&
            filteredItems.map((product, id) => {
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

export default ProductsPage;
