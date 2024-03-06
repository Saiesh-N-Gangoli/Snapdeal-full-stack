import React, { useState, useEffect } from 'react';
import SingleProduct from '../FeaturedProducts/SingleProduct';
import { Link } from 'react-router-dom';
import '../FeaturedProducts/products.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/viewproducts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className='container grid grid-3-column gridss'>      
    {products.map(current => (        
      <Link to={`/viewproducts/${current.product_id}`} key={current.product_id} style={{"textDecoration" : "none"}}>
        <SingleProduct          
          name={current.product_name || 'No Name'}        
          price={current.product_price || 0}      
          image={current.product_image || 'no image'}
          category={current.category ? current.category.category_name : 'Uncategorized'}        
        />
      </Link>
     ))}    
     </div>
  );
};

export default AllProducts;