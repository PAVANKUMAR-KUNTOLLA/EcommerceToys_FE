import React, {useState, useEffect} from 'react';
import NavbarHeader from './navbar';
import Card from './card';
import axios from 'axios';

const WishListPage = () => {

    const [favouriteItems,setFavouriteItems] = useState([]);

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
        <h1>Wishlist</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
            {favouriteItems.map((product, id) => (
            <Card key={id} product={product} handleChange={handleChange} style={{ maxWidth: "100%", marginRight: "10px" }}/>
            ))}
        </div>
    </>
        
    );
}
 
export default WishListPage;