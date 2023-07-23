import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FolderIcon from "@mui/icons-material/Folder";

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

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isfullwidth",
})(({ theme, open, isfullwidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: isfullwidth ? "100%" : `calc(100% - ${drawerWidth}px)`,
    marginLeft: isfullwidth ? 0 : `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ handleChange }) {
  const theme = useTheme();
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [newSearchQuery, setNewSearchQuery] = useState("");
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const isSearchOn = useSelector((state) => state.products.isSearchOn);
  const isLoadingSpin = useSelector((state) => state.products.isSearchLoading);
  const [isfullwidth, setisfullwidth] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setisfullwidth(true);
  };

  const handleLinkClick = (option) => {
    navigate("/app/" + option.toLowerCase());
  };

  const [value, setValue] = React.useState("recents");

  const handleNavigationClick = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancelClick = () => {
    setIsSearchOpen(false);
    setisfullwidth(false);
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

  const handleOutsideClick = (e) => {
    if (
      open &&
      e.target.closest("#persistent-drawer") === null &&
      !e.target.closest("#menu-icon")
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} isfullwidth={isfullwidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {isSearchOpen ? (
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <TextField
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
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="inherit" onClick={handleCancelClick}>
                        <CancelIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    newSearchQuery && handleFetchSearchProducts();
                  }
                }}
              />
            </Box>
          ) : (
            <>
              <Typography variant="h3" noWrap component="div">
                Logo
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="inherit"
                  aria-label="search"
                  onClick={handleSearchClick}
                  sx={{ mx: 0.5 }}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  sx={{ mx: 0.5 }}
                  onClick={() => handleLinkClick("favourites")}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  sx={{ mx: 0.5 }}
                  onClick={() => handleLinkClick("cart")}
                >
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  sx={{ mx: 0.5 }}
                  onClick={() => handleLinkClick("profile")}
                >
                  <PersonIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Products", "Favourites", "Cart"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => handleLinkClick(text)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Statue", "T-shirt", "Action-Figures"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

// import * as React from 'react';

// export default function SimpleBottomNavigation() {

//   return (
//     <Box sx={{ width: 500 }}>
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
//         <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
//         <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
//       </BottomNavigation>
//     </Box>
//   );
// }
