import React, {useState, useEffect} from 'react';
import NavbarHeader from './navbar';
import Card from './card';
import axios from 'axios';

const HomePage = () => {

    const [favouriteItems,setFavouriteItems] = useState([]);
    const [latestItems, setLatestItems] = useState([]);
    const [current, setCurrent] = useState({"start":0, "end":3});

    const displayFavouriteItems = latestItems.filter((item, id)=> id>=current.start && id<=current.end)
    const handlePrevClick = () => {
        if (current.start >0){
        setCurrent({"start":current.start-1, "end":current.end-1})
        }
    };
    const handleNextClick = () => {
        if (current.end <latestItems.length-1){
        setCurrent({"start":current.start+1, "end":current.end+1})
        }
    };
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
        <h1>Latest Products</h1>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active"  style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
            {displayFavouriteItems.map((product, id) => (
            <Card key={id} product={product} handleChange={handleChange} style={{ maxWidth: "100%", marginRight: "10px" }}/>
            ))}
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" onClick={handlePrevClick}>
            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: 'black', color: 'white' }}></span>
            <span className="sr-only"></span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" onClick={handleNextClick}>
            <span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: 'black', color: 'white' }}></span>
            <span className="sr-only"></span>
          </a>
        </div>
       
        <h1>Wishlist</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
            {favouriteItems.map((product, id) => (
            <Card key={id} product={product} handleChange={handleChange} style={{ maxWidth: "100%", marginRight: "10px" }}/>
            ))}
        </div>
    </>
        
    );
}
 
export default HomePage;