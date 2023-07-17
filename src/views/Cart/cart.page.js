import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import NavbarHeader from "../../components/navbar";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from "react-router-dom";
import Message from "../../components/message";
import { Box, Container, Grid, Avatar, Typography, TextField, useMediaQuery, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import Api from "../../components/Api";

const customCartStyles = makeStyles((theme) => ({
  mainBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      marginLeft:'auto',
      marginRight:'auto',
    },
  },
  CartBlock: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position:'relative',
  },
  CancelIcon:{
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
  ImageBlock: {
    width: "50%",
    height: "100%",
  },
  ContentBlock: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0 1rem",
    marginTop:'2rem',
  },
  Image: {
    width: "100%",
    height: "auto",
  },
  Title: {
    marginBottom: "1rem",
  },
  Price: {
    marginBottom: "1rem",
  },
  Quantity: {
    marginBottom: "1rem",
  },
  TotalPrice: {
    fontWeight: "bold",
  },
  rightBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "1rem",
    [theme.breakpoints.up('sm')]: {
      marginTop: "50px",
      marginBottom: "auto",
    },
  },
}));

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const matchesSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const customStyles = customCartStyles();

  const formattedPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const handleFetchProducts = () => {
    privateApiGET(Api.products)
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        console.log("data", data);
        let items = data?.data.filter(
          (product) => product.is_item_in_cart === true
        );
        setCartItems(items);
        console.log("cartItems", items);
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
          handleFetchProducts();
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleFavouriteClick = (title, is_favourite) => {
    const data = { title: title, is_favourite: !is_favourite };
    handleEditProduct(data);
  };

  const handleAddToCartClick = (title, is_item_in_cart) => {
    const data = {
      title: title,
      is_item_in_cart: !is_item_in_cart,
      quantity: 0,
    };
    handleEditProduct(data);
  };

  const handleQuantityChange = (title, quantity) => {
    if (quantity < 1) {
      quantity = 1; // Set the quantity to 1 if it's less than 1
    }
    const data = { title: title, quantity: quantity };
    handleEditProduct(data);
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <Page title="Cart">
      <NavbarHeader />
      <Box className={customStyles.mainBlock} maxWidth={"md"}>
        <Container maxWidth="sm">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((product, id) => (
              <Box key={id} my={2} marginBottom="0px">
                <Grid container className={customStyles.CartBlock}>
                  <Grid item xs={6} className={customStyles.ImageBlock}>
                    <Link
                      key={product.title}
                      to={`/products/${product.title}`}
                      state={{ title: product.title }}
                    >
                      <Avatar
                        variant="square"
                        src={`https://${product.image_0}`}
                        alt={product.title}
                        className={customStyles.Image}
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} className={customStyles.ContentBlock}>
                    <Grid container direction="column" style={{ height: "100%" }}>
                      <Grid item>
                        <Typography className={customStyles.Title}>{product.title}</Typography>
                        <Typography className={customStyles.Price}>Price: {formattedPrice(product.price)}</Typography>
                        <TextField
                          label="Quantity"
                          type="number"
                          value={product.quantity}
                          className={customStyles.Quantity}
                          onChange={(e) => handleQuantityChange(product.title, e.target.value)}
                        />
                      </Grid>
                      {!matchesSm && (
                        <Grid item>
                          <Typography className={customStyles.TotalPrice}>
                            Total: {formattedPrice(product.price * product.quantity)}
                          </Typography>
                        </Grid>
                      )}
                       <Grid item className={customStyles.CancelIcon} >
                          <CancelOutlinedIcon onClick={() => handleAddToCartClick(product.title,product.is_item_in_cart)}/>
                        </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <hr bordertop="5px solid black" fontWeight="bold"></hr>
              </Box>

            ))
          ) : (
            <Message>No items in cart.</Message>
          )}
        </Container>
        <Container maxWidth="xs" className={customStyles.rightBlock}>

          <Box>
            <Typography variant="h3" marginBottom="1rem">
              Subtotal ₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
            </Typography>
            <Typography marginBottom="1rem">Tax included and shipping calculated at checkout</Typography>
            <Typography marginBottom="1rem">Orders will be processed in INR.</Typography>
            <Box marginBottom="1rem">
              <Button variant="outlined">CHECKOUT</Button>
            </Box>
            <Typography marginBottom="1rem">CONTINUE SHOPPING</Typography>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default CartPage;
