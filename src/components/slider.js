import React, { useState } from "react";
import ProductCard from "./card";
import { makeStyles } from "@mui/styles";
import { Container, Grid } from "@mui/material";

export const customSliderStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    paddingLeft: "0",
    paddingRight: "0",
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.lg,
      overflowX: "hidden",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.breakpoints.values.md,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: theme.breakpoints.values.sm,
    },
    overflowX: "scroll", // Enable horizontal scrolling
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    scrollbarColor: "transparent",
    "&::-webkit-scrollbar": {
      width: "0px", // Hide the scrollbar for Chrome, Safari, and newer Edge
    },
    [theme.breakpoints.up("sm")]: {
      "&:hover $sliderControls": {
        display: "flex", // Show slider controls on hover for larger screens
      },
    },
  },
  sliderControls: {
    display: "none",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    zIndex: 1,
    pointerEvents: "none", // Disable pointer events on the sliderControls container
  },
  prevSvgIcon: {
    cursor: "pointer",
    marginLeft: "-30px",
    pointerEvents: "auto", // Enable pointer events on the button element
  },
  nextSvgIcon: {
    cursor: "pointer",
    marginRight: "50px",
    pointerEvents: "auto", // Enable pointer events on the button element
  },
  sliderWrapper: {
    display: "flex",
    transition: "transform 1.5 ease", // Add transition effect to the sliding
  },
  sliderPage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    flex: "0 0 100%", // Set each page to 100% width to prevent wrapping
    padding: theme.spacing(0, 1), // Add some spacing between cards
  },
  sliderPageVisible: {
    opacity: 1, // Show the current page
  },
}));

const ProductSlider = ({ products, handlechange }) => {
  const customStyles = customSliderStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = window.innerWidth >= 1024 ? 4 : 2; // Number of cards per slide based on screen size

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(products.length / cardsPerPage) - 1)
    );
  };

  // Calculate the start and end index of products to display for the current page
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  return (
    <Container maxWidth="lg" className={customStyles.container}>
      <div className={customStyles.sliderControls}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={customStyles.prevSvgIcon}
          width="68"
          height="68"
          viewBox="0 0 24 24"
          strokeWidth="0.5"
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={handlePrev}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={customStyles.nextSvgIcon}
          width="68"
          height="68"
          viewBox="0 0 24 24"
          strokeWidth="0.5"
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={handleNext}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </div>
      <div
        className={customStyles.sliderWrapper}
        style={{
          transform: `translateX(-${currentPage * 100}%)`, // Use CSS transform to slide the content
        }}
      >
        {Array.from({ length: Math.ceil(products.length / cardsPerPage) }).map(
          (_, index) => (
            <div
              key={index}
              className={`${customStyles.sliderPage} ${
                currentPage === index ? customStyles.sliderPageVisible : ""
              }`}
            >
              <Grid container spacing={2} mt={3}>
                {products
                  .slice(index * cardsPerPage, (index + 1) * cardsPerPage)
                  .map((product) => (
                    <Grid item key={product.id} xs={6} md={3} lg={3}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
              </Grid>
            </div>
          )
        )}
      </div>
    </Container>
  );
};

export default ProductSlider;
