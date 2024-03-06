import React from 'react'
import * as Icons from 'react-bootstrap-icons'
import '../SingleProduct/SingleProduct.css'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const CartAmount = ({amount,setDecrease,setIncrease}) => {
  return (
    <>
    <div className='flexible'>
      <p className='amounts'>Quantity : </p>
      <div className="button-left" onClick={() => setDecrease()}><Icons.Dash/></div>
      <p className='amount'>{amount}</p>
      <div className="button-right" onClick={() => setIncrease()}><Icons.Plus/></div>
    </div>
      <div className="mainBut mainButs">
              <NavLink to={`/home`} style={{"text-decoration": "none"}}>
                <Button className="CartButton buts">
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
                
              <NavLink to={`/home`} style={{"text-decoration": "none"}}>
                <Button className="CartButton buts butss">
                  Buy Now
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
            </>
  )
}

export default CartAmount
