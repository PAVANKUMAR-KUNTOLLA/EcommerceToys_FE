import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { themeColors } from "../theme/themeColors";
import config from "../config";

import Api from "./Api";
import { privateApiPOST } from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/products/produtsSlice";
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

const ProductCard = ({ product }) => {
  const customStyles = customCardStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditProduct = (data) => {
    let payload = data;
    privateApiPOST(Api.edit_product, payload)
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

  const handleFavouriteClick = () => {
    const data = { title: product.title, is_favourite: !product.is_favourite };
    handleEditProduct(data);
  };

  const handleProductView = (id, title) => {
    console.log(title);
    navigate(`/app/products/${id}/${title}`);
  };

  return (
    <Grid item sx={{ padding: "0px 6px" }} className={customStyles.productCard}>
      <Box className={customStyles.productImageBox}>
        <Button
          key={product.title}
          onClick={() => handleProductView(product.id, product.title)}
        >
          <Avatar
            variant="square"
            src={`https://${product.image_0}`}
            alt={product.title}
            className={customStyles.productImage}
          />
        </Button>
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

      <Button
        key={product.title}
        onClick={() => handleProductView(product.id, product.title)}
      >
        <Typography className={customStyles.productTitle}>
          {product.title}
        </Typography>
      </Button>

      <Typography className={customStyles.productPrice}>
        {formattedPrice(product.price)}
      </Typography>
    </Grid>
  );
};

export default ProductCard;
