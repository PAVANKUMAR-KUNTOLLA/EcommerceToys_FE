import { AppBar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/AppBar';
import MyFooter from '../components/footer';

const AppLayout = () => {
    return ( 
    <>
        <ResponsiveAppBar/>
        <Outlet/>
    </>
     );
}
 
export default AppLayout;
