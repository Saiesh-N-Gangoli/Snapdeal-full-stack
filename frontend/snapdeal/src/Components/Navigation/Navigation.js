// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navigation.css";
import logo from "../Images/logo.png";
import mens from "../Images/mens.jpg";
import womens from "../Images/women.jpg";
import vessels from "../Images/vessels.jpg";
import toys from "../Images/toys.jpg";
import beauty from "../Images/beauty.jpg";
import * as Icons from 'react-bootstrap-icons'
import { NavLink } from "react-router-dom";
import SearchBar from "../ProductList.js/SearchBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import swal from "sweetalert";
import img from '../Images/login.png'
import logos from '../Images/logo.png'


function Navigation({totalcart}) {

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
          handleClose();
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

  const[user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/viewusers/${user}`);
        const userData = response.data;
        console.log("username:" + userData.register_name);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
    <>
   <div className="big-nav" style={{"position" : "fixed", "zIndex" : "2"}}>
   <Navbar className="bgst">
    <Container>
      <Navbar.Brand href="#home" className="Brands">Brand Waali Quality, Baazar Waali Deal</Navbar.Brand>
      <Navbar.Toggle />
      {/* <div><Nav.Link href="#action1" style={{"position": "relative !important","left" : "12px !important","font-size": "13px !important"}}>Impact@SnapDeal</Nav.Link></div>
      <div><Nav.Link href="#action1">Gift Cards</Nav.Link></div>
      <div><Nav.Link href="#action1">Help Center</Nav.Link></div>
      <div><Nav.Link href="#action1">Sell on SnapDeal</Nav.Link></div>
      <div><Nav.Link href="#action1"><Icons.CartFill style={{"marginLeft" : "7px", "bottom" : "1.5px", "position" : "relative" , "color" : "black"}}/>Download App</Nav.Link></div> */}
    </Container>
  </Navbar>

    <Navbar expand="lg" className="bgs">
      <Container fluid>
        <div className="NavImage">
         <Link to={'/home'}> <img src={logo} alt="" /></Link>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >

        <div className="FlexMaking color">
            <div className="color">
            <NavDropdown className="text-light" title="Categories" id="" style={{"color" : "white !important" , "fontWeight" : "bolder", "marginLeft" : "10px"}}>
            <center><strong><h7>Top Categories</h7></strong></center>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/productlist'><img src={mens} alt="" className="mens"/> Men's Fashion</NavDropdown.Item>
              <NavLink to='/productlist' className='NaveLinks'>
              <img src={womens} alt="" className="mens"/>Mobiles
              </NavLink>
              <NavDropdown.Item href="#action4">
              <img src={vessels} alt="" className="mens"/>Home & Kitchen
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
              <img src={toys} alt="" className="mens"/>Toys & Kids
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
             <img src={beauty} alt="" className="mens"/>Beauty & Health
              </NavDropdown.Item>
              <NavDropdown.Divider />
    <center><strong><h7>
              More Categories
              </h7></strong></center>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Automotives
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Mobiles & Accessories
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Sports & Fitness
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Books & Media
              </NavDropdown.Item>
            </NavDropdown>
            </div>


          <SearchBar/>


            <div className="Containers">
            <div style={{"position": "relative", "top" : "7px"}}>
            <NavLink style={{"text-decoration": "none"}} className="color" to="/cart">Cart<Icons.CartFill style={{"marginLeft" : "7px", "bottom" : "1.5px", "position" : "relative" , "color" : "white"}}/><span className="span-tag"><span className="span-tag-in">{totalcart}</span></span></NavLink></div>
            <div style={{"marginLeft": "24px", "position": "relative",
    "top": "-4px"}}>
    </div>
    <DropdownButton id="dropdown-item-button" title="Sign In" className="dummy-after">
 <div className="some-container">
  <Dropdown.Item as="button" onClick={handleShow}><NavLink style={{"text-decoration": "none", "color": "black"}} href="#action2"><center>Sign In</center></NavLink></Dropdown.Item>
  <Dropdown.Item as="button"><NavLink style={{"text-decoration": "none", "color": "black"}} href="#action2" to="/profile"><center>My Profile</center></NavLink></Dropdown.Item>
  <Dropdown.Item as="button"><NavLink style={{"text-decoration": "none", "color": "black"}} href="#action2" to="/"><center>Orders</center></NavLink></Dropdown.Item>
  <Dropdown.Item as="button"><NavLink style={{"text-decoration": "none", "color": "black"}} href="#action2" to="/"><center>Shortlist</center></NavLink></Dropdown.Item>
  <Dropdown.Item as="button"><center><input type="button" value="LOGOUT" className="logout-button"/></center></Dropdown.Item>
 </div>
</DropdownButton>
<Icons.PersonFill style={{"marginLeft" : "7px", "bottom" : "-9.5px", "position" : "relative", "color" : "white" , "backgroundColor" : "rgba(0,0,0,0.2)", "borderRadius" : "11px", "padding" :"2px", "width" : "20px", "height" : "20px", "left": "-14px"}}/>
            </div>
        </div>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </div>

   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><img src={logos} alt="" style={{"width": "90px"}}/>
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
            placeholder="Enter email"
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
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='example-in font-size-input'
          />
        </Form.Group>        
        {/* <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className='font-size-input'>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter valid password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='example-in font-size-input'
          />
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
        </Form.Group> */}

        
      <Button type="submit" className='example-btn' onClick={loginSave}>LOGIN</Button>
      <div className="mt-3" style={{"fontSize":"11px"}}>
      <center><a href="/" >Don't have an account?</a></center>
      </div>
</Form>
</div>

          </div>
        </Modal.Body>
      </Modal>


    </>
  );
}

export default Navigation;

