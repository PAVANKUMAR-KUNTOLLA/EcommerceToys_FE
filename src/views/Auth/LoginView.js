import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Avatar,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import CustomAlert from "../../components/CustomAlert";

import * as Yup from "yup";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import Api from "../../components/Api";
import Page from "../../components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    position: "relative",
  },

  logo: {
    width: 150,
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      width: 110,
    },
  },
  submitProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordState, setForgetPasswordState] = useState({ email: "" });
  const [isResetPasswordSubmitting, setIsRestPasswordSubmitting] =
    useState(false);

  const handleForgotPassword = () => {
    const url = Api.forgotPassword;
    setIsRestPasswordSubmitting(true);
    const config = {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    axios
      .post(url, forgotPasswordState, config)
      .then((res) => {
        setShowAlert({
          isAlert: true,
          alertText: res.data["message"],
          severity: "success",
        });
        setIsForgotPassword(false);
        setIsRestPasswordSubmitting(false);
        setForgetPasswordState({ email: "" });
      })
      .catch((error) => {
        console.log(error.response);
        setShowAlert({
          isAlert: true,
          alertText: error.response.data["message"],
          severity: "error",
          alertTitle: "Error",
        });
        setIsForgotPassword(false);
        setIsRestPasswordSubmitting(false);
        setForgetPasswordState({ email: "" });
      });
  };

  return (
    <>
      <Page className={classes.root} title="Login">
        {showAlert.isAlert ? (
          <CustomAlert
            open={showAlert.isAlert}
            severity={showAlert.severity}
            alertTitle={showAlert.alertTitle}
            alertText={showAlert.alertText}
            onClose={() =>
              setShowAlert({
                isAlert: false,
                alertTitle: "",
                alertText: "",
                severity: "",
              })
            }
          />
        ) : null}
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom={2}
            >
              {/* We can place our logo here */}
            </Box>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const url = Api.login;

                const config = {
                  headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                  },
                };

                axios
                  .post(url, values, config)
                  .then((res) => {
                    if (res.status === 200) {
                      window.localStorage.setItem(
                        "token",
                        res.data?.data?.token
                      );
                      setSubmitting(false);
                      navigate("/");
                    }
                  })
                  .catch((error) => {
                    if (error.response.status === 400) {
                      setShowAlert({
                        isAlert: true,
                        alertText: "Invalid credentials",
                        severity: "error",
                        alertTitle: "Error",
                      });
                      setSubmitting(false);
                    } else {
                      setShowAlert({
                        isAlert: true,
                        alertText: "Something went wrong",
                        severity: "error",
                        alertTitle: "Error",
                      });
                      resetForm();
                      setSubmitting(false);
                    }
                  });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography color="textPrimary" variant="h2">
                      Sign in
                    </Typography>
                  </Box>

                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                  {/* <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography> */}
                  <Box display="flex" justifyContent="space-between">
                    <Typography color="textSecondary" variant="body1" right={0}>
                      <Link
                        onClick={() => setIsForgotPassword(true)}
                        color="primary"
                        variant="h6"
                      >
                        Forgot Password?
                      </Link>
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      Don&apos;t have an account?{" "}
                      <Link component={RouterLink} to="/register" variant="h6">
                        Sign up
                      </Link>
                    </Typography>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>

      <Dialog
        open={isForgotPassword}
        onClose={() => setIsForgotPassword(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Forgot Password?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address to reset password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            autoComplete="off"
            value={forgotPasswordState.email}
            onChange={(e) => setForgetPasswordState({ email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsForgotPassword(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleForgotPassword}
            color="primary"
            disabled={isResetPasswordSubmitting}
          >
            Reset Password
            {isResetPasswordSubmitting && (
              <CircularProgress size={24} className={classes.submitProgress} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginView;
