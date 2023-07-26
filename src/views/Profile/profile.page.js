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

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
const customProfileStyles = makeStyles((theme) => ({
  MainBlock: {
    display: "flex",
    marginTop: "50px",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  Account: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "50%",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      marginBottom: "10px",
    },
  },
}));

const ProfilePage = () => {
  const [expanded, setExpanded] = useState(false);

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
          dispatch(setLoadingSpin(false));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setLoadingSpin(false));
      });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    handleFetchProfileData();
  }, []);

  return (
    <Page title="Profile">
      <Grid
        maxWidth="lg"
        sx={{
          marginBottom: "50px",
          justifyContent: "space-between",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <hr></hr>
      </Grid>
      <Container maxWidth="lg" className={customStyles.MainBlock}>
        <Container maxWidth="sm">
          <Box className={customStyles.Account}>
            <Grid display={"flex"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user-circle"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
              </svg>
              <Typography
                variant="h3"
                sx={{
                  marginLeft: "20px",
                  alignContent: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                {userInfo.name}
              </Typography>
            </Grid>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={userInfo.name}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={userInfo.email}
            />
          </Box>
        </Container>
        <Container maxWidth="md">
          <Accordion
            expanded={expanded === "panel1a"}
            onChange={handleAccordionChange("panel1a")}
            sx={{ marginTop: "20px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Ordered History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper} sx={{ marginTop: "35px" }}>
                <Table sx={{ maxWidth: 600 }} aria-label="simple table">
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
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">{row.order_date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2a"}
            onChange={handleAccordionChange("panel2a")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Viewed History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer
                component={Paper}
                sx={{
                  marginTop: "35px",
                }}
              >
                <Table sx={{ maxWidth: "md" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">Count</TableCell>
                      <TableCell align="left">Viewed_at</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userInfo["visitHistory"]
                      .slice(0, Math.min(userInfo["visitHistory"].length, 10))
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell align="left">{row.view_count}</TableCell>
                          <TableCell align="left">{row.visited_at}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Container>
    </Page>
  );
};

export default ProfilePage;
