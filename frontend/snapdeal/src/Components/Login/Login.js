import React, { useRef, useState } from "react";
import "./Login.css";
import { Form } from "react-bootstrap";
import logo from '../Images/logo.png'
import * as Icons from 'react-bootstrap-icons'
import swal from 'sweetalert';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function Login() {
  const navigate = useNavigate();
  const nameRef=useRef("")
  const emailRef=useRef("")
  const passwordRef=useRef("")
  const phoneRef = useRef(null);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const nameValue = nameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    const isNameValid = nameValue !== '';
    const isEmailValid =emailValue !== '';
    const isPasswordValid = passwordValue !== '';

    setIsValid(isNameValid && isEmailValid && isPasswordValid);
  };

  const [nameError,setNameErrror]=useState("Please Enter Your Name")
  const[emailError,setEmailErrror]=useState("Please Enter Your Email")
  const[phoneError,setPhoneError]=useState("Please Enter Your Phone Number")
  const[passwordError,setPasswordErrror]=useState("Please Enter the password")

  const nameRegex = /^([a-zA-Z ]){2,30}$/;
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const phoneRegex = /^\d{10}/

  const validateName = ()=>{
    const name=nameRef.current.value;
    if(state === "Sign In"){}
      if(!nameRegex.test(name)){
          setNameErrror("Invalid Name");
      }else if(!(nameError === "")){
          setNameErrror("");
      }
  }
  const validateEmail =()=> {
    const email=emailRef.current.value;
    setEmailErrror(emailRegex.test(email)?'':'Invalid Email')
  }
  const validatePassword = ()=> {
      const pass=passwordRef.current.value;
      setPasswordErrror(passwordRegex.test(pass)?'':'Invalid Password')
    }

  const validatePhone = () => {
    const phone = phoneRef.current.value;
    setPhoneError(phoneRegex.test(phone) ? '' : 'Invalid Phone Number')
  }
  
  const handleSubmit=(e)=>{
      e.preventDefault()
      if(!nameError && !emailError && !passwordError && !phoneError){
          alert("Successfully inserted");
      }else{
        alert("Form has errors");
      }
  }


  const [state, setState] = useState("Log In")
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function save(e)
  {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:8080/createuser",
      {
        register_name: name,
        email:email,
        register_phone: phone,
        password: password
      });
      if(response.data === "Email already Exists"){
        swal({title: "Failure", text: "User Already Registered", icon: "warning"});
      } 
      else if(response.data === "User Registration Successful"){
      console.log("success")
      swal({title: "Success", text: "User Registered Successfully", icon: "success"});
      setId("");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      }
    }
    catch(err){
      swal("failure");
    }
  }

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
          navigate('/home')

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
    <div className="background">
      <Form onSubmit={handleSubmit}>
      {/* <ToastContainer/> */}
        <div className="containers">
          <div className="header">
          <img src={logo} alt="" className="imager"/>
            <div className="underline" ></div>
            <div className="text">{state}</div>
            </div>
            <div className="inputs">
            <input type="id" value={id} onChange={(e)=>setId(e.target.value)} style={{"display": "none"}}/>
           
            {state === "Log In" ? <div></div> : <><div className="input"><Icons.PersonCircle className="fillsvg"/><input type="name" id="names" value={name} ref={nameRef} onInput={() =>{validateName(); validateForm()}} onChange={(e)=>setName(e.target.value)}/></div> <span style={{fontSize:"10px",color:"red",display: "block", marginLeft: "19px"}}>{nameError}</span> </> }
            
           
              <div className="input">
              <Icons.EnvelopeAtFill className="fillsvg"/>
                <input type="email" name="email" ref={emailRef} onInput={() =>{validateEmail(); validateForm()}} value={email} onChange={(e)=>setEmail(e.target.value)}/>
          

                
              </div>
              <span style={{fontSize:"10px",color:"red",display: "block",marginLeft: "19px"}}>{emailError}</span> 
              {state === "Log In" ? <div></div> : <><div className="input"><Icons.TelephoneFill className="fillsvg"/><input type="name" name="phone" onInput={() =>{validatePhone(); validateForm()}} ref={phoneRef} value={phone} onChange={(e)=>setPhone(e.target.value)}/></div><span style={{fontSize:"10px",color:"red",display: "block", marginLeft: "19px"}}>{phoneError}</span> </>}

              <div className="input">
              <Icons.KeyFill className="fillsvg"/>
                <input type="password" name="password" ref={passwordRef} onInput={() =>{validatePassword(); validateForm()}}  value={password} onChange={(e)=>setPassword(e.target.value)}/>
               

              </div>
              <span style={{fontSize:"10px",color:"red",display: "block", marginLeft: "19px"}}>{passwordError}</span> 
            </div>
            {state === "Sign In" ? <div></div>: <div className="forget-password">Forgot password?</div>}
            <button className="submitted main-button" disabled={!isValid} onClick={state === "Sign In" ? save : loginSave}>{state}</button>
            <div className="submit-container">
              <div className={state==="Sign In" ? "submit change" : "submit "} onClick={()=>{setState("Sign In")}}>Sign In</div>
              <div className={state==="Log In" ? "submit change" : "submit"} onClick={()=>{setState("Log In")}}>Log In</div>
            </div>
        </div>
      </Form>
    </div>
  );
}
