import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import axios from 'axios';
import AdminNav from './AdminNav';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productImage1, setProductImage1] = useState('');
  const [productImage2, setProductImage2] = useState('');
  const [productImage3, setProductImage3] = useState('');
  const [is_available, setIsAvailable] = useState();
  const [isfeatured, setIsfeatured] = useState();
  const [is_live, setIsLive] = useState();
  const [categoryId, setCategoryId] = useState('');
  const [ ratings, setRatings] = useState('');
  const [error, setError] = useState('');

  const isFormInvalid = !productName || !productPrice || !productQuantity || !productImage ||
    !productImage1 || !productImage2 || !productImage3 || is_available === undefined ||
    isfeatured === undefined || is_live === undefined || !categoryId || !ratings;



  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);

  // const handleShow = (c) => {
  //     setShow(true);
  // }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/createproducts/${categoryId}`, {
        product_name: productName,
        product_price: productPrice,
        product_quantity: productQuantity,
        live: is_live,
        available: is_available,
        isfeatured: isfeatured,
        product_image: productImage,
        ratings: ratings,
        second_product_image: productImage1,
        third_product_image: productImage2,
        fourth_product_image: productImage3,
        category_category_id: Number(categoryId),
      });
      console.log(response)
      console.log(is_live)
      console.log(isfeatured)
      console.log(is_available)

      swal({ text: "Product Registered Successfully", icon: "success" });

      setProductName('');
      setProductPrice('');
      setProductQuantity('');
      setProductImage('');
      setIsAvailable();
      setIsLive();
      setCategoryId('');
      setError('');

    } catch (error) {
      setError('Product Registration Failed');
      console.error(error);
    }
  };





  return (
    <>
      <AdminNav/>
    <div className="container mt-2">
    <center><h5>Products Table</h5></center>
      <hr />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className='form-product'>
      <Form className='forms'>
        <div className="first-line">
        <Form.Group className="margines" controlId="validationCustom02">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid product name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productPrice" className="margines">
          <Form.Label>Product Price</Form.Label>
          <Form.Control type="number" placeholder="Enter Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="productQuantity" className="margines">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control type="number" placeholder="Enter Product Quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
        </Form.Group>
        </div>

        <div className="first-line">
        <Form.Group controlId="productImage" className="margines">
          <Form.Label>Product Image URL - 1</Form.Label>
          <Form.Control type="text" placeholder="Enter Product Image URL - 1" value={productImage} onChange={(e) => setProductImage(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid image url.
          </Form.Control.Feedback>
        </Form.Group>  

        <Form.Group controlId="productImage" className="margines">
          <Form.Label>Product Image URL - 2</Form.Label>
          <Form.Control type="text" placeholder="Enter Product Image URL - 2" value={productImage1} onChange={(e) => setProductImage1(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid image url.
          </Form.Control.Feedback>
        </Form.Group>  

        <Form.Group controlId="productImage" className="margines">
          <Form.Label>Product Image URL - 3</Form.Label>
          <Form.Control type="text" placeholder="Enter Product Image URL - 3" value={productImage2} onChange={(e) => setProductImage2(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid image url.
          </Form.Control.Feedback>
        </Form.Group>  
        </div>      
        
       <div className="first-line">    
        <Form.Group controlId="productImage" className="margines">
          <Form.Label>Product Image URL - 4</Form.Label>
          <Form.Control type="text" placeholder="Enter Product Image URL - 4" value={productImage3} onChange={(e) => setProductImage3(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid image url.
          </Form.Control.Feedback>
        </Form.Group> 

        <Form.Group controlId="productImage" className="margines">
          <Form.Label>Ratings</Form.Label>
          <Form.Control type="text" placeholder="Enter Ratings" value={ratings} onChange={(e) => setRatings(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid image url.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="categoryId" className="margines">
          <Form.Label>Category ID</Form.Label>
          <Form.Control type="number" placeholder="Enter Category ID" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid category id.
          </Form.Control.Feedback>
        </Form.Group> 
       </div>       

        <div className="first-line">
        <Form.Group controlId="isfeatured" className="margines">
              <Form.Label>Featured</Form.Label>
              <div className='d-flex'>
                <Form.Check
                  type="radio"
                  label="True"
                  name="isfeatured"
                  id="true"
                  checked={isfeatured === true}
                  onChange={() => setIsfeatured(true)}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name="isfeatured"
                  style={{"margin-left" : "13px"}}
                  id="false"
                  checked={isfeatured === false}
                  onChange={() => setIsfeatured(false)}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="isLive" className="margines">
              <Form.Label>Product Live</Form.Label>
              <div className='d-flex'>
                <Form.Check
                  type="radio"
                  label="True"
                  name="isLive"
                  id="true"
                  checked={is_live === true}
                  onChange={() => setIsLive(true)}
                />
                <Form.Check
                  type="radio"
                  style={{"margin-left" : "13px"}}
                  label="False"
                  name="isLive"
                  id="false"
                  checked={is_live === false}
                  onChange={() => setIsLive(false)}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="isAvailable" className="margines">
              <Form.Label>Product Availability</Form.Label>
              <div className='d-flex'>
                <Form.Check
                  type="radio"
                  label="True"
                  name="isAvailable"
                  id="true"
                  checked={is_available === true}
                  onChange={() => setIsAvailable(true)}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name="isAvailable"
                  style={{"margin-left" : "13px"}}
                  id="false"
                  checked={is_available === false}
                  onChange={() => setIsAvailable(false)}
                />
              </div>
            </Form.Group>
        </div>

        <Button variant="primary" type="submit" onClick={handleFormSubmit} className='w-25' disabled={isFormInvalid}>
          Submit
        </Button>
      </Form>
      </div>
    </div>
    </>
  );
};

export default AddProductForm;