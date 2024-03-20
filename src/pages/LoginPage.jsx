import { useContext, useState } from "react"


export default function LoginPage() {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

   
    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
          const response = await fetch('api/users');
          const credentials = await response.json();
          console.log('Response from server:', credentials);
          const user = credentials.map(user => user.username === username && user.password === password);
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
              value = {username}
              onChange={(e) =>  setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
          
        <button
          onClick={handleLogin}></button>
      </form>
    </>
}

