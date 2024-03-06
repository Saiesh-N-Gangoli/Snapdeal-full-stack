import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import MyPrice from '../FeaturedProducts/MyPrice';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form,  Modal, Row } from 'react-bootstrap';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/viewproducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
;

  const handleDelete = async(product_id) => {
    try {
        console.log(product_id)
        await axios.delete(`http://localhost:8080/delete/${product_id}`);
        toast.success("Product deleted successfully")
        console.log("Product deleted successfully")
        const response = await axios.get('http://localhost:8080/viewproducts');
        setProducts(response.data);
    } catch (error) {
        toast.error("Product deletion failed")
        console.log("Product deleted failed")
    }
}

  return (
   <>
   <AdminNav/>
     <div className="container mt-3">
      <center><h5>Products Table</h5></center>
      <hr />
      <ToastContainer/>
      <table className="table table-striped border">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col" className='widths'>Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Available</th>
            <th scope="col">Live</th>
            <th scope="col">Ratings</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td><MyPrice price={product.product_price}/></td>
              <td>{product.product_quantity}</td>

              {/* <td>{product.product_image}</td> */}
              <td>{product.isAvailable = 1 ? 'true' : 'false'}</td>
              <td>{product.isLive = 1 ? 'true' : 'false'}</td>
              <td>{product.ratings}</td>
              <td>
                <button className="btn btn-danger w-75" onClick={()=>{handleDelete(product.product_id)}}>
                  Delete
                </button>
                {/* <button className="btn btn-warning ml-2 w-50 left-button" onClick={handleShow}>
                  Update
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
          />
          <Form.Control.Feedback type="invalid">
              Please fill a proper first name.
            </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control.Feedback type="invalid">
              Please fill a proper last name.
            </Form.Control.Feedback>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
   </>
  );
};

export default ProductsTable;
