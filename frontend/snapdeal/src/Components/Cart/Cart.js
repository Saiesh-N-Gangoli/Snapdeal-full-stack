import React, { useState } from 'react'
import CartAmount from './CartAmount'
import swal from 'sweetalert';

const Cart = ({product}) => {
  const {stock} = product;
  const[quantity, setQuantity] = useState(1);
  const setDecrease = () =>{
    quantity > 0 ? setQuantity(quantity - 1) : setQuantity(1);
    quantity === 0 ? swal("Quantity cannot be zero") : setQuantity(quantity-1);
  }

  const setIncrease = () =>{
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  }

  return (
    <div>
      <CartAmount amount={quantity} setDecrease={setDecrease} setIncrease={setIncrease}/>
    </div>
  )
}

export default Cart
