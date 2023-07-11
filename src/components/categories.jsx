import React from 'react';

const Categories = ({ items, onItemClick, isActive}) => {
  const allCategories = Array.from(new Set(items.map(item => item.category)));

  return (
    <nav className="navbar navbar-light bg-light" style={{marginBottom:'15px'}}>
  <ul className="navbar-nav flex-row" > 
    {allCategories.map((category, id) => (
      <li className="nav-item" key={id} style={{marginRight:'5px',marginLeft:'10px', fontWeight:isActive.includes(category) ? "700" : "400"}}>
        <button
          className={items.some(item => item.category === category) ? "nav-link btn-dark" : "nav-link"}
          onClick={() => onItemClick(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      </li>
    ))}
  </ul>
</nav>



  );
};

export default Categories;
