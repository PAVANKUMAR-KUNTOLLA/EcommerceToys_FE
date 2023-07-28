import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { makeStyles } from "@mui/styles";

const customPaymentStyles = makeStyles((theme) => ({
  FormBox: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "50px",
    maxWidth: "50%",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("md")]: {
      maxWidth: "80%",
    },
  },
  RadioGroup: {
    flexDirection: "row",
  },
}));

const PaymentStep = ({ paymentData, setPaymentData }) => {
  const customStyles = customPaymentStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevPaymentData) => ({
      ...prevPaymentData,
      [name]: value,
    }));
  };

  const isPaymentMethodSelected = () => {
    return paymentData.paymentMethod !== "";
  };

  const isCardPaymentValid = () => {
    return (
      paymentData.cardNumber.trim() !== "" &&
      paymentData.cardHolder.trim() !== "" &&
      paymentData.expiryDate.trim() !== "" &&
      paymentData.cvv.trim() !== ""
    );
  };

  const isUpiPaymentValid = () => {
    return paymentData.upiId.trim() !== "";
  };

  const isPaymentValid = () => {
    if (paymentData.paymentMethod === "card") {
      return isCardPaymentValid();
    } else if (paymentData.paymentMethod === "upi") {
      return isUpiPaymentValid();
    }

    // Add more validation for other payment methods if needed

    return false;
  };

  return (
    <form>
      <Box className={customStyles.FormBox}>
        <RadioGroup
          name="paymentMethod"
          value={paymentData.paymentMethod}
          onChange={handleChange}
          className={customStyles.RadioGroup}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit/Debit Card"
          />
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          {/* Add more payment options here */}
        </RadioGroup>

        {paymentData.paymentMethod === "card" && (
          <>
            <TextField
              id="cardNumber"
              name="cardNumber"
              label="Card Number"
              variant="outlined"
              value={paymentData.cardNumber}
              onChange={handleChange}
              required
              // error={!isCardPaymentValid() && isPaymentMethodSelected()}
              // helperText={
              //   !isCardPaymentValid() && isPaymentMethodSelected()
              //     ? "Please fill in all the card details."
              //     : ""
              // }
            />
            <TextField
              id="cardHolder"
              name="cardHolder"
              label="Card Holder"
              variant="outlined"
              value={paymentData.cardHolder}
              onChange={handleChange}
              required
              // error={!isCardPaymentValid() && isPaymentMethodSelected()}
              // helperText={
              //   !isCardPaymentValid() && isPaymentMethodSelected()
              //     ? "Please fill in all the card details."
              //     : ""
              // }
            />
            <TextField
              id="expiryDate"
              name="expiryDate"
              label="Expiry Date"
              variant="outlined"
              value={paymentData.expiryDate}
              onChange={handleChange}
              required
              // error={!isCardPaymentValid() && isPaymentMethodSelected()}
              // helperText={
              //   !isCardPaymentValid() && isPaymentMethodSelected()
              //     ? "Please fill in all the card details."
              //     : ""
              // }
            />
            <TextField
              id="cvv"
              name="cvv"
              label="CVV"
              variant="outlined"
              value={paymentData.cvv}
              onChange={handleChange}
              required
              // error={!isCardPaymentValid() && isPaymentMethodSelected()}
              // helperText={
              //   !isCardPaymentValid() && isPaymentMethodSelected()
              //     ? "Please fill in all the card details."
              //     : ""
              // }
            />
          </>
        )}

        {paymentData.paymentMethod === "upi" && (
          <TextField
            id="upiId"
            name="upiId"
            label="UPI ID"
            variant="outlined"
            value={paymentData.upiId}
            onChange={handleChange}
            required
            // error={!isUpiPaymentValid() && isPaymentMethodSelected()}
            // helperText={
            //   !isUpiPaymentValid() && isPaymentMethodSelected()
            //     ? "Please fill in the UPI ID."
            //     : ""
            // }
          />
        )}
      </Box>
    </form>
  );
};

export default PaymentStep;
