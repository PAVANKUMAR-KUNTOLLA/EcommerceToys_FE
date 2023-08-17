import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import Message from "../../components/message";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Typography,
  TextField,
  useMediaQuery,
  Button,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import { setProducts, setLoadingSpin } from "../../redux/products/produtsSlice";
import { useNavigate, Navigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { thousands_separators } from "../../utils";
import ConfirmationDialogBox from "./ConfirmationDialogBox";

const customCartStyles = makeStyles((theme) => ({
  mainBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  cartBlock: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  imageBlock: {
    width: "50%",
    height: "100%",
  },
  contentBlock: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0 16px",
    marginTop: "2rem",
  },
  image: {
    width: "100%",
    height: "auto",
    cursor: "pointer",
  },
  title: {
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "21px",
    marginBottom: "5px",
  },
  price: {
    fontWeight: "700",
    fontSize: "18px",
    lineHeight: "24px",
    marginBottom: "16px",
  },
  quantity: {
    maxWidth: "110px",
    maxHeight: "50px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "0",
      },
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "0.1px solid #bdbdbd",
    },
    [theme.breakpoints.down("sm")]: {
      height: "40px",
      width: "90px",
      "& .MuiInputBase-input": {
        padding: "10px",
      },
    },
  },
  favIcon: {
    width: "100px",
    height: "40px",
    borderColor: "1px solid black",
    borderRadius: "0 !important",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "40px",
      width: "70px",
      padding: "1px",
    },
  },
  favQuantity: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      justifyContent: "space-between",
      height: "60px",
    },
  },
  rightBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "16px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "50px",
      marginBottom: "auto",
      marginLeft: "16px",
      marginRight: "16px",
    },
  },
}));

const CartPage = () => {
  const cart = useSelector((state) => state.products.cart);
  const matchesSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isLoadingSpin = useSelector((state) => state.products.isLoadingSpin);
  const [isconfirmDialogOpen, setIsconfirmDialogOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [orderType, setOrderType] = useState("placeOrder");

  const customStyles = customCartStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFetchProducts = () => {
    dispatch(setLoadingSpin(true));
    privateApiGET(Api.products)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
          dispatch(setLoadingSpin(false));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setLoadingSpin(false));
      });
  };

  const handleEditProduct = (data) => {
    dispatch(setLoadingSpin(true));
    let payload = data;
    privateApiPOST(Api.edit_product, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
          setIsconfirmDialogOpen(false);
          dispatch(setLoadingSpin(false));
          setEditProductId("");
          setOrderType("placeOrder");
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsconfirmDialogOpen(false);
        setEditProductId("");
        setOrderType("placeOrder");
        dispatch(setLoadingSpin(false));
      });
  };

  const handleFavouriteClick = (id, title, is_favourite) => {
    const data = { id: id, title: title, is_favourite: !is_favourite };
    handleEditProduct(data);
  };

  const handleQuantityChange = (id, title, quantity) => {
    let data = {};
    if (quantity >= 1 && quantity <= 100) {
      data = { id: id, title: title, quantity: Math.floor(quantity) };
    } else {
      data = { id: id, title: title, quantity: 0 };
    }
    handleEditProduct(data);
  };

  const handleDeleteChange = (id) => {
    setEditProductId(id);
    setOrderType("deleteOrder");
    setIsconfirmDialogOpen(true);
  };

  const handleConfirmChange = (data) => {
    if (orderType === "deleteOrder") {
      handleEditProduct(data);
    }
  };

  const handleConfirmationDialogBoxClose = () => {
    setIsconfirmDialogOpen(false);
    if (orderType === "deleteOrder") {
      setOrderType("placeOrder");
      setEditProductId("");
    }
  };

  const handleNav = (value) => {
    let path = `/app/${value}`;
    navigate(path);
  };

  const handleProductView = (id, title) => {
    console.log(title);
    navigate(`/app/products/${id}/${title}`);
  };

  return (
    <Page title="Cart">
      <Box className={customStyles.mainBlock} maxWidth={"lg"}>
        <Container maxWidth="sm">
          {cart && cart.length > 0 ? (
            cart.map((product, id) => (
              <Grid
                container
                key={id}
                className={customStyles.cartBlock}
                sx={{
                  borderRadius: "4px",
                  boxShadow: "0 1px 6px rgba(0,0,0, 0.095389)",
                  backgroundColor: "rgba(255,255,255, 1)",
                  borderTop: "1px solid #E5E5E5",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <Grid item xs={4} className={customStyles.imageBlock}>
                  <Avatar
                    variant="square"
                    src={`https://${product.image_0}`}
                    alt={product.title}
                    className={customStyles.image}
                    key={product.id}
                    onClick={() => handleProductView(product.id, product.title)}
                  />
                </Grid>
                <Grid item xs={7} className={customStyles.contentBlock}>
                  <Typography className={customStyles.title}>
                    {product.title}
                  </Typography>

                  <Typography className={customStyles.price}>
                    Rs. {thousands_separators(product.price)}
                  </Typography>
                  <Box className={customStyles.favQuantity}>
                    <Box
                      sx={{
                        border: "0.1px solid #bdbdbd",
                        marginRight: "10px",
                      }}
                    >
                      <IconButton
                        className={customStyles.favIcon}
                        onClick={() =>
                          handleFavouriteClick(
                            product.id,
                            product.title,
                            product.is_favourite
                          )
                        }
                      >
                        {product.is_favourite ? (
                          <FavoriteIcon
                            sx={{
                              color: "red",
                              fontSize: "35px",
                              padding: "1px",
                            }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            sx={{
                              fontSize: "35px",
                              padding: "1px",
                            }}
                          />
                        )}
                      </IconButton>
                    </Box>
                    <TextField
                      type="number"
                      color="secondary"
                      value={product.quantity > 0 ? product.quantity : ""}
                      pattern="[0-9]"
                      className={customStyles.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          product.title,
                          e.target.value
                        )
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    sx={{ position: "absolute", right: "0", top: "35px" }}
                    onClick={() => handleDeleteChange(product.id)}
                  >
                    <DeleteIcon sx={{ color: "#474747" }} />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          ) : (
            <Message>Your Cart is Empty.</Message>
          )}
        </Container>
        <Container
          maxWidth="sm"
          className={customStyles.rightBlock}
          sx={{
            borderRadius: "4px",
            boxShadow: "0 1px 6px rgba(0,0,0, 0.095389)",
            backgroundColor: "rgba(255,255,255, 1)",
            borderTop: "1px solid #E5E5E5",
            padding: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "600",
                lineHeight: "27px",
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                fontSize: "21px",
                fontWeight: "500",
                lineHeight: "27px",
              }}
            >
              Rs.{" "}
              {thousands_separators(
                cart
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)
              )}
            </Typography>
          </Box>
          <Typography marginBottom="16px">
            Tax included and shipping calculated at checkout
          </Typography>
          <Typography marginBottom="16px">
            Orders will be processed in INR.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: { xs: "12px" },
            }}
          >
            <Button variant="outlined" onClick={() => handleNav("products")}>
              shop more
            </Button>

            {localStorage.getItem("token") &&
            cart
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2) > 0 ? (
              <Button variant="contained" onClick={() => handleNav("checkout")}>
                proceed to checkout
              </Button>
            ) : (
              <Button disabled>CHECKOUT</Button>
            )}
          </Box>
          {!localStorage.getItem("token") ? (
            <Button
              variant="contained"
              sx={{ marginTop: "16px" }}
              onClick={() => navigate("/login")}
            >
              Proceed to login
            </Button>
          ) : null}
        </Container>
      </Box>

      <ConfirmationDialogBox
        open={isconfirmDialogOpen}
        handleClose={handleConfirmationDialogBoxClose}
        handleConfirm={handleConfirmChange}
        type={orderType}
        isLoadingSpin={isLoadingSpin}
        productId={editProductId}
      />
    </Page>
  );
};

export default CartPage;
