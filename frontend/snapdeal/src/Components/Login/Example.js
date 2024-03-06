import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Login.css'
import img from '../Images/login.png'
import logo from '../Images/logo.png'
import axios from 'axios';
import swal from 'sweetalert';
import { Col } from 'react-bootstrap';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  async function loginSave(e){
    e.preventDefault();
    try{
      await axios.post("http://localhost:8080/login",
      {
        email: email,
        password: password,
      }).then((res) =>{
        console.log(res.data);
        if(res.data.message === "User email is incorrect"){
          swal({title: "Failure", text: "This Email is Not Correct", icon: "error"});
        } else if(res.data.message === "User logged in successfully"){
          swal({title: "Success", text: "User Logged In Successfully", icon: "success"});
          // toast.success("Wow so easy!", {
          //   position: "bottom-left"
          // });
        } else{
          swal({title: "Failure", text: "Email and Password doesn't Match", icon: "error"});
        }
      }, fail =>{
        console.error(fail);
      });
    }
    catch(err){
      swal("sorry");
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><img src={logo} alt="" style={{"width": "90px"}}/>
          <div className='login-logo-below'>Login/Sign Up</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="main-example">
          <div className="example-left">
        <img src={img} alt="" className='example-img'/>
</div>
<div className="example-right">
<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='font-size-input'>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter valid email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='example-in font-size-input'
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className='font-size-input'>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter valid password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='example-in font-size-input'
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      <Button type="submit" className='example-btn' onClick={loginSave}>LOGIN</Button>
</Form>
</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;