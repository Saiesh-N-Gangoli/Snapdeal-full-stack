import React, { useState } from 'react';
import ProductList from './ProList';
import ShoppingCart from './ShoppingCart';

const ParentComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, { product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.product.product_id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.product.product_id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.product.product_id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.product.product_price, 0).toFixed(2);
  };

  return (
    <div>
      <ProductList addToCart={addToCart} />
      <ShoppingCart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        calculateGrandTotal={calculateGrandTotal}
      />
    </div>
  );
};

export default ParentComponent;
