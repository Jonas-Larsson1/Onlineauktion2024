import { useContext, useState } from "react"


export default function LoginPage() {
    const[usernameInput, setUsernameInput] = useState('')
    const[passwordInput, setPasswordInput] = useState('')

   
    const checkForUser = async (e) => {
        e.preventDefault()
        
        try {
          const response = await fetch('api/users');
          const credentials = await response.json();
          console.log('Response from server:', credentials);
          const user = credentials.map(user => user.username === usernameInput && user.password === passwordInput);
          if (user) {
           
            console.log('Login successful');
          } else {
            console.log('Invalid username or password');
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };



      return <>
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
          
        <button
          onClick={checkForUser}></button>
      </form>
    </>
}

