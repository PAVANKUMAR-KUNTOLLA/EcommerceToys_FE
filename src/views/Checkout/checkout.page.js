import React, { Component } from "react";
import OrderPayment from "./ShippingPage";
import { Container } from "@mui/material";
import Page from "../../components/Page";

const CheckOutPage = () => {
  return (
    <Page title="checkout">
      <Container maxWidth="md">
        <OrderPayment />
      </Container>
    </Page>
  );
};

export default CheckOutPage;
