import React, { useEffect, useState, useRef } from "react";

// Material UI
import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { makeStyles } from "@mui/styles";
import { thousands_separators } from "../utils/index";


const customTextStyles = makeStyles((theme) => ({
  normalText: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "23px",
    opacity: 0.7,
  },
  normalText2: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "26px",
    opacity: 0.7,
  },
  normalTextBold: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "23px",
  },
  mainText: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "23px",
  },
  mainTextBold: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "23px",
  },
  dataGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // [theme.breakpoints.down("sm")]: {
    //   margin: "8px 0 0 0",
    // },
  },
  dataGridRow: {
    // [theme.breakpoints.down("sm")]: {
    //   padding: "0",
    //   marginTop: "16px",
    //   width: "25%",
    // },
  },
}));

const ViewOrderPage = ({ quantity, handleQuantityChange }) => {
  const customTextClasses = customTextStyles();

  return (
    <Box
      sx={{
        borderRadius: "4px",
        boxShadow: "0 1px 6px rgba(0,0,0, 0.095389)",
        backgroundColor: "rgba(255,255,255, 1)",
        padding: "20px 20px 16px 24px",
      }}
    >
      <Box className={customTextClasses.dataGrid}>
        <Box className={customTextClasses.dataGridRow}>
          <Typography className={customTextClasses.normalText}>
            Tranche Name
          </Typography>
          <Typography mt={1} className={customTextClasses.mainText}>
            Sovereign Gold Bond Scheme 2021-22 Series IV{" "}
          </Typography>
        </Box>
        <Box className={customTextClasses.dataGridRow}>
          <Typography className={customTextClasses.normalText}>
            Price
          </Typography>
          <Typography mt={1} className={customTextClasses.mainText}>
            4,123
          </Typography>
        </Box>
        <Box className={customTextClasses.dataGridRow}>
          <Typography className={customTextClasses.normalTextBold}>
            Select Qty (In grams)
          </Typography>
          <Box component="span" mt={1}>
            <TextField
              type="number"
              placeholder={"Enter Qty"}
              variant="filled"
              value={quantity}
              onChange={(e) => {
                handleQuantityChange(e.target.value);
              }}
              size="small"
              sx={{
                borderRadius: "2px",
                color: "#F5F5F5",
              }}
            />
          </Box>
        </Box>

        <Box
          className={customTextClasses.dataGridRow}
          sx={{ visibility: quantity > 0 ? "none" : "hidden" }}
        >
          <Typography className={customTextClasses.normalText}>
            Amount
          </Typography>
          <Typography mt={1} className={customTextClasses.mainText}>
            {thousands_separators(quantity * 4123)}
          </Typography>
        </Box>
        <Box
          className={customTextClasses.dataGridRow}
          // sx={{ visibility: quantity > 0 ? "none" : "hidden" }}
        >
          <EditIcon color="secondary" size="large" />
          <DeleteIcon color="secondary" size="large" />
        </Box>
      </Box>
      <Box>
        <Typography className={customTextClasses.normalText2}>
          Issue opens: 12 July 2021
        </Typography>
        <Typography className={customTextClasses.normalText2}>
          Issue closes: 16 July 2021
        </Typography>
        <Typography className={customTextClasses.normalText2}>
          Date of Issuance: 20 July 2021
        </Typography>
      </Box>
    </Box>
  );
};

export default ViewOrderPage;