import React from "react";
import { useSelector } from "react-redux";
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
  // Dummy data for testing purposes

  const customStyles = customPlaceOrderStyles();
  const cart = useSelector((state) => state.products.cart);
  const navigate = useNavigate();

  const handleNav = (value) => {
    let path = `/app/${value}`;
    navigate(path);
  };

  const handlePlaceOrder = () => {
    // You can perform any additional logic or place the order here
    // For now, we will just log the data to the console.
    console.log("Shipping Address:", address);
    console.log("Payment Details:", paymentDetails);
    console.log("Cart Items:", cart);
    // handleNext(); // Move to the next step after placing the order
  };

  return (
    <Box maxWidth="lg" className={customStyles.MainBlock}>
      <Box
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          maxWidth: "50%",
          marginLeft: "30px",
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
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button /*onClick={handleBack}*/></Button>
          <Button onClick={handlePlaceOrder}></Button>
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
        <Box marginBottom="1rem">
          <Button variant="outlined" onClick={() => handleNav("home")}>
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceOrderStep;
