import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid, Box, Avatar, Typography, IconButton } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { themeColors } from "../theme/themeColors";
import config from "../config";

import { formattedPrice } from "../utils/index";

export const customCardStyles = makeStyles((theme) => ({
  productCard: {
    width: "27.8%",
    height: "35%",
    marginLeft: "10px",
    marginBottom: "25px",
    [theme.breakpoints.down("md")]: {
      height: "29%",
      width: "17.4%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "270px",
      width: "158px",
      marginLeft: "0px",
      marginRight: "10px",
    },
  },
  productImageBox: {
    position: "relative",
  },
  productImage: {
    height: "278px",
    width: "278px",
    [theme.breakpoints.down("md")]: {
      height: "174px",
      width: "174px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "158px",
      width: "158px",
    },
  },
  favouriteIcon: {
    position: "absolute",
    top: "0px",
    right: "0px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    minWidth: "48px",
    minHeight: "48px",
    padding: "0",
    border: "0",
  },
  productTitle: {
    width: "278px",
    height: "36px",
    fontWeight: "400",
    overflow: "hidden",
    color: "#222222",
    marginBottom: "5px",
    [theme.breakpoints.down("md")]: {
      width: "174px",
      height: "36px",
      marginBottom: "5px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "158px",
      height: "54px",
      marginBottom: "5px",
    },
  },
  productPrice: {
    width: "58.79px",
    lineHeight: "18px",
    fontSize: "13px",
    textAlign: "center",
    color: "#222222",
    fontWeight: "400",
    [theme.breakpoints.down("md")]: {
      width: "374px",
      height: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "152px",
      height: "18px",
    },
  },
}));

const Card = ({ product, handleChange }) => {
  const customStyles = customCardStyles();

  const handleEditProduct = (data) => {
    const url = "http://127.0.0.1:8000/api/v1/edit_product/";

    axios({
      data: data,
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const { status, data } = res;
        handleChange && handleChange();
        console.log("data", data);
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
        <Link to="/productview" state={{ title: product.title }}>
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
        to="/productview"
        state={{ title: product.title }}
        sx={{ textDecoration: "none" }}
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

export default Card;
