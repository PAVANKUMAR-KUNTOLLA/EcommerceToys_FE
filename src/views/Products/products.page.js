import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import axios from "axios";
import ProductCard from "../../components/card";
import { useLocation } from "react-router-dom";
import Categories from "../../components/categories";
import { Grid, Container, Typography } from "@mui/material";

import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";

import { makeStyles } from "@mui/styles";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  charactersList,
  categoriesList,
  priceRangesList,
} from "../../constants/index";

export const useStyles = makeStyles((theme) => ({
  mainBlock: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  acordinBlock: {
    width: "30%",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const ProductsPage = () => {
  const customStyles = useStyles();
  const [items, setItems] = useState([]);
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState([
    location.state?.category,
  ]);

  const filteredItems =
    selectedCategory.length > 0
      ? items.filter((item) => selectedCategory.includes(item.category))
      : items;

  const handleFetchProducts = () => {
    privateApiGET(Api.products)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setItems(data?.data["products"]);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleChange = () => {
    handleFetchProducts();
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    if (selectedCategory.includes(category)) {
      let categories = selectedCategory.filter((each) => each !== category);
      setSelectedCategory(categories);
    } else {
      setSelectedCategory((prev) => [...prev, category]);
    }
  };

  return (
    <Page title="products">
      {/* <NavbarHeader /> */}
      <Categories
        items={items}
        onItemClick={handleCategoryClick}
        isActive={selectedCategory}
      />
      <Container maxWidth="lg">
        <Typography variant="h1" alignItems="left" marginTop="50px">
          Products
        </Typography>
        <hr bordertop="2px solid black" fontWeight="bold"></hr>
      </Container>
      <Container maxWidth="lg" className={customStyles.mainBlock}>
        <Container className={customStyles.acordinBlock}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>CHARACTER</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {charactersList.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>CATEGORY</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {categoriesList.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>PRICE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {priceRangesList.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion disabled>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Disabled Accordion</Typography>
            </AccordionSummary>
          </Accordion>
        </Container>
        <Container maxWidth="md" className={customStyles.container}>
          <Grid container spacing={2} mt={2}>
            {filteredItems &&
              filteredItems.map((product, id) => {
                return (
                  <Grid item key={id} xs={6} md={4}>
                    <ProductCard
                      key={id}
                      product={product}
                      handleChange={handleChange}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </Container>
    </Page>
  );
};

export default ProductsPage;
