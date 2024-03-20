import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import { GlobalContext } from "../GlobalContext";

export default function HomePage() {
  const [show, setShow] = useState(true)
  const {loggedIn, setLoggedIn} = useContext(GlobalContext)


  return loggedIn ? <>
    <h1>Home!</h1>
    {console.log(loggedIn)}
    <Button>Hej på dej</Button>
    <Alert show={show} variant="success">
        <Alert.Heading>Welcome to the exclusive auctioNEXT!</Alert.Heading>
        <p>
          Happy bidding!
        </p>
        <hr />
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button>
        
      </Alert>

    
    </> : ""
 
}