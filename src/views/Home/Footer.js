import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
} from "@mui/material";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";

export const footercardStyles = makeStyles((theme) => ({
  MainBlock: {
    display: "flex",
    marginTop: "50px",
    height: "auto",
    backgroundColor: "",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "space-between",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "-30px",
    },
  },
  ProfileBlock: {
    height: "30vh",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {},
  },
  Profile: {
    width: "100%",
    height: "40vh",
  },
  About: {
    marginTop: "50px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "space-between",
      marginTop: "100px",
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
    },
  },
  paragraph: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "20px",
  },
  contact: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyFooter = () => {
  const customStyles = footercardStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="100%" className={customStyles.MainBlock}>
        <Grid maxWidth="md" className={customStyles.ProfileBlock}>
          <Avatar
            variant="square"
            src="/static/img/[removal.ai]_5a159d06-b0c9-41a2-b86d-7b606275dc50-passport_size_photo.png"
            className={customStyles.Profile}
          />
        </Grid>
        <Grid maxWidth="md" className={customStyles.About}>
          <Typography className={customStyles.title}>about me</Typography>
          <Typography maxWidth="100%" className={customStyles.paragraph}>
            I'm now pursuing my Bachelor of Technology at Madanapalle Institute
            of Technology and Science in Computer Science and Engineering-Cyber
            Security. I'm looking forward to an internship opportunity that will
            assist me in furthering my Data Science and Deep learning skills.
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Skils" {...a11yProps(0)} />
                <Tab label="Education" {...a11yProps(1)} />
                <Tab label="Projects" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              Skills
              <Typography variant="h3">Programming Languages</Typography>
              <Typography variant="h4" marginBottom="10px">
                --Python,Java Script
              </Typography>
              <Typography variant="h3">FrontEnd</Typography>
              <Typography variant="h4" marginBottom="10px">
                --React,Redux,Material Ui
              </Typography>
              <Typography variant="h3">Backend</Typography>
              <Typography variant="h4" marginBottom="10px">
                --Django,Django Rest Framework,Flask
              </Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Education
              <Typography variant="h3">2020-2024</Typography>
              <Typography variant="h4" marginBottom="10px">
                ​B.Tech from MITS in Computer Science and Engineering
              </Typography>
              <Typography variant="h3">2018-2020</Typography>
              <Typography variant="h4" marginBottom="10px">
                ​ Intermediate from Sri Chaitanya jr college
              </Typography>
              <Typography variant="h3">2018</Typography>
              <Typography variant="h4" marginBottom="10px">
                SSC from vivekananda High School
              </Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Projects
            </CustomTabPanel>
          </Box>
        </Grid>
      </Container>
      <Container>
        <Box className={customStyles.contact}>
          <Typography className={customStyles.title}>Contact me</Typography>
          <Typography variant="h3" marginBottom={"10px"}>
            Explore my profiles and stay up-to-date with my latest projects
          </Typography>
          <Typography marginBottom={"10px"}>
            Follow me on LinkedIn, Facebook, LeetCode, HackerRank, GitHub,
            Instagram and Twitter!
          </Typography>
          <Grid display={"flex"}>
            <Link to="https://www.linkedin.com/in/pavan-kumar-kuntolla-454b84245/">
              <Avatar
                variant="square"
                src="/static/img/linkedin-app-icon.svg"
                sx={{ marginLeft: "20px", marginRight: "20px" }}
              />
            </Link>
            <Link to="https://discordapp.com/users/1123274161184309368">
              <Avatar
                variant="square"
                src="/static/img/discord-square-color-icon.svg"
                sx={{ marginLeft: "20px", marginRight: "20px" }}
              />
            </Link>
            <Link to="https://github.com/PAVANKUMAR-KUNTOLLA?tab=overview&from=2023-05-01&to=2023-05-01">
              <Avatar
                variant="square"
                src="/static/img/github-icon.svg"
                sx={{ marginLeft: "20px", marginRight: "20px" }}
              />
            </Link>
            <Link to="https://leetcode.com/kuntollapavankumar/">
              <Avatar
                variant="square"
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                sx={{ marginLeft: "20px", marginRight: "20px" }}
              />
            </Link>
          </Grid>
          <hr></hr>
          Copyright 2023 © @kuntollapavankumar
        </Box>
      </Container>
    </>
  );
};

export default MyFooter;
