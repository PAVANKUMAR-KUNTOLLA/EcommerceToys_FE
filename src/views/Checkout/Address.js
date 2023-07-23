import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AddressStep = ({ addressData, setAddressData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevAddressData) => ({
      ...prevAddressData,
      [name]: value,
    }));
  };

  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "50px",
          maxWidth: "50%",
          justifyContent: "space-between",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TextField
          id="address"
          name="address"
          label="Address"
          variant="outlined"
          required
          value={addressData.address}
          onChange={handleChange}
        />
        <TextField
          id="city"
          name="city"
          label="City"
          variant="outlined"
          required
          value={addressData.city}
          onChange={handleChange}
        />
        <TextField
          id="pincode"
          name="pincode"
          label="Pincode"
          variant="outlined"
          required
          value={addressData.pincode}
          onChange={handleChange}
        />
        <TextField
          id="country"
          name="country"
          label="Country"
          variant="outlined"
          required
          value={addressData.country}
          onChange={handleChange}
        />
      </Box>
    </form>
  );
};

export default AddressStep;
