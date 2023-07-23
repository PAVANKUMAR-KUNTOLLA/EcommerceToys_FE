import { AppBar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/AppBar";
import MobileNavFooterPage from "./MobileNavFooter";

const AppLayout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
      {/* <MobileNavFooterPage /> */}
    </>
  );
};

export default AppLayout;
