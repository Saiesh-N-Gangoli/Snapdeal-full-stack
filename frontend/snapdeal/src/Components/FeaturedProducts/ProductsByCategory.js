// ProductsByCategory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
import './products.css';
import { ToastContainer, toast } from 'react-toastify';
import SingleProduct from './SingleProduct';
import BelowFooter from '../Footer/BelowFooter';
import { Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
import productno from '../Images/no-product-found.png'

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const { category_id } = useParams(); 
  const [categoryName, setCategoryName] = useState('');
  console.log(sortOrder);


  const handlePriceSort = (order) =>{
    let filteredProducts;
    switch (order) {
      case 'Less than 500':
        filteredProducts = products.filter(product => product.product_price < 500);
        break;

       case 'Less than 1000':
        filteredProducts = products.filter(product => product.product_price < 1000);
        break;

       case 'Less than 1500':
        filteredProducts = products.filter(product => product.product_price < 1500);
        break;

       case 'Less than 2000':
        filteredProducts = products.filter(product => product.product_price < 2000);
        break;

      default:
        filteredProducts = products;
        break;
    }

    setFilteredProducts(filteredProducts);
    setSortOrder(order);
  }

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
    setFilteredProducts(sortedProducts);
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
    const ProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/procategory/${category_id}`);
        setProducts(response.data);
        setCategoryName(response.data.length > 0 ? response.data[0].category.category_name : '');
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    ProductsByCategory();
  }, [category_id]);

  const clearFilters = () => {
    setFilteredProducts(products);
    setSortOrder(null);
  };

  return (
    <div>
      <Navigation />
      <ToastContainer />
      <h2 className='headingPro'>CATEGORY - {categoryName}</h2>
      <hr className='hrrr' />
      <div className="image-banner">
      <img src="https://m.media-amazon.com/images/G/31/img24/Fashion/Event/JanART/Eventpage/AF/stealdeals/banner/SD-Top-Herotator._CB585995939_.gif" alt="" />
      </div>    
      <hr className='hrr' />
<div className='d-flex'>
<div>
<Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className='sort-but w-100'>
          Sort
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSort('A-Z')}>A-Z</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort('Z-A')}>Z-A</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('Price(Low to High)')}>Price(Low to High)</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('Price(High to Low)')}>Price(High to Low)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
</div>

<div style={{
    "position": "relative",
    "left": "5px"
}}>
<Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className='sort-but w-100' >
          Price Range
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item onClick={clearFilters}>Clear Filters</Dropdown.Item>
        <Dropdown.Item onClick={() => handlePriceSort('Less than 500')}>Less than 500</Dropdown.Item>
        <Dropdown.Item onClick={() => handlePriceSort('Less than 1000')}>Less than 1000</Dropdown.Item>
        <Dropdown.Item onClick={() => handlePriceSort('Less than 1500')}>Less than 1500</Dropdown.Item>
        <Dropdown.Item onClick={() => handlePriceSort('Less than 2000')}>Less than 2000</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
</div>
<div>
{/* <button onClick={clearFilters} className='clear-filters' style={{
    "color": "black",
    "position": "relative",
    "top": "101px",
    "left": "111px"
}}>
<ImCross />
</button> */}
</div>
</div>
      <div className="row prolistitems container GridDisplay">
        {filteredProducts.length === 0 ? (
          <div className="no-products-message">
          <img src={productno} alt="" />
          </div>
        ) : (
          <div className="card-container GridDisplay container">
            {filteredProducts.map((product) => (
              <SingleProduct key={product.product_id} product={product} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
      <hr className='hrr' />
      <div className='beel'>
        <BelowFooter />
      </div>
    </div>
  );
};

export default ProductsByCategory;
