import React from "react";
import ProductCard from "./card";
import { useDispatch, useSelector } from "react-redux";
import DataNotFound from "./DataNotFound";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useStyles } from "../views/Home/home.page";

const SearchResultsPage = ({ customStyles }) => {
  if (!customStyles) {
    customStyles = useStyles();
  }

  const products = useSelector((state) => state.products.products);
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const isSearchOn = useSelector((state) => state.products.isSearchOn);

  return (
    <Container maxWidth="md" className={customStyles.container}>
      {isSearchOn && products.length > 0 ? (
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{
                alignItems: "center",
                marginTop: "50px",
                marginLeft: "auto",
                marginRight: "auto",
                textTransform: "capitalize",
              }}
            >
              {searchQuery}
            </Typography>
            <hr
              sx={{
                borderTop: "2px solid black",
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></hr>
          </Grid>
          {products.map((product) => (
            <Grid item key={product.id} xs={6} md={3} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : isSearchOn && products.length === 0 ? (
        <DataNotFound />
      ) : null}
    </Container>
  );
};

export default SearchResultsPage;
