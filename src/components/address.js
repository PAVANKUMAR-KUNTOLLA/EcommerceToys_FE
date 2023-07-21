import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AddressStep = () => {
  const [address, setAddress] = useState({
    address: "",
    city: "",
    pincode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any additional logic or submit the form data here
    console.log("Form Data:", address);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={address.address}
          onChange={handleChange}
          required
        />
        <TextField
          id="city"
          name="city"
          label="City"
          variant="outlined"
          value={address.city}
          onChange={handleChange}
          required
        />
        <TextField
          id="pincode"
          name="pincode"
          label="Pincode"
          variant="outlined"
          value={address.pincode}
          onChange={handleChange}
          required
        />
        <TextField
          id="country"
          name="country"
          label="Country"
          variant="outlined"
          value={address.country}
          onChange={handleChange}
          required
        />
      </Box>
    </form>
  );
};

export default AddressStep;
