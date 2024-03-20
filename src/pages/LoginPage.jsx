import { useState } from "react"



export default function LoginPage() {
    const[usernameInput, setUsernameInput] = useState('')
    const[passwordInput, setPasswordInput] = useState('')
    const[loggedIn, setLoggedIn] = useState(false)
   
    const checkForUser = async (e) => {
        e.preventDefault()
        
        try {
          const response = await fetch('api/users');
          const credentials = await response.json();
          console.log('Response from server:', credentials);
          const user = credentials.map(user => user.username === usernameInput && user.password === passwordInput);
          if (user) {
            setLoggedIn(true)
          } else {
            console.log('Invalid username or password');
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };

        if(loggedIn){
            window.location.href = "/"
            return null
        }

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
          
        <button
          onClick={checkForUser}></button>
      </form> 
    </>
}

