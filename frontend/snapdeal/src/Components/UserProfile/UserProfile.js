import React, { useState } from 'react';
import './UserProfile.css';
import Navigation from '../Navigation/Navigation';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import prof from '../Images/girl_profile.avif'
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";

const UserProfile = () => {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <div>
     <Navigation/>
     <div className="profile-big-container">
     <center className='profile-heading'>Profile</center>
     <div className="upper-container">
     <div className="image-name-container">
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={prof} className='girl-prof'/>
      <Card.Body>
        <Card.Title><center>Lilly Shetty</center></Card.Title>
        <Card.Text>
          <center>User since 09-02-2024</center>
        </Card.Text>
        <Button variant="dark" className='w-100 '>Delete account <RiDeleteBin7Line className='mdoutline'/></Button>
        <Button variant="primary" className='w-100 mt-2'>Logout <MdOutlineLogout className='mdoutline'/></Button>
      </Card.Body>
    </Card>
     </div>
     <div className="left-of-image-container">
     <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your name"
            defaultValue="Lilly Shetty"
            className='w-316'
          />
        </Form.Group>
        </Row>

        <Row>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter your email"
            defaultValue="lillyshetty@gmail.com"
            className='w-316'
          />
        </Form.Group>
        </Row>

        <Row>
        <Form.Group as={Col} md="4" controlId="validationCustom02" className='mt-2'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your phone"
            defaultValue="81972159817"
            className='w-316'
          />
        </Form.Group>
        </Row>
      <center><Button type="submit" className='mt-3 w-75'><MdOutlineUpdate className='mdoutline'/>Update profile</Button></center>
    </Form>
     </div>
     </div>
     <div className="lower-container">
     <div className="list-content-container">

     </div>
     <div className="address-change-container">
      
     </div>
     </div>

     </div>
    </div>
  );
};

export default UserProfile;
