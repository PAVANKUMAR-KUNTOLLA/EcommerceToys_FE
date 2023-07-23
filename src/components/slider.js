import React, { useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProductCard from "./card"; // Assuming you have a separate ProductCard component

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    position: "relative",
    overflow: "hidden",
  },
  sliderContent: {
    display: "flex",
    width: "100%",
  },
  cardContainer: {
    flex: "0 0 auto",
    padding: theme.spacing(1),
    width: "50%",
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
  prevNextButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    cursor: "pointer",
  },
  prevButton: {
    left: 0,
  },
  nextButton: {
    right: 0,
  },
}));

const ProductSlider = ({ products, handleChange }) => {
  const classes = useStyles();
  const itemsPerPageDesktop = 4; // Number of cards visible on desktop
  const itemsPerPageMobile = 2; // Number of cards visible on mobile
  const totalPagesDesktop = Math.ceil(products.length / itemsPerPageDesktop);
  const totalPagesMobile = Math.ceil(products.length / itemsPerPageMobile);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPagesMobile - 1));
  };

  const startIndex = currentPage * itemsPerPageMobile;
  const endIndex = Math.min(
    startIndex +
      (window.innerWidth >= 1280 ? itemsPerPageDesktop : itemsPerPageMobile),
    products.length
  );
  const visibleProducts = products.slice(startIndex, endIndex);

  // Conditionally render the slider only if the number of images is greater than the number of visible items per slide
  if (
    products.length <=
    (window.innerWidth >= 1280 ? itemsPerPageDesktop : itemsPerPageMobile)
  ) {
    return (
      <Box>
        <Box display="flex" flexWrap="nowrap">
          {products.map((product) => (
            <Box key={product.id} className={classes.cardContainer}>
              <ProductCard product={product} handleChange={handleChange} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.sliderContainer}>
      <Box className={classes.sliderContent}>
        {currentPage > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            /* Add the rest of your SVG attributes for the "Previous" button */
            className={`${classes.prevNextButton} ${classes.prevButton}`}
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
            {/* Replace the path element with your custom SVG path for the previous button */}
            <path d="M15 6l-6 6l6 6" />
          </svg>
        )}
        <Box display="flex" flexWrap="nowrap">
          {visibleProducts.map((product) => (
            <Box key={product.id} className={classes.cardContainer}>
              <ProductCard product={product} handleChange={handleChange} />
            </Box>
          ))}
        </Box>
        {currentPage < totalPagesMobile - 1 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            /* Add the rest of your SVG attributes for the "Next" button */
            className={`${classes.prevNextButton} ${classes.nextButton}`}
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
            {/* Replace the path element with your custom SVG path for the next button */}
            <path d="M9 6l6 6l-6 6" />
          </svg>
        )}
      </Box>
    </Box>
  );
};

export default ProductSlider;
