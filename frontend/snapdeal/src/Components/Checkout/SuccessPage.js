import React, { useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import './Checkout.css'
import img from '../Images/approved.png'
import Navigation from '../Navigation/Navigation'
import BelowFooter from '../Footer/BelowFooter'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {

  const[handleSuccess, setHandleSuccess] = useState(false);

  const navigate = useNavigate();

  const[state, setState] = useState(14);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHandleSuccess(true);
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, []);



    useEffect(() => {
    const setCounter = setTimeout(() => {
      setState((p)=> p-1);
    },1000);
    if(state === 0){
      navigate('/home')
    }
    return () => clearTimeout(setCounter);
  })
  



  return (
    <div>
    <Navigation/>
     {handleSuccess ? <Card body className='success-card'>
      <div className="inside-success-card">
      <div className="img-success-card">
      <img src={img} alt="" />
      </div>
      <p>Hurray, your order is placed</p>
      <p>Delivery date: <strong>12-02-2024</strong></p>
      <input type="button" value="My orders >>" className='my-orders-button'/>
      <p style={{"font-weight": "300",
    "position": "relative",
    "bottom": "8px",
    "font-size": "12px",
    "left": "25px"}}>Redirecting... in {state} seconds</p>
      </div>
      </Card> : 
      <div className='spinner-class'><Spinner animation="grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    <p>Wait while your order is been confirming</p></div>}
      <div className="success-footer">
      <hr className='success-hr'/>
        <BelowFooter/>
      </div>
    </div>
  )
}

export default SuccessPage
