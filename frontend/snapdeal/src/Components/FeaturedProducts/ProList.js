import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
import './products.css';
import { ToastContainer, toast } from 'react-toastify';
import SingleProduct from './SingleProduct';  
import BelowFooter from '../Footer/BelowFooter';
import { Dropdown } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  console.log(sortOrder);

  const handleSort = (order) => {
    let sortedProducts = [...products];

    switch (order) {
      case 'A-Z':
        sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case 'Z-A':
        sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
        break;
      case 'Price(Low to High)':
        sortedProducts.sort((a, b) => a.product_price - b.product_price);
        break;
      case 'Price(High to Low)':
        sortedProducts.sort((a, b) => b.product_price - a.product_price);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
    setSortOrder(order);
  };


  const addToCart = async (product) => {
    try {
      await axios.post('http://localhost:8080/addtomycart', {
        productName: product.product_name,
        productPrice: product.product_price,
      });
      console.log('Added to cart successfully.');
      toast.success('Added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/viewproducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navigation />
      <ToastContainer />
      <h2 className='headingPro'>Men's Fashion</h2>
      <hr className='hrrr'/>
      <div className="image-banner">
      <img src="https://m.media-amazon.com/images/G/31/img21/MA2023/HOTW/T-shirts_and_polo_corner_770x300._CB574222833_.png" alt="" />
      </div>
      <hr className='hrr'/>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className='sort-but'>
        Sort
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <Dropdown.Item onClick={() => handleSort('A-Z')}>A-Z</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('Z-A')}>Z-A</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('Price(Low to High)')}>Price(Low to High)</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('Price(High to Low)')}>Price(High to Low)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      <div className="row prolistitems container GridDisplay">
        <div className="card-container GridDisplay container">
          {products.map((product) => (
            <SingleProduct key={product.product_id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
     <hr className='hrr'/>
     <div className='beel'>
      <BelowFooter/>
     </div>
    </div>
  );
};

export default ProductList;
