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
import { thousands_separators } from "./../utils/index";

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
    borderRadius: "10px",
    cursor: "pointer",
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
    lineHeight: "27px",
    fontSize: "14px",
    fontWeight: "400",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "#222222",

    [theme.breakpoints.down("md")]: {
      lineHeight: "24px",
      // fontSize: "15px",
    },
  },
  productPrice: {
    width: "100%",
    lineHeight: "21px",
    fontSize: "16px",
    color: "#222222",
    fontWeight: "700",
    [theme.breakpoints.down("md")]: {
      lineHeight: "19px",
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
    const data = {
      id: product.id,
      title: product.title,
      is_favourite: !product.is_favourite,
    };
    handleEditProduct(data);
  };

  const handleProductView = (id, title) => {
    console.log(title);
    const regex = /[^a-zA-Z0-9-]/g;
    navigate(
      `/app/products/${id}/${title.replace(/ /g, "-").replace(regex, "")}`
    );
  };

  return (
    <Grid item sx={{ padding: "0px 6px" }} className={customStyles.productCard}>
      <Box className={customStyles.productImageBox}>
        <Avatar
          variant="square"
          src={`https://${product.image_0}`}
          alt={product.title}
          className={customStyles.productImage}
          onClick={() => handleProductView(product.id, product.title)}
        />

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

      <Typography className={customStyles.productTitle}>
        {product.title}
      </Typography>

      <Typography className={customStyles.productPrice}>
        Rs. {thousands_separators(product.price)}
      </Typography>
    </Grid>
  );
};

export default ProductCard;
