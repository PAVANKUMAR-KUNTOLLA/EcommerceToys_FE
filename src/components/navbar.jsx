import React, { useState } from 'react';
import img from '../static/img/SHTS_Logo_Edited_410x.avif';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const options = ["Home", "Products", "Wishlist", "Cart", "Profile"];

const NavbarHeader = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img className="navbar-brand" src={img} alt='' style={{ width: "100px", marginRight: "10px", margin: "0 0" }} />
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            {options.map((option, index) => (
              <a className="nav-link" href={"/" + option.toLowerCase()} key={index} style={{ marginLeft: '10px', marginRight: '10px' }}>
                <h6>{option === "Cart" ? <ShoppingCartIcon /> : null}{option}</h6>
              </a>
            ))}
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleSidebar}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Sidebar */}
      <Drawer anchor="right" open={showSidebar} onClose={toggleSidebar}>
        <List>
          {options.map((option, index) => (
            <ListItem button key={index}>
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
}

export default NavbarHeader;
