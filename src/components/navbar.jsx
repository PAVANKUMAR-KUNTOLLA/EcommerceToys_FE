import React from 'react';
import img from '../static/img/SHTS_Logo_Edited_410x.avif';

const options = ["Products", "Wishlist","Cart", "Profile"];

const NavbarHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <img className="navbar-brand" src={img} alt='' style={{ width: "100px", marginRight: "10px",margin:"0 0" }} />
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup"  >
            <div className="navbar-nav" style={{ position: 'absolute', top: '10px', right: '10px'}}>
                {options.map((option) => (
                    <a className={"nav-link" } href={"/"+option} key={option} style={{marginLeft:'10px',marginRight:'10px'}}><h6>{option}</h6></a>
                ))}
            </div>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>
            </div>
        </nav>
    );
}
 
export default NavbarHeader;