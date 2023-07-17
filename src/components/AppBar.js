import * as React from "react";
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

const ResponsiveAppBar = ({ handleChange }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const globalClasses = globalUseStyles();
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNavMenu = (value) => {
    let path = `/app/${value}`;
    navigate(path);
  };

  const handleCancelClick = () => {
    setSearchQuery("");
    handleChange(""); // Optionally, you can clear the search results by calling the handleChange function with an empty query.
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile && <PersistentDrawerLeft handleChange={handleChange} />}
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
                  className={globalClasses.globalSearch}
                  name="globalSearch"
                  value={searchQuery}
                  placeholder="Search here"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className={globalClasses.searchIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchQuery &&
                          <IconButton
                            color="inherit"
                            onClick={handleCancelClick}
                          >
                            <CancelIcon />
                          </IconButton>}
                      </InputAdornment>
                    ),
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleChange(searchQuery);
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
                    <Typography
                      variant="body2"
                      className={classes.typography}
                    >
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
