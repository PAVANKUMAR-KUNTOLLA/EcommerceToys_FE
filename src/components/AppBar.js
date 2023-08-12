import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import PersistentDrawerLeft from "./sidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { privateApiGET, privateApiPOST } from "./PrivateRoute";
import Api from "./Api";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  setSearch,
  setSearchQuery,
  setLoadingSpin,
} from "../redux/products/produtsSlice";
import { Avatar } from "@mui/material";
import { customCardStyles } from "./categoryCard";

const pages = ["products", "cart", "favourites"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const globalUseStyles = makeStyles((theme) => ({
  inputLg: {
    "& input": {
      padding: "20px",
      fontSize: "18px",
      lineHeight: "27px",
    },
  },
  globalSearch: {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "30px",
    marginRight: "10px",
    paddingRight: 0,
    width: 300,
  },
  searchIcon: {
    color: "rgba(52, 49, 76, 0.7)",
  },
}));

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  typography: {
    marginLeft: theme.spacing(1),
    color: "#ffffff",
  },
}));

const ResponsiveAppBar = () => {
  const [newSearchQuery, setNewSearchQuery] = useState("");
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const customStyles = globalUseStyles();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSearchOn = useSelector((state) => state.products.isSearchOn);

  const handleNavMenu = (value) => {
    let path = value;
    navigate(path);
  };

  const handleCancelClick = () => {
    setNewSearchQuery("");
    dispatch(setSearchQuery(""));
    dispatch(setSearch(false));
    dispatch(setLoadingSpin(true));
    // Optionally, you can clear the search results by calling the handleChange function with an empty query.
    if (params.category) {
      let payload = { category: params.category };
      privateApiPOST(Api.products, payload)
        .then((response) => {
          const { status, data } = response;
          if (status === 200) {
            console.log("data", data);
            dispatch(setProducts(data?.data));
            dispatch(setLoadingSpin(false));
          }
        })
        .catch((error) => {
          console.log("Error", error);
          dispatch(setLoadingSpin(false));
        });
    } else {
      privateApiGET(Api.products)
        .then((response) => {
          const { status, data } = response;
          if (status === 200) {
            console.log("data", data);
            dispatch(setProducts(data?.data));

            dispatch(setLoadingSpin(false));
          }
        })
        .catch((error) => {
          console.log("Error", error);
          dispatch(setLoadingSpin(false));
        });
    }
  };

  const handleFetchSearchProducts = () => {
    dispatch(setLoadingSpin(true));
    dispatch(setSearch(true));
    dispatch(setSearchQuery(newSearchQuery));
    let payload = { search: newSearchQuery };
    privateApiPOST(Api.products, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
          dispatch(setLoadingSpin(false));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setLoadingSpin(false));
      });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "dodgerblue" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            src="/static/img/super-heros-logo.png"
            sx={{
              height: "60px",
              width: "250px",
            }}
          />
          {isMobile && <PersistentDrawerLeft />}
          {!isMobile && (
            <>
              <Box
                maxWidth="sm"
                sx={{
                  display: "flex",
                  alignSelf: "end",
                  marginLeft: "auto",
                  marginRight: "0px",
                }}
              >
                <TextField
                  className={customStyles.globalSearch}
                  name="globalSearch"
                  value={newSearchQuery}
                  placeholder="Search here"
                  onChange={(e) => {
                    setNewSearchQuery(e.target.value);
                    if (!e.target.value && isSearchOn) {
                      handleCancelClick();
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className={customStyles.searchIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchQuery && (
                          <IconButton
                            color="inherit"
                            onClick={handleCancelClick}
                          >
                            <CancelIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      newSearchQuery && handleFetchSearchProducts();
                    }
                  }}
                />

                {[
                  { icon: <HomeIcon />, label: "Home" },
                  { icon: <FavoriteIcon />, label: "Favourites" },
                  { icon: <ShoppingCartIcon />, label: "Cart" },
                  { icon: <AccountCircleIcon />, label: "Profile" },
                ].map((option, index) => (
                  <Button
                    key={index}
                    className={classes.button}
                    onClick={() => handleNavMenu(option.label.toLowerCase())}
                  >
                    {option.icon}
                    <Typography variant="body2" className={classes.typography}>
                      {option.label}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
