import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PlaceOrderStep = () => {
  // Dummy data for testing purposes
  const cartItems = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 15 },
  ];

  const address = {
    street: "123 Main Street",
    city: "New York",
    pincode: "10001",
    country: "USA",
  };

  const paymentDetails = {
    paymentMethod: "card",
  };

  const calculateTotalPrice = () => {
    // You can calculate the total price of cart items here
    // For now, let's assume the function is implemented
    // and returns the total price.
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handlePlaceOrder = () => {
    // You can perform any additional logic or place the order here
    // For now, we will just log the data to the console.
    console.log("Shipping Address:", address);
    console.log("Payment Details:", paymentDetails);
    console.log("Cart Items:", cartItems);
    // handleNext(); // Move to the next step after placing the order
  };

  return (
    <Box maxWidth="lg" sx={{ marginTop: "50px", display: "flex" }}>
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
            {address.street}, {address.city}, {address.pincode},{" "}
            {address.country}
          </Typography>
          <hr></hr>
        </Box>
        <Box>
          <Typography variant="h3">Payment Details:</Typography>
          {/* Display the payment details data */}
          <Typography>
            {paymentDetails.paymentMethod === "card"
              ? "Credit/Debit Card"
              : paymentDetails.paymentMethod === "upi"
              ? "UPI: " + paymentDetails.upiId
              : "QR Code"}
          </Typography>
          <hr></hr>
        </Box>
        <Box>
          <Typography variant="h3">Cart Items:</Typography>
          {/* Display the cart items data */}
          {cartItems.map((item) => (
            <Typography key={item.id}>
              {item.name} -₹{item.price}
            </Typography>
          ))}
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
          {cartItems
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
          <Button variant="outlined" onClick={() => handleNav("checkout")}>
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceOrderStep;
