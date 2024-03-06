import React from 'react';
import useRazorpay from 'react-razorpay';


const Payment = () => {
  const [Razorpay] = useRazorpay();
  const amount = 1000; 
  const userName = 'Snapdeal'; 
  const email = 'john@example.com'; 
  const contact = '9876543210';

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
      amount: amount * 100,
      currency: 'INR',
      name: userName,
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: order,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: userName,
        email: email,
        contact: contact,
      },
      notes: {
        address: 'ABC, Delhi',
      },
      theme: {
        color: '#3399cc',
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

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
