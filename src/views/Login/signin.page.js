import React from 'react';
import { Box, Typography, Button,Container,TextField } from "@mui/material";
import Page from '../../components/Page';
import { makeStyles } from "@mui/styles";

export const customSignInStyle = makeStyles((theme) => ({
    mainBlock:{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        [theme.breakpoints.down("sm")]: {
            maxWidth: theme.breakpoints.values.sm,
            },

    },
}));


const SignInPage = () => {

    const customStyles = customSignInStyle();

    return ( 

        <Page title="signin">
            <Container maxWidth="xs" className={customStyles.mainBlock}>
                <form >
                    <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    />
                    <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    />
                    <Button variant="contained" type="submit" color="primary">
                    Sign In
                    </Button>
                </form>
            </Container>

    </Page>
    );
}
 
export default SignInPage;
