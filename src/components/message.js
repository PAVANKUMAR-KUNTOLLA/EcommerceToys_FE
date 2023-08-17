import * as React from "react";
import { Alert, Link } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function Message() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="info">
        Your cart is empty.{" "}
        <Link onClick={() => navigate("/app/products")}>View Products</Link>
      </Alert>
      {/* <Alert severity="warning">This is a warning alert — check it out!</Alert> */}
      {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
    </Stack>
  );
}
