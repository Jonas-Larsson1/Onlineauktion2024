import { useContext, useState } from "react"
import { GlobalContext } from "../GlobalContext";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";



export default function LoginPage() {

    const[usernameInput, setUsernameInput] = useState('')
    const[passwordInput, setPasswordInput] = useState('')
    const{ login } = useContext(GlobalContext)
    const navigate = useNavigate()


    const checkForUser = async (e) => {
        
      
      
      e.preventDefault()
        
        try {
          const response = await fetch('api/users');
          const credentials = await response.json();
          console.log('Response from server:', credentials);
          const user = credentials.find(user => user.username.toLowerCase() === usernameInput.toLowerCase() && user.password === passwordInput);
          if (user) {
            login()
            navigate("/")
          } else {
            console.log('Invalid username or password');
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };


       
      return<>
          <Form className='register-form'>
          <header>Login Page</header>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter username" value = {usernameInput}
              onChange={(e) =>  setUsernameInput(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter safe password" value = {passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" onClick={checkForUser}>
        Login
      </Button>
      <div><b>OR</b></div>  
            <Button>
              <Link className="register-link" to="/registerPage">Register!</Link>  
              </Button>
    </Form>
          {/* <form>
            <input
              type="text"
              placeholder="username"
              value = {usernameInput}
              onChange={(e) =>  setUsernameInput(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value = {passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <br />
          
        <Button
          onClick={checkForUser}>Login</Button>
      </form>  */}
           
      </>
}

