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
      maxWidth: "80%",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any additional logic or submit the form data here
    console.log("Form Data:", address);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

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
            orderHistory: info.order_history,
            visitHistory: info.visit_history,
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
        <Typography
          variant="h3"
          sx={{ marginBottom: "30px", marginTop: "20px", marginLeft: "10px" }}
        >
          Account Details
        </Typography>
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
                Profile
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
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Price</TableCell>
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
                          {row.product__title}
                        </TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">{row.updated_at}</TableCell>
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
              <Typography>Ordered History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper} sx={{ marginTop: "35px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Ordered Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userInfo["visitHistory"].map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.product__title}
                        </TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                        <TableCell align="left">{row.updated_at}</TableCell>
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
