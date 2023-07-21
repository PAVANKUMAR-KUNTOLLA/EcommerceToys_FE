import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Typography,
  TextField,
  useMediaQuery,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { profilePageList } from "../../constants";

const customProfileStyles = makeStyles((theme) => ({
  MainBlock: {
    display: "flex",
  },
  Account: {
    backgroundColor: "gray",
    height: "100vh",
  },
  Orders: {
    backgroundColor: "tomato",
    height: "100vh",
  },
}));

const ProfilePage = () => {
  const customStyles = customProfileStyles();

  return (
    <Page title="Profile">
      <Container className={customStyles.MainBlock}>
        <Container maxWidth="xs" className={customStyles.Account}>
          <Typography variant="h1">MY ACCOUNT</Typography>
          <Typography variant="h3">Name</Typography>
          <Typography variant="h3">Email Address</Typography>
          <Typography variant="h3">Password</Typography>
          <Typography variant="h3">Confirm Password</Typography>
        </Container>
        <Container maxWidth="sm" className={customStyles.Orders}>
          <Typography variant="h1">Ordered Items</Typography>
        </Container>
      </Container>
    </Page>
  );
};

export default ProfilePage;
