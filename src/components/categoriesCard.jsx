import React, { useState } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid, Box, Avatar, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { themeColors } from "../theme/themeColors";
import config from "../config";
import Categories from './categories';
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
  },
  
  productTitle: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    textTransform:'uppercase',
    color: "#222222",
    marginBottom: "5px",
    [theme.breakpoints.down("md")]: {
      height: "20px",
      marginBottom: "5px",
    },
  },
}));

const CategoriesCard = ({ product, handleChange }) => {
  const customStyles = customCardStyles();
  return (
    <Grid item sx={{ padding: "0px 6px" }} className={customStyles.productCard}>
      <Box component={Link} className={customStyles.productImageBox} to="/app/products" sx={{textDecoration:"none"}} state={{category:product.category}}>
        <Avatar
          variant="square"
          src={`https://${product.image_0}`}
          alt={product.title}
          className={customStyles.productImage}/>
          
       
        <Typography variant="h3" className={customStyles.productTitle}>
          {product.category}
        </Typography>
    </Box>
    </Grid>
  );
};

export default CategoriesCard;

