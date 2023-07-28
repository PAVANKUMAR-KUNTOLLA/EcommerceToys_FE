import React, { useState, useEffect } from "react";
import { Avatar, Container, Box } from "@mui/material";

import { makeStyles } from "@mui/styles";
const AdverstismentCustomStyles = makeStyles((theme) => ({
  largeImage: {
    position: "relative",
    marginTop: "20px",
  },
  mainImage: {
    position: "relative",
    width: "100%",
    height: "70vh",
    objectFit: "cover",
    alignContent: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      height: "50vh",
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
const AdverstiesmentImagesSlider = () => {
  const images = [
    "/static/img/one_piece.jpg",
    "/static/img/wallpaperflare.com_wallpaper.jpg",
    "/static/img/wallpaperflare.com_wallpaper (5).jpg",
    "/static/img/wallpaperflare.com_wallpaper (3).jpg",
    "/static/img/wallpaperflare.com_wallpaper (2).jpg",
    "/static/img/wallpaperflare.com_wallpaper (1).jpg",
    "/static/img/wallpaperflare.com_wallpaper (4).jpg",
  ];
  const customStyles = AdverstismentCustomStyles();

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 6) % 6);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1 + 6) % 6);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1 + 6) % 6);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Container maxWidth="100%">
        <Box className={customStyles.largeImage}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              className={customStyles.mainImage}
              variant="square"
              src={images[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${customStyles.prevSvgIcon} icon icon-tabler icon-tabler-chevron-left`}
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
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${customStyles.nextSvgIcon} icon icon-tabler icon-tabler-chevron-right`}
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
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AdverstiesmentImagesSlider;
