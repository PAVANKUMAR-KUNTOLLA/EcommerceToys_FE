import React, { Component } from "react";
import OrderPayment from "../views/Cart/shipping.page";
import { Container } from "@mui/material";

const CheckOutPage = () => {
  return (
    <Container maxWidth="md">
      <OrderPayment />;
    </Container>
  );
};

export default CheckOutPage;
