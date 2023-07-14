import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavbarHeader from './navbar';

const ProductItemView = () => {
  const location = useLocation();
  const title = location.state?.title;
  const [currProduct, setCurrProduct] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {

    setCurrentSlide((prevSlide) => (prevSlide - 1 + 15) % 15);
    console.log(currentSlide);
  };

  const handleNext = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1 +  15) % 15);
      console.log(currentSlide);
  };

  const handleSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleFetchProduct = (data) => {

    // const url = "https://dummyjson.com/products/";
    const url= "http://127.0.0.1:8000/api/v1/products/"

    axios({
      data:data,
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json"
    }})
          .then((res) => {
            const { status, data } = res;
            setCurrProduct(data?.data);
            console.log("data", data);
          })
          .catch((error) => {
            console.log("Error", error);
          });
      };

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
                setCurrProduct(data?.data);
                console.log("data", data);
              })
              .catch((error) => {
                console.log("Error", error);
              });
          };
    
    const handleFavouriteClick = () => {
        const data={"title":currProduct.title,"is_favourite": !currProduct.is_favourite};
        handleEditProduct(data);
    };
    
    const handleAddToCartClick = () => {
        const data={"title":currProduct.title,"is_item_in_cart": !currProduct.is_item_in_cart,"quantity":currProduct.quantity+1};

        handleEditProduct(data);
    };

    useEffect(() => {
        handleFetchProduct({"title":title});
      }, []);


  return (
    <>
     <NavbarHeader />
    <div style={{marginTop:"10px"}}>

    <h3 style={{ textAlign: 'center' }}>{currProduct["title"]}</h3>
  
    <div className="main_block">
      <div className="left_block" style={{marginRight:'20px'}}>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={`https://${currProduct[`image_${currentSlide}`]}`}
                alt={`Slide ${currentSlide + 1}`}
              />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" onClick={handlePrev}>
            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: 'black', color: 'white' }}></span>
            <span className="sr-only"></span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" onClick={handleNext}>
            <span className="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: 'black', color: 'white' }}></span>
            <span className="sr-only"></span>
          </a>
        </div>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            width: '100%',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollbarColor: 'transparent transparent',
          }}
        >
          {Array.from(Array(15).keys()).map((index) => (
            <img
              key={index}
              className={`reference-image ${index === currentSlide ? 'active' : ''}`}
              src={`https://${currProduct[`image_${index}`]}`}
              alt={`Reference ${index + 1}`}
              onClick={() => handleSlide(index)}
              style={{ width: '100px', marginRight: '10px' }}
            />
          ))}
        </div>
      </div>
      <div className="right_block" style={{ marginTop: '50x' }}>
        <div >
          {currProduct && currProduct["price"] && (
            <span style={{fontWeight:"bold"}}>Price: {currProduct["price"].toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
          )}
          <div style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <button type="button" className={currProduct.is_favourite ? "btn btn-outline-primary" : "btn btn-outline-secondary" } onClick={handleFavouriteClick} style={{ marginRight: '1rem' }}>
              ADD TO FAV
            </button>
            <button type="button" className={currProduct.is_item_in_cart ? "btn btn-outline-primary" : "btn btn-outline-secondary" } onClick={handleAddToCartClick} style={{ marginRight: '1rem' }}>
              ADD TO CART
            </button>
          </div>
          {currProduct && currProduct["description"] && (
            <div style={{ marginTop: '1rem' }}>
              {currProduct["description"].split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  
    <style jsx>{`
      .main_block {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      .left_block {
        width: 40vw;
        margin-left: 10vw;
        margin-top: 1rem;
      }
  
      .right_block {
        width: 40vw;
        margin-right: 10vw;
        margin-top: 1rem;
      }
  
      .reference-image {
        width: 100px;
        margin-right: 10px;
      }
  
      @media (max-width: 768px) {
        .main_block {
          flex-direction: column;
          align-items: center;
        }
  
        .left_block,
        .right_block {
          width: 90vw;
          margin-left: 5vw;
          margin-right: 5vw;
          margin-bottom: 1rem;
        }
  
        .reference-image {
          width: 140px;
          margin-right: 5px;
        }
      }
    `}</style>
  </div>
  
  </>
  );
};

export default ProductItemView;
