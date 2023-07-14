import React, {useState, useEffect} from 'react';
import NavbarHeader from './navbar';
import axios from 'axios';
import MySlider from './slider';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const HomePage = () => {

    const [favouriteItems,setFavouriteItems] = useState([]);
    const [latestItems, setLatestItems] = useState([]);
   
    const handleFetchProducts = () => {

        // const url = "https://dummyjson.com/products/";
        const url= "http://127.0.0.1:8000/api/v1/home/"
    
        axios({
          method: "GET",
          url,
          headers: {
            "Content-Type": "application/json"
    }})
          .then((res) => {
            const { status, data } = res;
            setFavouriteItems(data?.data["favourite_items"]);
            setLatestItems(data?.data["latest_products"]);
            console.log("data", data);
          })
          .catch((error) => {
            console.log("Error", error);
          });
      };
    
    const handleChange = () =>{
        handleFetchProducts();
    };

    useEffect(() => {
        handleFetchProducts();
      }, []);

    return (   
    <>
        <NavbarHeader/>
        <Container maxWidth="md">
          <Box>
            <h1>Latest Products</h1>
            <div style={{ marginBottom: '20px',marginLeft:'30px' }}>
                <MySlider products={latestItems} handleChange={handleChange} />
              </div>
            <h1>Wishlist</h1>
            <div style={{ marginBottom: '20px' ,marginLeft:'30px' }}>
                <MySlider products={favouriteItems} handleChange={handleChange} />
            </div>
          </Box>
        </Container>

    </>
    
    );
}
 
export default HomePage;


