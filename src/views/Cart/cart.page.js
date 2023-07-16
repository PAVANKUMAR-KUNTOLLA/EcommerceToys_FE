import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import NavbarHeader from "../../components/navbar";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Message from "../../components/message";
import { Box, Container, Grid, Avatar, Typography, TextField, useMediaQuery, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const customCartStyles = makeStyles((theme) => ({
  mainBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  CartBlock: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
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
  },
  Image: {
    width: "100%",
    height: "auto",
  },
  Title: {
    marginBottom: "0.5rem",
  },
  Price: {
    marginBottom: "0.5rem",
  },
  Quantity: {
    marginBottom: "0.5rem",
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
      marginTop: 0,
      marginBottom: "1rem",
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
    const url = "/api/v1/products/";

    axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        
      },
    })
      .then((res) => {
        const { status, data } = res;
        let items = data?.data.filter((product) => product.is_item_in_cart === true);
        setCartItems(items);
        console.log("cartItems",items);
        console.log("data", data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleEditProduct = (data) => {
    const url = "/api/v1/edit_product/";

    axios({
      data: data,
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const { status, data } = res;
        handleFetchProducts();
        console.log("data", data);
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
              <Box key={id} my={2} border={1} borderRadius={4} p={2}>
                <Grid container className={customStyles.CartBlock}>
                  <Grid item xs={6} className={customStyles.ImageBlock}>
                    <Avatar
                      variant="square"
                      src={`https://${product.image_0}`}
                      alt={product.title}
                      className={customStyles.Image}
                    />
                  </Grid>
                  <Grid item xs={6} className={customStyles.ContentBlock}>
                    <Grid container direction="column" style={{ height: "100%" }}>
                      <Grid item>
                        <Typography className={customStyles.Title}>{product.title}</Typography>
                        <Typography className={customStyles.Price}>{formattedPrice(product.price)}</Typography>
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
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            <Message>No items in cart.</Message>
          )}
        </Container>
        <Container maxWidth="xs" className={customStyles.rightBlock}>
          <Box>
            <Typography variant="h3">
              Subtotal ₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
            </Typography>
            <Typography>Tax included and shipping calculated at checkout</Typography>
            <Typography>Orders will be processed in INR.</Typography>
          </Box>
          <Box mt={2}>
            <Button variant="outlined">CHECKOUT</Button>
            <Typography>CONTINUE SHOPPING</Typography>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default CartPage;
