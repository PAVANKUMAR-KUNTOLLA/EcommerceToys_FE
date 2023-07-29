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
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { setLoadingSpin } from "../../redux/products/produtsSlice";
import { useDispatch } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
const customProfileStyles = makeStyles((theme) => ({
  mainBlock: {
    marginTop: "50px",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
  },
  account: {
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      marginBottom: "10px",
    },
  },
  title: {
    textTransform: "uppercase",
    color: "#3e4152",
    fontSize: "28px",
    fontWeight: "700",
    marginTop: "34px",
    marginBottom: "10px",
    letterSpacing: "1.5px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      fontSize: "20px",
      letterSpacing: "0.5px",
    },
  },
  subTitle: {
    textTransform: "uppercase",
    color: "#3e4152",
    fontSize: "20px",
    fontWeight: "500",
    textAlign: "left",
    marginTop: "24px",
    letterSpacing: "1px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      letterSpacing: "0.5px",
    },
  },
}));

const ProfilePage = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const customStyles = customProfileStyles();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
    orderHistory: [],
    visitHistory: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleProductView = (id, title) => {
    console.log(title);
    const regex = /[^a-zA-Z0-9-]/g;
    navigate(
      `/app/products/${id}/${title.replace(/ /g, "-").replace(regex, "")}`
    );
  };

  const handleFetchProfileData = () => {
    dispatch(setLoadingSpin(true));
    privateApiGET(Api.profile)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          let info = data?.data;
          setUserInfo((prev) => ({
            ...prev,
            id: info.id,
            name: info.name,
            email: info.email,
            orderHistory: info.orders,
            visitHistory: info.products,
          }));
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function stringAvatar(name) {
    if (name.split(" ").length == 1) {
      return {
        children: `${name.split(" ")[0][0]}`,
      };
    }
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    handleFetchProfileData();
  }, []);

  return (
    <Page title="Profile">
      <Container maxWidth="md" className={customStyles.mainBlock}>
        <Box className={customStyles.account}>
          {userInfo.name && (
            <Avatar
              {...stringAvatar(userInfo.name)}
              sx={{
                width: "100px",
                height: "100px",
                fontSize: "48px",
                color: "white",
                backgroundColor: "rgb(0,76,153,0.8)",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          )}
          <Typography className={customStyles.title}>
            {userInfo.name}
          </Typography>
        </Box>

        <Box maxWidth={"sm"} sx={{ marginLeft: "auto", marginRight: "auto" }}>
          <Typography className={customStyles.subTitle}>
            Order History
          </Typography>

          <TableContainer component={Paper} sx={{ marginTop: "35px" }}>
            <Table sx={{ maxWidth: "sm" }} aria-label="simple table">
              <PerfectScrollbar style={{ maxHeight: "350px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Ordered Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userInfo["orderHistory"].map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={() => handleProductView(row.id, row.title)}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="left">{row.order_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </PerfectScrollbar>
            </Table>
          </TableContainer>
        </Box>

        <Box maxWidth={"sm"} sx={{ marginLeft: "auto", marginRight: "auto" }}>
          <Typography className={customStyles.subTitle}>
            Recently Visited
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              marginTop: "20px",
            }}
          >
            <Table sx={{ maxWidth: "md" }} aria-label="simple table">
              <PerfectScrollbar style={{ maxHeight: "350px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Count</TableCell>
                    <TableCell align="left">Viewed_at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userInfo["visitHistory"].map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={() => handleProductView(row.id, row.title)}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="left">{row.view_count}</TableCell>
                      <TableCell align="left">{row.visited_at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </PerfectScrollbar>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Page>
  );
};

export default ProfilePage;
