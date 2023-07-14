import React, { useState, useEffect } from 'react';
import NavbarHeader from './navbar';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Message from './message';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const formattedPrice = (price) => {
    return price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
  };

  const handleFetchProducts = () => {
    const url = 'http://127.0.0.1:8000/api/v1/home/';

    axios({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const { status, data } = res;
        setCartItems(data?.data['cart_items']);
        console.log('data', data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const handleEditProduct = (data) => {
    const url = 'http://127.0.0.1:8000/api/v1/edit_product/';

    axios({
      data: data,
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const { status, data } = res;
        handleFetchProducts();
        console.log('data', data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const handleFavouriteClick = (title, is_favourite) => {
    const data = { title: title, is_favourite: !is_favourite };
    handleEditProduct(data);
  };

  const handleAddToCartClick = (title, is_item_in_cart) => {
    const data = { title: title, is_item_in_cart: !is_item_in_cart,"quantity":0 };
    handleEditProduct(data);
  };

  const handleQuantityChange = (title, quantity) => {
    const data = { title: title, quantity: quantity };
    handleEditProduct(data);
  };


  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <>
      <NavbarHeader />
      <Row >
  <Col xs={12}  md={8} >
    <h1 style={{ marginBottom: '10px' }}>Shopping Cart</h1>
    {cartItems.length === 0 ? (
      <Message variant="info">
        Your cart is empty. <Link to="/">Go Back</Link>
      </Message>
    ) : (
      <ListGroup variant="flush">
        {cartItems.map((product, id) => (
          <ListGroup.Item key={id}>
            <Row>
              <Col xs={3} md={3}>
                <Link to="/productview" state={{ title: product.title }}>
                  <Image src={`https://${product.image_0}`} alt={product.title} fluid rounded />
                </Link>
              </Col>

              <Col xs={3} md={3}>
                <a>{product.title}</a>
              </Col>

              <Col xs={2} md={2} sx={{marginLeft:'10px',marignRight:'10px'}}>{formattedPrice(product.price)}</Col>

              <Col xs={2}  md={2}>
                  <div className="form-outline">
                    <input
                      type="number"
                      id={`quantity-${id}`}
                      className="form-control"
                      value={product.quantity}
                      min={1}
                      onChange={(e) =>
                        handleQuantityChange(product.title, Number(e.target.value))
                      }
                    />
                  </div>
              </Col>

              <Col xs={2} md={1} style={{ marginTop: '-5px' }}>
                <Button
                  variant="light"
                  onClick={() => handleAddToCartClick(product.title, product.is_item_in_cart)}
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                >
                  {product.is_item_in_cart ? (
                    <DeleteIcon fontSize='large' />
                  ) : null}
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
  </Col>
  <Col  md={3}  >
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
          </h2>
          ₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
        </ListGroup.Item>
      </ListGroup>

      <ListGroup.Item>
        <Button type="button" className="w-100" disabled={cartItems.length === 0}>
          Proceed To Checkout
        </Button>
      </ListGroup.Item>
    </Card>
  </Col>
</Row>

    </>
  );
};

export default CartPage;


 {/* <Col xs={1} md={1}>
                <Button
                  variant="light"
                  onClick={() => handleFavouriteClick(product.title, product.is_favourite)}
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                >
                   {product.is_favourite ? (
                      <FavoriteIcon color="primary" fontSize='large'/>
                    ) : (
                      <FavoriteBorderIcon fontSize='large' />
                    )}
                </Button>
              </Col> */}
