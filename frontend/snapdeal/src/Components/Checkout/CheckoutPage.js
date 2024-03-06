// ShoppingCart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyPrice from '../FeaturedProducts/MyPrice';
import '../FeaturedProducts/products.css'
import Navigation from '../Navigation/Navigation';
import BelowFooter from '../Footer/BelowFooter';
import { ToastContainer, toast} from 'react-toastify';
import { Accordion } from 'react-bootstrap';
import check from "../Images/approved.png";
import no from "../Images/no.png";
import visa from "../Images/visa.png";
import master from "../Images/mastercard.png";
import maestro from "../Images/maestro.png";
import rupay from "../Images/rupay.png";
import { useNavigate } from 'react-router-dom';
import useRazorpay from 'react-razorpay';
import './Checkout.css'

const Checkout = () => {

  // ---------------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState();
  const [validatecoupon, setvalidatecoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setdiscountPercentage] = useState(0);
  const [discountmessage, setDiscountmessage] = useState('');
  const [address, setAddress] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();





  const handleCoupon = async() => {
    try {
        if (!coupon) {
            setvalidatecoupon(null);
            setDiscountAmount(0);
            setdiscountPercentage(0);
            // toast.error("Please fill the input field");
            setDiscountmessage("Please fill the input field")
            return;
          }
          setDiscountmessage("")
        const response = await fetch(`http://localhost:8080/coupon/${coupon}`);
        const content = await response.json();
        setvalidatecoupon(content);
        if (content) {
           const couponDiscount = content.couponDiscount;
           const discountAmount = couponDiscount/100;
            const totalAmount = calculateTotal() + calculateShippingAmount();
            const newDiscountAmount = Math.round(totalAmount * discountAmount);
            setDiscountAmount(newDiscountAmount);
            setdiscountPercentage(couponDiscount);
            setvalidatecoupon(true);
          } else {
            setvalidatecoupon(false);
            setDiscountAmount(0);
            setdiscountPercentage(0);
          }
    } catch (error) {
        console.log("Error" + error);
        setvalidatecoupon(false);
    setDiscountAmount(0);
    setdiscountPercentage(0);
    }
  }

  useEffect(() => {
        setvalidatecoupon(null);
        setDiscountAmount(0);
        setdiscountPercentage(0);
  }, [coupon]);



  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/viewmycart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const emptyCart = async() =>{
    try {
      const response = axios.delete('http://localhost:8080/deleteallcart');
      if(response.status === 200){
        console.log("Cart is set to empty now...")
      } else{
        console.log("Cart is not set to empty now...")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const placeOrder = () =>{
    if(selectedPaymentMethod === "Cash on Delivery/Pay on Delivery"){
      emptyCart();
      navigate('/successpage')

    }
    else if(selectedPaymentMethod === "Credit or Debit card"){
      handlePayment();
      emptyCart();
      navigate('/successpage');
    }
  }


  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.productPrice * item.productQuanity, 0);
  };

  const calculateShippingAmount = () => {
    const totalPrice = cart.reduce((total, item) => total + item.productPrice * item.productQuanity, 0);
    return totalPrice < 1000 ? cart.reduce((total, item) => total + item.productQuanity * 40, 0) : 0;
  };

  const handleOutput = (e) => {
    setAddress(e);
  }
  // -------------------------------------------------------------------------------------------

  const [Razorpay] = useRazorpay();
  const amount = (calculateTotal() + calculateShippingAmount() - discountAmount) * 100; 
  const userName = 'Snapdeal'; 

  const createOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8080/payment/${amount * 100}`, {
        mode: 'no-cors',
        method: 'GET',
      });
      const data = await response.json();
      return data.order_id;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handlePayment = async () => {
    const order = await createOrder();

    const options = {
      key: 'rzp_test_8moakjpNzT76i1',
      amount: amount ,
      currency: 'INR',
      name: userName,
      description: 'Transaction',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLGuIPs55GV-NWd9Z-fAMlrWMRhJP_HUxADA&usqp=CAU',
      order_id: order,
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        if (response.razorpay_payment_id) {
          console.log("console success")
          navigate('/successpage');
        }
      },
      notes: {
        address: 'ABC, Delhi',
      },
      theme: {
        color: '#e40046',
        modal: {
          height: '50% !important', 
          width: '50% !important',  
        }
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  //---------------------------------------------------------------------------------------------------

  const [payment, setpayment] = useState();
  const [orderAddress, setOrderAddress] = useState();

  const handleOrders = async (e) => {
    // e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/createorder', {
        payment_type: payment,
        order_address: orderAddress,
      });
      console.log(response)
      setpayment("");
      setOrderAddress("");

    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () =>{
    toast.success("Address added successfully")
  }


  return (
    <div>
    <Navigation/>
    <ToastContainer />
      <h2 className='MyCart'>Checkout</h2>
     <div className="main-checkout">

        <div className="address-stuff">

        <Accordion defaultActiveKey="0" className='Accord'>

        <Accordion.Item eventKey="0">
        <Accordion.Header>Address</Accordion.Header>
        <Accordion.Body>
      <label>
      <textarea name="postContent" rows={4} cols={40} placeholder='Add address' onChange={(e) => { handleOutput(e.target.value); setOrderAddress(e.target.value)}} value={orderAddress}/>
       </label>
        <input type="button" name="" id="" value="Add+" className='button-check'  disabled={!address} onClick={handleClick}/>
        <p>{setAddress}</p>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Payment Method</Accordion.Header>
        <Accordion.Body>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" value={payment} onClick={()=>setpayment("Card Payment")} id="flexRadioDefault1"
        checked={selectedPaymentMethod === "Credit or Debit card"}
          onChange={() => setSelectedPaymentMethod("Credit or Debit card")}
        />
        <label class="form-check-label" for="flexRadioDefault1">
        Credit or Debit card
        </label>
        <div className="cards-images">
            <img className='imgs-visa' src={visa} alt="" />
            <img className='imgs-visa' src={master} alt="" />
            <img className='imgs-visa' src={rupay} alt="" />
            <img className='imgs-visa' src={maestro} alt="" />
        </div>
    </div>
    <div class="form-check">
        <input class="form-check-input" value={payment} onClick={()=>setpayment("Cash on Delivery")} type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
          checked={selectedPaymentMethod === "Cash on Delivery/Pay on Delivery"}
          onChange={() => setSelectedPaymentMethod("Cash on Delivery/Pay on Delivery")}
        />
        <label class="form-check-label" for="flexRadioDefault2">
        Cash on Delivery/Pay on Delivery
        </label>
        <p className='upi'>Cash, UPI and Cards accepted.</p>
    </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Offers</Accordion.Header>
        <Accordion.Body>
        <input 
  type="text" 
  placeholder='Add Coupon' 
  value={coupon} 
  onChange={(e) => {setCoupon(e.target.value) ; setDiscountmessage('');} }
  style={{"padding": "2px 2px"}}
/>
<input 
  type="button" 
  name="" 
  id="" 
  value="Check"  
  onClick={handleCoupon} 
  className='button-check'
/>

{discountmessage && (
              <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>
                {discountmessage}
              </p>
            )}

{validatecoupon !== null && (
  validatecoupon ? (
    <div className='d-flex check-img'>
      <img src={check} alt="" className='im'/>
      <p className='check-p'>
        Hurray!! Coupon <span className='text-bold'>{coupon}</span> applied!!
      </p>
    </div>
  ) : (
    <div className='d-flex check-img'>
    <img src={no} alt="" className='im'/>
    <p className='check-p'>
        Sorry!! Coupon <span className='text-bold'>{coupon}</span> is not valid!!
      </p>
    </div>
  )
)}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Review items and delivery</Accordion.Header>
        <Accordion.Body>
        <table className="table container my-cart-table my-cart-checkout relative">
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
              <td>{item.productQuanity}</td>
              <td><MyPrice price = {item.productPrice*item.productQuanity}></MyPrice></td>
              <td></td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" className='text-bold'>Grand Total:</td>
            <td className='text-bold'> <MyPrice price={calculateTotal() + calculateShippingAmount()} /></td>
            <td></td>
          </tr>
        </tbody>
      </table>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion> 
      </div>
        
        <div className="table-stuff">
        <table className="table container my-cart-table my-cart-checkout-side">
        <thead>
          <tr>
            <th>Order Summary</th>
            {/* <th className='quantity'>Quantity</th> */}
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" className=''>Sub Total:</td>
            <td className=''> <MyPrice price={calculateTotal()} /></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2" className=''>Shipping Charges:</td>
            <td className=''> {calculateShippingAmount() === 0 ? "Free Delivery" : <MyPrice price={calculateShippingAmount()} />}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2" className=''>Discount:</td>
            <td className=''> <MyPrice price={discountAmount} /><span className='discountspan'>({discountPercentage}% Discount)</span></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2" className=''>Grand Total:</td>
            <td className='text-bold'> <MyPrice price={calculateTotal() + calculateShippingAmount() - discountAmount} /></td>
            <td></td>
          </tr>

          <tr>
            <td colSpan="3"><input type="button" value="Place your order" className='orders' disabled={!address} onClick={()=>{placeOrder(); handleOrders()}}/></td>
          </tr>
        </tbody>
      </table>
      </div>
       
     </div>
      <hr className='hr'/>
      <div className='footer'>
      <BelowFooter/>
      </div>
    </div>
  );
};

export default Checkout;
