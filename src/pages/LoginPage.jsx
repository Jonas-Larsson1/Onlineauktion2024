import { useState } from "react"

export default function LoginPage() {
    const[usernameInput, setUsernameInput] = useState('')
    const[passwordInput, setPasswordInput] = useState('')

    const updateUsernameValue = (event) => {
        setUsernameInput(event.target.value);
      };
      const updatePasswordValue = (event) => {
        setPasswordInput(event.target.value);
      };
    
      return <>
          <header>Login</header>
          <form>
            <input
              type="text"
              placeholder="username"
              onChange={updateUsernameValue}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={updatePasswordValue}
            />
            <br />
            </form>
            </>
}
