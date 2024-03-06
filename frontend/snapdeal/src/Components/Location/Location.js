import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import location from "../Images/loc.png";
import "../SideBar/sidebar.css";
import "./Location.css";
import check from "../Images/approved.png";
import no from "../Images/no.png";

function Location() {
    const[pincode, setPinCode] = useState('');
    const[result, setResult] = useState('');
    const[icon, setIcon] = useState(null);

    const CheckPinCode = () => {
      const url = `http://localhost:8080/pincode/${pincode}`;

      fetch(url)
          .then((response) => response.json())
          .then((data) => {
              if (data && data.pincode_id && data.pincode) {
                  setResult(`Pincode ${data.pincode} is deliverable.`);
                  setIcon(check);
              } else {
                  setResult('Invalid type for pincode');
                  setIcon(no);
              }
          })
          .catch((error) => {
              console.error('Error:', error);
              setResult('Pincode is not deliverable');
              setIcon(no);
          });
  };

  const validPincode = pincode.length===6;

  const resultStyle = {
    color: result.includes('not') ? 'red' : 'green',
  };

  return (
    <div>
      <Card className='FirstLoc'>
      <Card.Img variant="top" src={location} className="LocImg"/>
      <Card.Body>
        <Card.Title style={{"fontSize" : "14px"}}><center>Your Delivery Pincode</center></Card.Title>
        <Card.Text style={{"fontSize" : "12px" }}>
        <center>Enter your pincode to check availability and faster delivery options</center>
        </Card.Text >
        <input placeholder="Enter pincode" type="text" className='LocIn' value={pincode} onChange={e=> setPinCode(e.target.value)}/>
        <div className="flexCon">
        <Button className='LocBut' onClick={CheckPinCode} disabled={!validPincode}>Submit</Button>
        <Button variant="primary" style={{"fontSize" : "14px"}} disabled>Next</Button>
        <p className='LocP' style={resultStyle}><span>{icon && <img src={icon} alt="icon" className='iconss'/>}</span>{result}</p>
        </div>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Location
