import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./SingleProduct.css";
import MyPrice from "../FeaturedProducts/MyPrice";
import BelowFooter from "../Footer/BelowFooter";
import * as Icons from 'react-bootstrap-icons';
import RatingProducts from "./RatingProducts";
import { FaTruckMoving } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { MdAssignmentReturn } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { CiDiscount1 } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function LoneProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(loading);

  const num = parseFloat(product.ratings).toFixed(1);

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
    fetch(`http://localhost:8080/viewproducts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(product.product_image);

  useEffect(() => {
    if (product.product_image) {
      setSelectedImage(product.product_image);
    }
  }, [product.product_image]);

  return (
    <div>
      <Navigation />
      <div className="LoneHeader">
        <p className="white"><NavLink to={'/home'} className="whiter">Home</NavLink> / {product.product_name}</p>
      </div>
      <ToastContainer/>
      <div className="container bigcontainer">
        <div className="img-container">
          <div className="mega-img">
          <img
              src={product.product_image}
              alt=""
              onClick={() => setSelectedImage(product.product_image)}
            />
            <img
              src={product.second_product_image}
              alt=""
              onClick={() => setSelectedImage(product.second_product_image)}
            />
            <img
              src={product.third_product_image}
              alt=""
              onClick={() => setSelectedImage(product.third_product_image)}
            />
            <img
              src={product.fourth_product_image}
              alt=""
              onClick={() => setSelectedImage(product.fourth_product_image)}
            />
          </div>
          <div className="mini-img">
            <img src={selectedImage} alt="" />
          </div>
        </div>
        <div className="content-container">
          <h4 className="text-trans">{product.product_name}</h4>
          <hr />
          <p className="d-flex">
            <span style={{ "fontWeight": "200", "fontSize": "small"}}>{num} Ratings</span>
            <RatingProducts stars={product.ratings} />
          </p>
          <span className="bought-cust">50+ bought in past month</span>
          <p className="pricep">
            <MyPrice price={product.product_price} />
          </p>

          <p>
            <span className="cancelled-price">
              (M.R.P:{" "}
              <del>
                <MyPrice price={product.product_price + 200} />
              </del>
              )
            </span>
          </p>
          <p className="instock">
            {product.product_quantity > 0 ? 'In-stock' : 'EMPTY'}
          </p>
          <p style={{"fontWeight": "400"}}>Inclusive of all taxes</p>
          <hr className="hrs"/>
          <CiDiscount1 className="discount"/>
          <FaChevronDown className="discount-d"/>
          <DropdownButton id="dropdown-basic-button" title="Offers" className="drop">
            <Dropdown.Item href="#/action-1" className="drop-d">10% Instant Discount up to INR 1250 on SBI Credit Card Non-EMI</Dropdown.Item>
            <Dropdown.Item href="#/action-1" className="drop-d">Additional INR 500 Discount on SBI Credit Card. Min purchase value INR 24999</Dropdown.Item>
            <Dropdown.Item href="#/action-1" className="drop-d" style={{"border": "none"}}>Additional INR 500 Discount on SBI Credit Card 18 month and above</Dropdown.Item>
          </DropdownButton>
          <div className="Icons-container">
          <div className="mini-icon-container">
          <FaTruckMoving className="mini-icon-container-svg"/>
          <p className="delivery">Faster Delivery</p>
          </div>
          <div className="mini-icon-container">
          <SiCashapp className="mini-icon-container-svg"/>
          <p className="cod">Cash on Delivery</p>
          </div>
          <div className="mini-icon-container">
          <MdAssignmentReturn className="mini-icon-container-svg"/>
          <p className="returns">Easy Returns</p>
          </div>
          <div className="mini-icon-container">
          <FaTrophy className="mini-icon-container-svg"/>
          <p className="assured">100% Assured</p>
          </div>
          <div className="mini-icon-container">
          <FaLock className="mini-icon-container-svg"/>
          <p className="lock">Safe Transaction</p>
          </div>
          </div>
          <p>
            <h4 className="text-trans">{product.pr}</h4>
          </p>
          <hr />
          <NavLink to={``} style={{"text-decoration": "none", "display": "block", "width" : "0"}}>
                <Button className="CartButton buts butn" onClick={() => addToCart(product)}>
                  Add to Cart
                  <Icons.CartFill
                    style={{
                      marginLeft: "7px",
                      bottom: "1.5px",
                      position: "relative",
                      color: "white",
                    }}
                  />
                </Button>
              </NavLink>
                
              <NavLink to={`/home`} style={{"text-decoration": "none" ,"display": "block", "width" : "0"}}>
                <Button className="CartButton buts butss butn-cart">
                  Add to Wishlist
                  <Icons.BagFill
                    style={{
                      marginLeft: "7px",
                      bottom: "1.5px",
                      position: "relative",
                      color: "white",
                    }}
                  />
                </Button>
              </NavLink>
        </div>
      </div>
      <div className="footy">
        <BelowFooter />
      </div>
    </div>
  );
}

export default LoneProduct;
