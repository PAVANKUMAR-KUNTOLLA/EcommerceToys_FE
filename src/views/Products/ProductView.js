import React, { useState, useEffect, useRef } from "react";
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
import { thousands_separators } from "../../utils";

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

  refImages: {
    marginTop: "1rem",
    display: "flex",
    width: "100%",
    overflowX: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    scrollbarColor: "transparent",
    "&::-webkit-scrollbar": {
      width: "0px", // Hide the scrollbar for Chrome, Safari, and newer Edge
    },
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

  title: {
    fontSize: "24px",
    fontWeight: "540",
    lineHeight: "27px",
    marginBottom: "16px",
  },
  price: {
    fontWeight: "700",
    fontSize: "21px",
    lineHeight: "24px",
    marginBottom: "24px",
  },

  buttonContainer: {
    justifyContent: "center",
    marginTop: "1rem",
  },

  button: {
    marginRight: "1rem",
  },

  description: {
    fontSize: "21px",
    fontWeight: "600",
    lineHeight: "24px",
    marginTop: "36px",
    marginBottom: "-24px",
  },
  paragraph: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19px",
  },
  relevantProducts: {
    maxWidth: "80vw",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    // [theme.breakpoints.down("sm")]: {
    //   maxWidth: "80vw",
    // },
  },
  relatedProductsTitle: {
    textTransform: "uppercase",
    color: "#3e4152",
    fontSize: "28px",
    fontWeight: "700",
    marginTop: "34px",
    marginBottom: "10px",
    letterSpacing: "1.5px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      fontSize: "20px",
      letterSpacing: "0.5px",
      marginBottom: "0px",
    },
  },
}));

const ProductViewPage = () => {
  const params = useParams();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const currProduct = products.find(
    (product) => product.id === parseInt(params.id)
  );
  let currProductRef = useRef(params.id);
  const relevantProducts = currProduct
    ? products.filter(
        (product) =>
          (product.title.startsWith(currProduct["title"]) ||
            product.category === currProduct["category"]) &&
          product.id != params.id
      )
    : [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLoadingSpin = useSelector((state) => state.products.isLoadingSpin);
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const isSearchOn = useSelector((state) => state.products.isSearchOn);
  const [isFavLoadingSpin, setIsFavLoadingSpin] = useState(false);
  const [isCartLoadingSpin, setIsCartLoadingSpin] = useState(false);
  const customStyles = productViewCustomStyles();

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
            handleRecordVisitHistory();
          }
          dispatch(setLoadingSpin(false));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setLoadingSpin(false));
      });
  };

  const handleRecordVisitHistory = () => {
    let payload = { id: params.id };
    privateApiPOST(Api.record_visit, payload)
      .then((response) => {
        const { status, data } = response;
        console.log("data", data?.message);
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
    if (params.id !== currProductRef.current) {
      handleRecordVisitHistory();
      setCurrentSlide(0);
    }
  }, [currProduct]);

  useEffect(() => {
    dispatch(setSearch(false));
    if (products.length === 0) {
      handleFetchProducts();
    } else {
      handleRecordVisitHistory();
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
              <Typography className={customStyles.title}>
                {currProduct.title}
              </Typography>
              {currProduct && currProduct["price"] && (
                <Typography className={customStyles.price}>
                  Rs. {thousands_separators(currProduct.price)}
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
              <Typography className={customStyles.description}>
                Description:
              </Typography>
              {currProduct && currProduct["description"] && (
                <Box className={customStyles.description}>
                  {currProduct["description"].split("\n").map(
                    (line, index) =>
                      line.trim() !== "" && (
                        <React.Fragment key={index}>
                          <Typography className={customStyles.paragraph}>
                            {line}
                          </Typography>
                          <Typography>
                            <br></br>
                          </Typography>
                        </React.Fragment>
                      )
                  )}
                </Box>
              )}
            </Box>
          </Box>
          {relevantProducts.length > 0 && (
            <Box
              sx={{ marginTop: "36px", marginBottom: "48px" }}
              className={customStyles.relevantProducts}
            >
              <Typography className={customStyles.relatedProductsTitle}>
                Related products
              </Typography>
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
