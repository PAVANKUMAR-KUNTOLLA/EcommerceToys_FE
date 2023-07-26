import React, { useState } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid, Box, Avatar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { themeColors } from "../theme/themeColors";
import config from "../config";
import Categories from "./categories";
import { Link, useNavigate } from "react-router-dom";

export const customCardStyles = makeStyles((theme) => ({
  productCard: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      height: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "80%", // Update the width value to your desired size
      height: "80%", // Update the height value to your desired size
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "10px",
      width: "100%",
      height: "auto",
    },
  },

  productImageBox: {
    position: "relative",
  },
  productImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    cursor: "pointer",
  },

  productCategory: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    lineHeight: "35px",
    fontSize: "21px",
    color: "#222222",
    fontWeight: "600",

    [theme.breakpoints.down("md")]: {
      lineHeight: "24px",
      fontSize: "19px",
      textAlign: "center",
    },
  },
}));

const CategoriesCard = ({ product }) => {
  const customStyles = customCardStyles();
  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    navigate(`/app/products/categories/${category}`);
  };
  return (
    <Grid item className={customStyles.productCard}>
      <Box
        component="a"
        className={customStyles.productImageBox}
        sx={{ textDecoration: "none" }}
      >
        <Avatar
          variant="square"
          src={`https://${product.image_0}`}
          alt={product.title}
          className={customStyles.productImage}
          onClick={() => handleCategoryClick(product.category)}
        />

        <Typography variant="h3" className={customStyles.productCategory}>
          {product.category}
        </Typography>
      </Box>
    </Grid>
  );
};

export default CategoriesCard;
