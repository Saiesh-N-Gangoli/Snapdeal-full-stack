// ShoppingCart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyPrice from './MyPrice';
import './products.css'
import Navigation from '../Navigation/Navigation';
import * as Icons from 'react-bootstrap-icons'
import { NavLink } from 'react-router-dom';
import BelowFooter from '../Footer/BelowFooter';
import { ToastContainer, toast } from 'react-toastify';
import carts from '../Images/cart.png'

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [totalcart, setTotalCart] = useState();
  

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/viewmycart');
      setCart(response.data);
      console.log("Length: "+response.data.length);
      setTotalCart(response.data.length)
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleDelete = async (event, cart_id) =>{
    event.preventDefault();
    axios
      .delete(`http://localhost:8080/deletecartitem/${cart_id}`)
      .then(() => {
        toast.success('Item deleted successfully');
        fetchCart();
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        toast.error('Item deleting failed');
      });
  }

  const handleQuantityChange = async (cart_id, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:8080/updatequantity/${cart_id}`, {
        productQuanity: newQuantity,
      });
      if (response.status === 202) {
        fetchCart();
        toast.success('Quantity updated successfully', {autoClose: 600});
      } else {
        toast.error('Failed to update quantity',  {autoClose: 600});
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity',  {autoClose: 600});
    }
  };

  const handleIncrement = (cart_id) => {
    const updatedCart = cart.map((item) => {
      if (item.cart_id === cart_id) {
        handleQuantityChange(cart_id, item.productQuanity + 1);
        return { ...item, productQuanity: item.productQuanity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecrement = (cart_id) => {
    const updatedCart = cart.map((item) => {
      if (item.cart_id === cart_id && item.productQuanity > 1) {
        handleQuantityChange(cart_id, item.productQuanity - 1);
        return { ...item, productQuanity: item.productQuanity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.productPrice * item.productQuanity, 0);
  };

  const calculateShippingAmount = () => {
    const totalPrice = cart.reduce((total, item) => total + item.productPrice * item.productQuanity, 0);
    return totalPrice < 1000 ? cart.reduce((total, item) => total + item.productQuanity * 40, 0) : 0;
  };
  

  return (
    <div>
    <Navigation totalcart={totalcart}/>
    <ToastContainer />
    <h2 className='MyCart'>Shopping Cart</h2>
    {cart.length === 0 ? (
      <>
      <div className='emptycart-img'><img src={carts} alt="" /></div>
      <p className='emptycart'>Your cart looks lonely &#128531;. Add products and comeback!!</p>
      </>
    ) : (
      <>
        <table className="table container my-cart-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th className='quantity'>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.cart_id}>
                <td className='text-transform font-fam'>{item.productName}</td>
                <td>
                  <input className='plus' type="button" value="-" onClick={() => handleDecrement(item.cart_id)} />
                  {item.productQuanity}
                  <input type="button" className='minus' value="+" onClick={() => handleIncrement(item.cart_id)} />
                </td>
                <td><MyPrice price={item.productPrice * item.productQuanity}></MyPrice></td>
                <td>
                  <NavLink style={{ "textDecoration": "none", color: "#e40046" }} to="/cart" onClick={(event) => handleDelete(event, item.cart_id)}>
                    <Icons.TrashFill />
                  </NavLink>
                </td>
              </tr>
            ))}
            
            <tr>
              <td colSpan="2" className='text-bold'>Sub Total:</td>
              <td className='text-bold'> <MyPrice price={calculateTotal()} /></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="2" className='text-bold'>Shipping Charges:</td>
              <td className='text-bold'> {calculateShippingAmount() === 0 ? "Free Delivery"  : <MyPrice price={calculateShippingAmount()} />}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="2" className='text-bold'>Grand Total:</td>
              <td className='text-bold'> <MyPrice price={calculateTotal() + calculateShippingAmount()} /></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </>
    )}
      {cart.length > 0 && (
      <NavLink to='/checkout'><input type="button" value="Proceed to Checkout >>" className='checkout'/>Proceed to Checkout &gt&gt</NavLink>)}
      <hr className='hr'/>
      <div className='footer'>
      <BelowFooter/>
      </div>
    </div>
  );
};

export default ShoppingCart;
