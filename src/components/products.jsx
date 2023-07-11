import React, { useState,useEffect } from 'react';
import NavbarHeader from './navbar';
import axios from 'axios';
import Card from './card';
import Categories from './categories';


const Products = () => {
    
    const [items,setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(["accessories"]);

    const filteredItems = items.filter(item => selectedCategory.includes(item.category));

    const handleFetchProducts = () => {

        // const url = "https://dummyjson.com/products/";
        const url= "http://127.0.0.1:8000/api/v1/products/"
    
        axios({
          method: "GET",
          url,
          headers: {
            "Content-Type": "application/json"
    }})
          .then((res) => {
            const { status, data } = res;
            setItems(data?.data);
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

    
    const handleCategoryClick = (category) => {
      if (selectedCategory.includes(category)){
        let categories = selectedCategory.filter(each=>each!==category)
        setSelectedCategory(categories);
        console.log(category, "excluded");
      }
      else{
        setSelectedCategory((prev)=>([...prev, category]));
        console.log(category, "included");
      }
    };
      
   
    return ( 
        <React.Fragment>
            <NavbarHeader/>
            <Categories items={items} onItemClick={handleCategoryClick} isActive={selectedCategory}/>
            <div style={{ display: "flex",flexWrap: "wrap", justifyContent: "center",marginBottom:'20px' }}>
               {filteredItems && filteredItems.map(
                  (product,id) => {
                      return (<Card key={id} product={product} handleChange={handleChange}/>)
                  }
               )}
              </div>
        </React.Fragment>
     );
}
 
export default Products;