import React, {useState, useEffect} from 'react';
import NavbarHeader from './navbar';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CartPage = () => {

    const [cartItems,setCartItems] = useState([]);

    const formattedPrice  = (price) =>{
     
    return (price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  }));
  }

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
            setCartItems(data?.data["cart_items"]);
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
                handleFetchProducts();
                console.log("data", data);
              })
              .catch((error) => {
                console.log("Error", error);
              });
          };
    
    const handleFavouriteClick = (title, is_favourite) => {
        const data={"title":title,"is_favourite": !is_favourite};
        handleEditProduct(data);
    };
    
    const handleAddToCartClick = (title, is_item_in_cart) => {
        const data={"title":title,"is_item_in_cart": !is_item_in_cart};
        handleEditProduct(data);
    };


    useEffect(() => {
        handleFetchProducts();
      }, []);

    return (   
    <>
        <NavbarHeader/>
        <h1>Cart</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
            {cartItems.map((product, id) => (
            <div className='main_block'>
                <div className="left_block" style={{ display: 'flex', width: '70%', maxHeight: '30vh' }}>
                    <div className='image_block' style={{ width: '40%', maxHeight: '100%', overflow: 'hidden' }}>
                        <img className="card-img-top" style={{ width: '100%', height: '100%' }} src={`https://${product.image_0}`} alt="Card image cap" />
                    </div>
                    <div className='details_block' style={{ width: '50%' }}>
                        <h6 className="word-wrap" style={{ overflow: "", textOverflow: "ellipsis", whiteSpace: "normal" }}>
                        {product.title}
                        </h6>
                    </div>


                    <div className='options_block' style={{display:'flex',marginRight:'20px'}}>
                        <div style={{marginRight:'20px'}}><span style={{fontWeight:'bold'}}>{formattedPrice(product.price)}</span></div>
                        <div style={{marginRight:'20px'}}><a onClick={()=>handleFavouriteClick(product.title, product.is_favourite)}>{product.is_favourite ? <FavoriteIcon color='primary' fontSize='large'/> : <FavoriteBorderIcon fontSize='large'/>}</a></div>
                        <div style={{marginRight:'20px'}}><a onClick={()=>handleAddToCartClick(product.title, product.is_item_in_cart)} style={{ marginRight: '1rem' }}><DeleteIcon fontSize='large'/></a></div>
                    </div>
                 </div>
                <div className="right_block" style={{display:'30%'}}>

                </div>
            </div>
            ))}
        </div>
    </>
        
    );
}
 
export default CartPage;