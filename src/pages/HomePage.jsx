import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import { GlobalContext } from "../GlobalContext";
import "../styles/styles.css"

export default function HomePage() {
  
  const {loggedIn, setLoggedIn} = useContext(GlobalContext)
  const {show, setShow} = useContext(GlobalContext)
  const {hideAlert} = useContext(GlobalContext)

  
  return loggedIn ? <>
  <div className="homepage-content">
    <h1>Home!</h1>
    <Button>Hej på dej</Button>
    {
        show ? 
      <Alert show={show} variant="success" className="alert">
        <Alert.Heading>Welcome to the exclusive online auction site <em>Peta!</em></Alert.Heading>
        <p>
          Happy bidding!
        </p>
        <hr />
          <Button onClick={() => hideAlert()} variant="outline-success">
            Close me
          </Button>
        
      </Alert> : ""
    }
  </div>   
    </> : ""
 
}