import { Button } from 'react-bootstrap';
import React,{useRef,useState} from 'react'
import { Form } from 'react-bootstrap';

export default function FormValidation(){
    const nameRef=useRef("")
    const emailRef=useRef("")
    const passwordRef=useRef("")

    const [nameError,setNameErrror]=useState("Please Enter Your Name")
    const[emailError,setEmailErrror]=useState("Please Enter Your Email")
    const[passwordError,setPasswordErrror]=useState("Please Enter the password")

    const nameRegex = /^([a-zA-Z ]){2,30}$/;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const validateName = ()=>{
      const name=nameRef.current.value;
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
    
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!nameError && !emailError && !passwordError){
            alert("Successfully inserted")
        }else{
            alert("Form has errors")
        }
    }
  return (
    

    <div>{console.log("render")}
         <label><strong>Assignment-Two </strong> </label>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-1 w-25 me-auto ms-auto" >
            <Form.Label style={{display: "block", marginRight: "270px"}}>Name: </Form.Label>
            <Form.Control type="text" ref={nameRef} onChange={validateName}/>
            </Form.Group> 
           <span style={{fontSize:"10px",color:"red",display: "block", marginRight: "210px"}}>{nameError}</span> 
            <Form.Group className="mb-1 w-25  me-auto ms-auto" >
                <Form.Label style={{display: "block", marginRight: "270px"}}>Email: </Form.Label>
                <Form.Control  type="email" ref={emailRef} placeholder="name@example.com" onChange={validateEmail}/>
            </Form.Group>
            <span style={{fontSize:"10px",color:"red",display: "block", marginRight: "210px"}}>{emailError}</span> 

            <Form.Group className="mb-1 w-25  me-auto ms-auto" >
                <Form.Label style={{display: "block", marginRight: "270px"}}>Password: </Form.Label>
                <Form.Control type="password" ref={passwordRef} onChange={validatePassword}/>
            </Form.Group>
           <span style={{fontSize:"10px",color:"red",display: "block", marginRight: "200px"}}> {passwordError}</span>
            <Button className='mt-2' type='submit'>
                    Submit
            </Button>
        </Form>
        <hr></hr>
    </div>
  )
}