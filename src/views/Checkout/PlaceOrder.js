import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { thousands_separators } from "../../utils";

import { privateApiPOST, privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import { setProducts, setLoadingSpin } from "../../redux/products/produtsSlice";

const customPlaceOrderStyles = makeStyles((theme) => ({
  MainBlock: {
    display: "flex",
    marginTop: "50px",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  rightBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "16px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "0px",
      marginBottom: "auto",
    },
  },
  title: {
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "21px",
    marginBottom: "5px",
  },
  paragraph: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "19px",
  },
}));

const PlaceOrderStep = ({ address, paymentMethod }) => {
  const [showAlert, setShowAlert] = useState(false); // State for managing alert visibility

  const customStyles = customPlaceOrderStyles();
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoadingSpin = useSelector((state) => state.products.isLoadingSpin);

  const handleEditPlaceOrder = (data) => {
    let payload = data;
    privateApiPOST(Api.place_order, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));

          setShowAlert(true);

          // Navigate to home page after 5 seconds
          setTimeout(() => {
            setShowAlert(false);
            handleNav("home");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleNav = (value) => {
    let path = `/app/${value}`;
    navigate(path);
  };

  const handlePlaceOrder = () => {
    // Display the success alert
    const arrayOfArrayIds = cart.map((item) => {
      return { id: item.id };
    });

    handleEditPlaceOrder(arrayOfArrayIds);
  };

  return (
    <Box maxWidth="lg" className={customStyles.MainBlock}>
      {!showAlert && ( // Conditionally render the content when showAlert is false
        <>
          <Box
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: { xs: "100%", sm: "60%" },
              maxWidth: "100%",
              marginLeft: { xs: "0", sm: "10px" },
            }}
          >
            <Box>
              <Typography className={customStyles.title}>
                Shipping Address:
              </Typography>
              {/* Display the address data */}
              <Typography className={customStyles.paragraph}>
                {address.address}, {address.city}, {address.pincode},{" "}
                {address.country}
              </Typography>
              <hr></hr>
            </Box>
            <Box>
              <Typography className={customStyles.title}>
                Payment Details:
              </Typography>
              {/* Display the payment details data */}
              <Typography className={customStyles.paragraph}>
                {paymentMethod === "card"
                  ? "Credit/Debit Card"
                  : paymentMethod === "upi"
                  ? "UPI"
                  : ""}
              </Typography>
              <hr></hr>
            </Box>
            <Box>
              <Typography className={customStyles.title}>
                Cart Items:
              </Typography>
              {/* Display the cart items data */}
              <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                <Table sx={{ maxWidth: 550 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" className={customStyles.title}>
                        Title
                      </TableCell>
                      <TableCell align="left" className={customStyles.title}>
                        Quantity
                      </TableCell>
                      <TableCell align="left" className={customStyles.title}>
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          align="left"
                          className={customStyles.paragraph}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={customStyles.paragraph}
                        >
                          {row.quantity}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={customStyles.paragraph}
                        >
                          {row.quantity * row.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <hr></hr>
            </Box>
          </Box>
          <Box sx={{ marginLeft: { xs: "0", sm: "30px" } }}>
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
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)
                  )}
                </Typography>
              </Box>
              <Typography marginBottom="16px">
                Tax included and shipping charges at checkout
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
                <Button
                  variant="outlined"
                  onClick={() => handleNav("products")}
                >
                  shop more
                </Button>
                <Button variant="contained" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </Box>
            </Container>
          </Box>
        </>
      )}

      {/* Display the success alert in the center of the screen */}
      {showAlert && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AlertTitle>Sucessfull</AlertTitle>
          Your order placed sucessfully — <strong> Please check it out!</strong>
        </Alert>
      )}
    </Box>
  );
};

export default PlaceOrderStep;
