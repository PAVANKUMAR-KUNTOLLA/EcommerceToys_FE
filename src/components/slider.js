import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProductCard from "./card";

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    position: "relative",
    overflow: "hidden",
  },
  sliderContent: {
    display: "flex",
    transition: "transform 0.3s ease",
    width: "100%",
  },
  cardContainer: {
    flex: "0 0 auto",
    padding: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "33.33%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "25%",
    },
  },
  prevSvgIcon: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: 1,
  },
  nextSvgIcon: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: 1,
  },
}));

const ProductSlider = ({ products, handleChange }) => {
  const classes = useStyles();
  const itemsPerPage = 4; // Change this value to set the number of cards visible at a time
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.length);
  const visibleProducts = products.slice(startIndex, endIndex);

  return (
    <Box className={classes.sliderContainer}>
      {currentPage > 0 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          /* Add the rest of your SVG attributes for the "Previous" button */
          className={classes.prevSvgIcon}
          width="84"
          height="84"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={handlePrev}
        >
          <path d="M15 6l-6 6l6 6" />
        </svg>
      )}
      <Box
        className={classes.sliderContent}
        style={{
          transform: `translateX(-${currentPage * (100 / totalPages)}%)`, // Adjust the translation based on the current page
        }}
      >
        <Grid container spacing={2} mt={2}>
          {visibleProducts.map((product) => (
            <Grid
              key={product.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.cardContainer}
            >
              <ProductCard product={product} handleChange={handleChange} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {currentPage < totalPages - 1 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          /* Add the rest of your SVG attributes for the "Next" button */
          className={classes.nextSvgIcon}
          width="84"
          height="84"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={handleNext}
        >
          <path d="M9 6l6 6l-6 6" />
        </svg>
      )}
    </Box>
  );
};

export default ProductSlider;
