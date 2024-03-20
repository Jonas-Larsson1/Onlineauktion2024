import { useContext, useState } from "react"
import { GlobalContext } from "../GlobalContext";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";



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
          <header>Login</header>
          <form>
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
      </form> 
    </>
}

