import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './products.css';
import FeaturedSingle from './FeaturedSingle';

function Featured() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/viewproducts');
  //       setFeaturedProducts(response.data);
  //       console.log(response.data.product_id)
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/viewproducts')
      .then(response => {
        const products = response.data;
        console.log(products.product_image)
        const featuredProducts = products.filter(product => product.isfeatured);
        console.log(featuredProducts);
        setFeaturedProducts(featuredProducts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div>
      <div className="container" style={{ "position": "relative", "left": "118px", "bottom": "280px" }}>
        <h3 style={{ "position": "relative", "left": "10px", "fontSize": "21px", "fontWeight": "500" , "top" : "-4px"}}>Featured Products</h3>
        <div className="grid grid-3-column Prods" style={{ "position": "relative", "left": "-15px", "top" : "-5px" }}>
        {featuredProducts.map((product) => (
            <FeaturedSingle className="featuredBut" key={product.product_id} product={product}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;
