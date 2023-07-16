import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function Message() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        Your cart is empty. <Link to="/">Go Back</Link>
      </Alert>
      {/* <Alert severity="warning">This is a warning alert — check it out!</Alert> */}
      {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
    </Stack>
  );
}
