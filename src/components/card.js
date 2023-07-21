import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid, Box, Avatar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { themeColors } from "../theme/themeColors";
import config from "../config";

import Api from "./Api";
import { privateApiPOST } from "./PrivateRoute";

import { formattedPrice } from "../utils/index";

export const customCardStyles = makeStyles((theme) => ({
  productCard: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "70%",
      height: "70%",
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
  },
  favouriteIcon: {
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize: "30px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    minWidth: "48px",
    minHeight: "48px",
    padding: "0",
    border: "0",
    [theme.breakpoints.down("md")]: {
      fontSize: "26px",
    },
  },
  productTitle: {
    width: "100%",
    height: "36px",
    fontWeight: "400",
    overflow: "hidden",
    textAlign: "center",
    justifyContent: "center",
    color: "#222222",
    marginBottom: "5px",
    [theme.breakpoints.down("md")]: {
      height: "20px",
      marginBottom: "5px",
    },
  },
  productPrice: {
    width: "100%",
    lineHeight: "18px",
    fontSize: "13px",
    textAlign: "center",
    justifyContent: "center",
    color: "#222222",
    fontWeight: "400",
    [theme.breakpoints.down("md")]: {
      height: "15px",
    },
  },
}));

const ProductCard = ({ product, handleChange }) => {
  const customStyles = customCardStyles();

  const handleEditProduct = (data) => {
    let payload = data;
    privateApiPOST(Api.edit_product, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          handleChange();
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleFavouriteClick = () => {
    const data = { title: product.title, is_favourite: !product.is_favourite };
    handleEditProduct(data);
  };

  return (
    <Grid item sx={{ padding: "0px 6px" }} className={customStyles.productCard}>
      <Box className={customStyles.productImageBox}>
        <Link
          key={product.title}
          to={`/app/products/${product.title.replace(/ /g, "_").toLowerCase()}`}
          state={{ title: product.title }}
        >
          <Avatar
            variant="square"
            src={`https://${product.image_0}`}
            alt={product.title}
            className={customStyles.productImage}
          />
        </Link>
        <IconButton
          className={customStyles.favouriteIcon}
          onClick={handleFavouriteClick}
        >
          {product.is_favourite ? (
            <FavoriteIcon sx={{ color: "red", fontSize: "24px" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: "24px" }} />
          )}
        </IconButton>
      </Box>

      <Link
        key={product.title}
        to={`/app/products/${product.title.replace(/ /g, "_").toLowerCase()}`}
        state={{ title: product.title }}
      >
        <Typography className={customStyles.productTitle}>
          {product.title}
        </Typography>
      </Link>

      <Typography className={customStyles.productPrice}>
        {formattedPrice(product.price)}
      </Typography>
    </Grid>
  );
};

export default ProductCard;
