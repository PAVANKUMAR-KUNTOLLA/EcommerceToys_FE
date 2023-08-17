import React from "react";
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
  mainBox: {
    display: "flex",
    flexDirection: "row",
    marginTop: "100px",
    marginBottom: "50px",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.breakpoints.up("sm")]: {
      borderRadius: "4px",
      boxShadow: "0 1px 6px rgba(0,0,0, 0.095389)",
      backgroundColor: "rgba(255,255,255, 1)",
      borderTop: "1px solid #E5E5E5",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginTop: "30px",
      marginBottom: "30px",
    },
  },
  profileBlock: {
    margin: "50px",
    width: "40vw",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "0",
      marginBottom: "30px",
    },
  },
  profile: {
    width: "100%",
    height: "40vh",
    marginLeft: "auto",
    [theme.breakpoints.down("md")]: {
      height: "30vh",
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
    fontFamily: "Poppins",
    fontStyle: "italic",
    justifyContent: "center",
    letterSpacing: "0.5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      lineHeight: "18px",
    },
  },
  contact: {
    width: "80vw",
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: "100px",
    [theme.breakpoints.down("md")]: {
      paddingTop: "40px",
      width: "40vw",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "10px",
      width: "80vw",
    },
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "21px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      lineHeight: "19px",
    },
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
    <Grid item maxWidth="md" className={customStyles.mainBox}>
      <Grid item className={customStyles.profileBlock}>
        <Avatar
          variant="square"
          src="/static/img/[removal.ai]_5a159d06-b0c9-41a2-b86d-7b606275dc50-passport_size_photo.png"
          className={customStyles.profile}
        />
      </Grid>

      <Grid item className={customStyles.contact}>
        <Typography className={customStyles.paragraph}>
          Hi, I'm{" "}
          <Box
            component="span"
            sx={{
              fontSize: "21px",
              fontWeight: "600",
            }}
          >
            kuntolla pavan kumar
          </Box>
          . I'm a B.Tech student with a deep passion for software engineering
          and full stack development. I love creating innovative solutions and
          building applications that make a positive impact. Constantly striving
          to learn and grow in the tech world, I'm excited about the endless
          possibilities that lie ahead in my journey as a software engineer.
        </Typography>
        <Box
          sx={{
            alignText: "center",
            paddingTop: "24px",
            paddingBottom: "16px",
          }}
        >
          <Typography className={customStyles.subTitle}>
            Explore my profiles and stay up-to-date with my latest projects
          </Typography>
          {/* <Typography className={customStyles.subTitle}>
            Follow me on LinkedIn, Facebook, LeetCode, HackerRank, GitHub,
            Instagram and Twitter!
          </Typography> */}
        </Box>
        <Box display={"flex"} sx={{ justifyContent: "center" }}>
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default MyFooter;

{
  /* <Box sx={{ width: "100%" }}>
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
          </Box> */
}
