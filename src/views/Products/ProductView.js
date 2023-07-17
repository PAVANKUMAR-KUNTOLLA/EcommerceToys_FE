import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button,Avatar } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import NavbarHeader from "../../components/navbar";
import { makeStyles } from "@mui/styles";

import { privateApiPOST } from "../../components/PrivateRoute";
import Api from "../../components/Api";

const productViewCustomStyles = makeStyles((theme)=>({
      mainBlock:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column', 
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row',
        },
      },
      leftBlock:{
        width: "40vw",
        marginLeft: "5vw",
        marginTop: "1rem",
        marginRight: "5vw",
        [theme.breakpoints.down('md')]: {
          width:'80vw',
          marginLeft: "10vw",
          marginRight: "10vw",
        }
      },
      largeImage:{
        position: "relative",
      },
      mainImage:{
        width:'100%',
        height:'auto',
      },
      refImages:{
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
        marginTop:'5rem',
        marginBottom:'auto',
        [theme.breakpoints.down('md')]: {
          width:'80vw',
          marginLeft: "10vw",
          marginRight: "10vw",
          marginTop: "1rem",
          
        }
      },
    
      price: {
        fontWeight: "bold",
        marginBottom:'1rem'
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
  const location = useLocation();
  const title = location.state?.title;
  const [currProduct, setCurrProduct] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const customStyles = productViewCustomStyles()

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 15) % 15);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1 + 15) % 15);
  };

  const handleSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleFetchProduct = (data) => {
    let payload = data;
    privateApiPOST(Api.products, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          setCurrProduct(data?.data);
          console.log(data);
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
          setCurrProduct(data?.data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleFavouriteClick = () => {
    const data = {
      title: currProduct.title,
      is_favourite: !currProduct.is_favourite,
    };
    handleEditProduct(data);
  };

  const handleAddToCartClick = () => {
    const data = {
      title: currProduct.title,
      is_item_in_cart: !currProduct.is_item_in_cart,
      quantity: currProduct.quantity + 1,
    };
    handleEditProduct(data);
  };

  useEffect(() => {
    handleFetchProduct({ title: title });
  }, []);

  return (
    <Page title="products">
      <NavbarHeader />
      <Box sx={{ marginTop: "10px"}}>

        <Box className={customStyles.mainBlock}>
          <Box className={customStyles.leftBlock}>
            <Box className={customStyles.largeImage}>
              <Box>
                <Box>
                  <Avatar 
                    className={customStyles.mainImage}
                    variant="square"
                    src={`https://${currProduct[`image_${currentSlide}`]}`}
                    alt={`Slide ${currentSlide + 1}`}
                  />
                </Box>
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
            <Typography variant="h3" textAlign="left" className={customStyles.Title}>
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
                ADD TO FAV
              </Button>
              <Button
                variant={currProduct.is_item_in_cart ? "contained" : "outlined"}
                onClick={handleAddToCartClick}
                className={customStyles.button}
              >
                ADD TO CART
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
      </Box>
    </Page>
  );
};

export default ProductViewPage;