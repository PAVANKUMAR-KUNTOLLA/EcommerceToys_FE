import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
  Grid,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
// import NavbarHeader from "../../components/navbar";
import { makeStyles } from "@mui/styles";

import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  setLoadingSpin,
  setSearch,
} from "../../redux/products/produtsSlice";
import LoadingSpin from "../../components/LoadingSpin";
import DataNotFound from "../../components/DataNotFound";
import ProductCard from "../../components/card";
import SearchResultsPage from "../../components/SearchResults";
import ProductSlider from "../../components/slider";

const productViewCustomStyles = makeStyles((theme) => ({
  mainBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  leftBlock: {
    width: "40vw",
    marginLeft: "5vw",
    marginTop: "1rem",
    marginRight: "5vw",
    [theme.breakpoints.down("md")]: {
      width: "80vw",
      marginLeft: "10vw",
      marginRight: "10vw",
    },
  },
  largeImage: {
    position: "relative",
  },
  mainImage: {
    position: "relative",
    width: "100%",
    height: "auto",
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
  refImages: {
    marginTop: "1rem",
    display: "flex",
    width: "100%",
    overflowX: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    scrollbarColor: "transparent transparent",
  },
  smallImage: {
    width: "100px",
    marginRight: "10px",
    cursor: "pointer",
  },
  rightBlock: {
    width: "40vw",
    marginRight: "10vw",
    marginTop: "5rem",
    marginBottom: "auto",
    [theme.breakpoints.down("md")]: {
      width: "80vw",
      marginLeft: "10vw",
      marginRight: "10vw",
      marginTop: "1rem",
    },
  },

  price: {
    fontWeight: "bold",
    marginBottom: "1rem",
  },

  buttonContainer: {
    justifyContent: "center",
    marginTop: "1rem",
  },

  button: {
    marginRight: "1rem",
  },

  description: {
    marginTop: "1rem",
  },
}));

const ProductViewPage = () => {
  const params = useParams();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const currProduct = products.find(
    (product) => product.id === parseInt(params.id)
  );
  const [relevantProducts, setRelevantProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLoadingSpin = useSelector((state) => state.products.isLoadingSpin);
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const isSearchOn = useSelector((state) => state.products.isSearchOn);
  const [isFavLoadingSpin, setIsFavLoadingSpin] = useState(false);
  const [isCartLoadingSpin, setIsCartLoadingSpin] = useState(false);
  const customStyles = productViewCustomStyles();

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 15) % 15);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1 + 15) % 15);
  };

  const handleSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleFetchProducts = () => {
    dispatch(setLoadingSpin(true));
    privateApiGET(Api.products)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
          if (params.id) {
            handleFetchRelevantProducts();
          }
          dispatch(setLoadingSpin(false));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setLoadingSpin(false));
      });
  };

  const handleFetchRelevantProducts = () => {
    let payload = { id: params.id };
    privateApiPOST(Api.relevant_products, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setRelevantProducts(data?.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleEditProduct = (data) => {
    let payload = data;
    privateApiPOST(Api.edit_product, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
          setIsFavLoadingSpin(false);
          setIsCartLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsFavLoadingSpin(false);
        setIsCartLoadingSpin(false);
      });
  };

  const handleFavouriteClick = () => {
    const data = {
      id: currProduct.id,
      title: currProduct.title,
      is_favourite: !currProduct.is_favourite,
    };
    setIsFavLoadingSpin(true);
    handleEditProduct(data);
  };

  const handleAddToCartClick = () => {
    const data = {
      id: currProduct.id,
      title: currProduct.title,
      is_item_in_cart: !currProduct.is_item_in_cart,
      quantity: currProduct.quantity + 1,
    };
    setIsCartLoadingSpin(true);
    handleEditProduct(data);
  };

  useEffect(() => {
    dispatch(setSearch(false));
    if (products.length === 0) {
      handleFetchProducts();
    } else {
      handleFetchRelevantProducts();
    }
  }, []);

  return (
    <Page title="products">
      {products.length > 0 && !isLoadingSpin && !isSearchOn && currProduct ? (
        <Box sx={{ marginTop: "10px" }}>
          <Box className={customStyles.mainBlock}>
            <Box className={customStyles.leftBlock}>
              <Box className={customStyles.largeImage}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    className={customStyles.mainImage}
                    variant="square"
                    src={`https://${currProduct[`image_${currentSlide}`]}`}
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
              <Box className={customStyles.refImages}>
                {Array.from(Array(15).keys()).map((index) => (
                  <Box
                    key={index}
                    component="img"
                    className={`${customStyles.smallImage} ${
                      index === currentSlide ? customStyles.activeImage : ""
                    }`}
                    src={`https://${currProduct[`image_${index}`]}`}
                    alt={`Reference ${index + 1}`}
                    onClick={() => handleSlide(index)}
                  />
                ))}
              </Box>
            </Box>
            <Box className={customStyles.rightBlock}>
              <Typography
                variant="h3"
                textAlign="left"
                className={customStyles.Title}
              >
                {currProduct.title}
              </Typography>
              {currProduct && currProduct["price"] && (
                <Typography variant="span" className={customStyles.price}>
                  Price:{" "}
                  {currProduct["price"].toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </Typography>
              )}
              <Box className={customStyles.buttonContainer}>
                <Button
                  variant={currProduct.is_favourite ? "contained" : "outlined"}
                  onClick={handleFavouriteClick}
                  className={customStyles.button}
                >
                  ADD TO FAV{" "}
                  {isFavLoadingSpin && (
                    <CircularProgress
                      size={15}
                      color={currProduct.is_favourite ? "secondary" : "primary"}
                      sx={{ marginLeft: "15px" }}
                    />
                  )}
                </Button>
                <Button
                  variant={
                    currProduct.is_item_in_cart ? "contained" : "outlined"
                  }
                  onClick={handleAddToCartClick}
                  className={customStyles.button}
                >
                  ADD TO CART{" "}
                  {isCartLoadingSpin && (
                    <CircularProgress
                      size={15}
                      color={
                        currProduct.is_item_in_cart ? "secondary" : "primary"
                      }
                      sx={{ marginLeft: "15px" }}
                    />
                  )}
                </Button>
              </Box>
              {currProduct && currProduct["description"] && (
                <Box className={customStyles.description}>
                  {currProduct["description"].split("\n").map((line, index) => (
                    <Typography key={index} variant="p">
                      {line}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
          {relevantProducts.length > 0 && (
            <Box sx={{ marginTop: "36px", marginBottom: "48px" }}>
              <Typography varaint="h2">Related products</Typography>
              <ProductSlider products={relevantProducts} />
            </Box>
          )}
        </Box>
      ) : !isLoadingSpin && isSearchOn && products.length > 0 ? (
        <SearchResultsPage />
      ) : null}
    </Page>
  );
};

export default ProductViewPage;
