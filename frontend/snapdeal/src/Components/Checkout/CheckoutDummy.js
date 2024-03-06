import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import img from '../Images/approved.png';
import Navigation from '../Navigation/Navigation';
import BelowFooter from '../Footer/BelowFooter';
import axios from 'axios';

const CheckoutDummy = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders/7'); // Replace '7' with the actual order ID
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div>
      <Navigation />
      {orderDetails ? (
        <Card body className='success-card'>
          <div className="inside-success-card">
            <div className="img-success-card">
              <img src={img} alt="" />
            </div>
            <p>Hurray, your order is placed</p>
            <p>Delivery date: {orderDetails.date_of_delivery}</p>
            <input type="button" value="My orders >>" className='my-orders-button' />
          </div>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
      <div className="success-footer">
        <hr className='success-hr' />
        <BelowFooter />
      </div>
    </div>
  );
}

export default CheckoutDummy;
