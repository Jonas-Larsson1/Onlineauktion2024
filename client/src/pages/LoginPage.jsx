import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function LoginPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");


  const { login } = useContext(GlobalContext);
  const { displayAlert } = useContext(GlobalContext);
  const { showLogoutAlert } = useContext(GlobalContext);

  const checkForUser = async (e) => {
    e.preventDefault()

    const data = {
      username: usernameInput,
      password: passwordInput
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    
    if (response.status == 201) {
      login(result.loggedIn)
    } else if (response.status == 404) {
      alert(result.message)
    } else if (response.status == 409) {
      alert(result.message)
    }
    
  }
 
  // const checkForUser = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("api/users");
  //     const credentials = await response.json();
  //     const user = credentials.find(
  //       (user) =>
  //         user.username.toLowerCase() === usernameInput.toLowerCase() &&
  //         user.password === passwordInput
  //     );

  //     if (user) {
  //       login(user.id); // set loggedIn to true
  //       displayAlert();
  
  //     } else {
  //       setError("Invalid username or password");
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // };

  return (
    <>
      <Form className="register-form">
        <header>Login Page</header>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter username"
            value={usernameInput} // The value that is submitted
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter safe password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

        <Button variant="primary" onClick={checkForUser}>
          Login
        </Button>

        <div>{error}</div>
        <div>
          <b>OR</b>
        </div>
        
      
        <Button>
          <Link className="register-link" to="/registerPage">
            Register!
          </Link>
        </Button>
        {showLogoutAlert ? (
         
          <Alert
            className= "logout-alert"
            severity="info"
          >
           <em>
             Goodbye, you are now logged out! 
            </em>
        
          </Alert> 
        ) : (
          ""
        )}
      </Form>
    </>
  );
}
