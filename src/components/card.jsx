import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Card = ({product, handleChange}) => {

  const formattedPrice  = (price) =>{
     
    return (price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  }));
  }

  const handleEditProduct = (data) => {

    // const url = "https://dummyjson.com/products/";
    const url= "http://127.0.0.1:8000/api/v1/edit_product/"

    axios({
      data:data,
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json"
    }})
          .then((res) => {
            const { status, data } = res;
            {handleChange &&
              handleChange();
            }
            console.log("data", data);
          })
          .catch((error) => {
            console.log("Error", error);
          });
      };

    const handleFavouriteClick = () => {
        const data={"title":product.title,"is_favourite": !product.is_favourite};
        handleEditProduct(data);
    };

  return (

        <div className="card" style={{width: "20rem", margin: "0 10px 20px", marginBottom: "20px"}}>
        <Link to="/productview" state={{title: product.title}}>
          <img className="card-img-top" src={`https://${product.image_0}`} alt="Card image cap"/>
        </Link>
        <div className="card-body" style={{height: "100px"}}>
          <h6 className="card-title" style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{product.title}</h6>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <span className="btn btn-primary">{formattedPrice(product.price)}</span>
            <a onClick={handleFavouriteClick}>{product.is_favourite ? <FavoriteIcon color='primary' fontSize='large'/> : <FavoriteBorderIcon fontSize='large'/>}</a>
          </div>
        </div>
        <style>
          {`
            @media (max-width: 767px) {
              .card {
                width: 100%;
                margin: 0 0 20px;
              }
            }
          `}
        </style>
      </div>
      
    
  );
};

export default Card;