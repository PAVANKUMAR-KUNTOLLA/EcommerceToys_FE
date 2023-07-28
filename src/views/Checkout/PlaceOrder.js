import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const handlePlaceOrder = () => {
    // Display the success alert
    const arrayOfArrayIds = cart.map((item) => {
      return { id: item.id };
    });

    console.log(arrayOfArrayIds);
    console.log("cart inside", cart);
    handleEditPlaceOrder(arrayOfArrayIds);

    setShowAlert(true);

    // Navigate to home page after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
      handleNav("home");
    }, 3000);
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

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
              marginLeft: "10px",
            }}
          >
            <Box>
              <Typography variant="h3">Shipping Address:</Typography>
              {/* Display the address data */}
              <Typography>
                {address.address}, {address.city}, {address.pincode},{" "}
                {address.country}
              </Typography>
              <hr></hr>
            </Box>
            <Box>
              <Typography variant="h3">Payment Details:</Typography>
              {/* Display the payment details data */}
              <Typography>
                {paymentMethod === "card"
                  ? "Credit/Debit Card"
                  : paymentMethod === "upi"
                  ? "UPI"
                  : ""}
              </Typography>
              <hr></hr>
            </Box>
            <Box>
              <Typography variant="h3">Cart Items:</Typography>
              {/* Display the cart items data */}
              <TableContainer component={Paper} sx={{ marginTop: "35px" }}>
                <Table sx={{ maxWidth: 450 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Amount</TableCell>
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
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">
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
          <Box sx={{ marginLeft: "20px" }}>
            <Typography variant="h3" marginBottom="1rem">
              Subtotal ₹
              {cart
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </Typography>
            <Typography marginBottom="1rem">
              Tax included and shipping calculated at checkout
            </Typography>
            <Typography marginBottom="1rem">
              Orders will be processed in INR.
            </Typography>
            <Button variant="contained" onClick={handlePlaceOrder}>
              Place Order
            </Button>
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
          You're order placed sucessfully —{" "}
          <strong> Please check it out!</strong>
        </Alert>
      )}
    </Box>
  );
};

export default PlaceOrderStep;
