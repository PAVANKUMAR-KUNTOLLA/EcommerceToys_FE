import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import Page from "../../components/Page";
import ProductCard from "../../components/card";
import { Grid, Container, Typography } from "@mui/material";

import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
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
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/products/produtsSlice";
import { useParams, useNavigate } from "react-router-dom";
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
  accordionContent: {
    "&.MuiListItemText-primary": {
      fontWeight: "700",
    },
  },
}));

const ProductsPage = () => {
  const customStyles = useStyles();
  const params = useParams();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productFilters, updateProductFilters] = useImmer({
    category: params.category,
    character: null,
    price: null,
  });
  const [expanded, setExpanded] = useState(false);
  const [loadingSpin, setLoadingSpin] = useState(false);

  const categoryProducts = products.filter(
    (product) => product.category === params.category
  );

  const handleFetchProducts = () => {
    setLoadingSpin(true);
    privateApiGET(Api.products)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
          setLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoadingSpin(false);
      });
  };

  const handleFetchFilterProducts = (data) => {
    setLoadingSpin(true);
    let payload = data;
    privateApiPOST(Api.products, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setProducts(data?.data));
          setLoadingSpin(false);
          if ("category" in payload && params.payload != payload["category"]) {
            navigate(`/app/products/categories/${payload["category"]}`);
          }
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoadingSpin(false);
      });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCategoryFilterClick = (category) => {
    if (productFilters["category"] === category) {
      updateProductFilters((draft) => {
        draft.category = null;
      });
      handleFetchProducts();
      navigate("/app/products");
    } else {
      updateProductFilters((draft) => {
        draft.category = category;
      });
      let data = {
        category: category,
        // price: productFilters["price"],
        // character: productFilters["character"],
      };
      handleFetchFilterProducts(data);
    }
  };
  const handleCharacterFilterClick = (character) => {
    let data = {};
    if (productFilters["character"] === character) {
      updateProductFilters((draft) => {
        draft.character = null;
      });
      handleFetchProducts();
      navigate("/app/products");
    } else {
      updateProductFilters((draft) => {
        draft.character = character;
      });
      data = {
        // category: productFilters["category"],
        // price: productFilters["price"],
        character: character,
      };
      handleFetchFilterProducts(data);
    }
    navigate("/app/products");
  };
  const handlePriceFilterClick = (price) => {
    let data = {};
    if (productFilters["price"] === price) {
      updateProductFilters((draft) => {
        draft.price = null;
      });
      handleFetchProducts();
    } else {
      updateProductFilters((draft) => {
        draft.price = price;
      });
      data = {
        price: price,
        // category: productFilters["category"],
        // character: productFilters["character"],
      };
      handleFetchFilterProducts(data);
      navigate("/app/products");
    }
  };

  return (
    <Page title="products">
      <Container maxWidth="lg">
        <Typography variant="h1" alignItems="left" marginTop="36px">
          Products
        </Typography>
        <hr bordertop="2px solid black" fontWeight="bold"></hr>
      </Container>
      <Container maxWidth="lg" className={customStyles.mainBlock}>
        <Container className={customStyles.acordinBlock}>
          <Accordion
            expanded={expanded === "panel1a"}
            onChange={handleAccordionChange("panel1a")}
          >
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
                    <ListItemButton
                      onClick={() =>
                        handleCharacterFilterClick(item.toLowerCase())
                      }
                    >
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2a"}
            onChange={handleAccordionChange("panel2a")}
          >
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
                    <ListItemButton
                      onClick={() =>
                        handleCategoryFilterClick(item.toLowerCase())
                      }
                    >
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3a"}
            onChange={handleAccordionChange("panel3a")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>PRICE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {priceRangesList.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handlePriceFilterClick(item)}
                    >
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Container>
        <Container maxWidth="md" className={customStyles.container}>
          {params.category && products.length > 0 && !loadingSpin ? (
            <Grid container spacing={2} mt={2}>
              {categoryProducts.map((product, id) => {
                return (
                  <Grid item key={id} xs={6} md={4}>
                    <ProductCard key={id} product={product} />
                  </Grid>
                );
              })}
            </Grid>
          ) : !params.category && products.length > 0 && !loadingSpin ? (
            <Grid container spacing={2} mt={2}>
              {products.map((product, id) => {
                return (
                  <Grid item key={id} xs={6} md={4}>
                    <ProductCard key={id} product={product} />
                  </Grid>
                );
              })}
            </Grid>
          ) : null}
        </Container>
      </Container>
    </Page>
  );
};

export default ProductsPage;
