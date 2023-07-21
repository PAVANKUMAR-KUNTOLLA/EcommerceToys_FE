import React, { Component } from 'react';
import { makeStyles } from "@mui/styles";
import { Container, Box, Typography, TextField, Button,Grid, Avatar } from '@mui/material';

export const footercardStyles = makeStyles((theme) => ({
    MainBlock: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'gray',
        marginTop: '20px',
        [theme.breakpoints.down("sm")]:{
            height:'30vh'
        },
      },
      Subscribe: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      Fields: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        marginLeft:'20px',
        marginRight:'20px',
        
      },
      subscribeButton:{
        display:'flex',
        flexDirection:'row',
        [theme.breakpoints.down("sm")]: {
            flexDirection:'column'
          },
      },
      ProfileBlock:{
        width:'100%',
        height:'60vh',
        
      },
      ProfilePic:{
        width:'50%',
        height:'60vh',
        objectFit:'cover',
      }
}));

const MyFooter = () => {
  const customStyles = footercardStyles();
  return (
      <>
      <Container className={customStyles.MainBlock}>
          <Container>
            <Grid maxWidth="md" className={customStyles.Subscribe}>
              <Typography variant="h2" className={customStyles.Fields}>
                SUBSCRIBE
              </Typography>
              <Typography variant="h4" className={customStyles.Fields}>
                Sign up to get the latest on sales, new releases and more...
              </Typography>
              <Box  className={customStyles.subscribeButton}>
                <TextField
                  name="globalSearch"
                  placeholder="Enter your email address..."
                  className={customStyles.Fields}
                />
                <Button variant="contained"  className={customStyles.Fields}>SIGN UP</Button>
              </Box>
            </Grid>
          </Container>
          <Container className={customStyles.ProfileBlock}>
              <Grid>
              <Avatar
                  variant="square"
                  src='/static/img/PASSPORT_SIZE_PHOTO.JPG'
                  alt="profile_pic"
                  className={customStyles.ProfilePic}
                />
              </Grid>
          </Container>
      </Container>
    </>
  );
};

export default MyFooter;
