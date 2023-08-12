import React from "react";
import {
  Grid,
  Button,
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  CircularProgress,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  Alert,
  AlertTitle,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { thousands_separators } from "../../utils/index";
import { useSelector } from "react-redux";

const customTextStyles = makeStyles((theme) => ({
  dialogBox: {
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "20px 20px 0px 0px",
      border: "1px solid rgba(151,151,151, 1)",
      boxShadow: "0px -3px 8px rgba(0,0,0, 0.1)",
    },
  },
  quantityRow: {
    margin: "32px auto 50px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "left",
    maxWidth: "230px",
    [theme.breakpoints.down("sm")]: {
      margin: "24px 20px 40px",
    },
  },
  boldText: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "24px",
    marginBottom: "7px",
  },
  normalText: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "22px",
  },
  mainText: {
    opacity: 1,
    color: "rgba(71,71,71,1)",
    fontSize: "24px",
    fontWeight: "400",
    textAlign: "center",
    lineHeight: "33px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "27px",
      marginLeft: "8px",
      marginRight: "7px",
    },
  },
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "97.5%",
    top: "-4%",
    color: theme.palette.grey[800],
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down("sm")]: {
      left: "93%",
      top: "-5%",
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  confirmButton: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "24px",
    padding: "10px 40px 9px",
    marginBottom: "4px",
    opacity: 0.8,
  },
}));

const ConfirmationDialogBox = ({
  type,
  open,
  handleClose,
  handleConfirm,
  isLoadingSpin,
  productId,
}) => {
  const customTextClasses = customTextStyles();
  const products = useSelector((state) => state.products.products);
  const currProduct = products.find((product) => product.id === productId);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      classes={{ paper: customTextClasses.paper }}
      className={customTextClasses.dialogBox}
    >
      <DialogTitle id="scroll-dialog-title"></DialogTitle>
      <DialogContent dividers={false}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={customTextClasses.customizedButton}
        >
          <CloseIcon />
        </IconButton>
        {type === "placeOrder" ? (
          <Box>
            <Box sx={{ margin: { xs: "0", sm: "16px 152px 32px" } }}>
              <Typography className={customTextClasses.mainText}>
                Confirm Investment in SGB Scheme 2021-22 Series IV
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            <Avatar
              variant="square"
              alt={currProduct.title}
              src={`https://${currProduct.image_0}`}
              sx={{
                height: 180,
                width: 130,
                position: "relative",
                margin: "8px auto",
              }}
            />

            <Typography className={customTextClasses.boldText}>
              {currProduct.title}
            </Typography>
            <Typography className={customTextClasses.normalText}>
              Are you sure you want to delete the item from your cart?
            </Typography>

            <Button
              sx={{
                display: "block",
                margin: "16px auto",
              }}
              disabled={isLoadingSpin}
              variant="contained"
              color="primary"
              className={customTextClasses.confirmButton}
              onClick={() => {
                let data = {
                  id: currProduct.id,
                  title: currProduct.id,
                  quantity: 0,
                  is_item_in_cart: false,
                  is_favourite: false,
                };
                handleConfirm(data);
              }}
            >
              Yes
              {isLoadingSpin && (
                <CircularProgress
                  size={15}
                  color="primary"
                  sx={{ marginLeft: "15px" }}
                />
              )}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialogBox;
