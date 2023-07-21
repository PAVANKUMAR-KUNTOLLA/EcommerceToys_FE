import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const PaymentStep = ({ handleNext, handleBack }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: "card",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    qrCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevPaymentDetails) => ({
      ...prevPaymentDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any additional logic or submit the payment details here
    console.log("Payment Details:", paymentDetails);
    handleNext(); // Move to the next step after submitting payment details
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "50%",
          justifyContent: "space-between",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <RadioGroup
          name="paymentMethod"
          value={paymentDetails.paymentMethod}
          onChange={handleChange}
          sx={{ flexDirection: "row" }}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit/Debit Card"
          />
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          <FormControlLabel value="qr" control={<Radio />} label="Pay Pal" />
        </RadioGroup>

        {paymentDetails.paymentMethod === "card" && (
          <>
            <TextField
              id="cardNumber"
              name="cardNumber"
              label="Card Number"
              variant="outlined"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              required
            />
            <TextField
              id="cardHolder"
              name="cardHolder"
              label="Card Holder"
              variant="outlined"
              value={paymentDetails.cardHolder}
              onChange={handleChange}
              required
            />
            <TextField
              id="expiryDate"
              name="expiryDate"
              label="Expiry Date"
              variant="outlined"
              value={paymentDetails.expiryDate}
              onChange={handleChange}
              required
            />
            <TextField
              id="cvv"
              name="cvv"
              label="CVV"
              variant="outlined"
              value={paymentDetails.cvv}
              onChange={handleChange}
              required
            />
          </>
        )}

        {paymentDetails.paymentMethod === "upi" && (
          <TextField
            id="upiId"
            name="upiId"
            label="UPI ID"
            variant="outlined"
            value={paymentDetails.upiId}
            onChange={handleChange}
            required
          />
        )}

        {/* {paymentDetails.paymentMethod === "qr" && (
          <TextField
            id="qrCode"
            name="qrCode"
            label="QR Code"
            variant="outlined"
            value={paymentDetails.qrCode}
            onChange={handleChange}
            required
          />
        )} */}

        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleBack}>Back</Button>
          <Button type="submit">Next</Button>
        </Box> */}
      </Box>
    </form>
  );
};

export default PaymentStep;
