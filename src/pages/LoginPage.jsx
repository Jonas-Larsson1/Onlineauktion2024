import { useContext, useState } from "react"
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const[usernameInput, setUsernameInput] = useState('')
    const[passwordInput, setPasswordInput] = useState('')
    const [submittedUsername, setSubmittedUsername] = useState("");
    const [submittedPassword, setSubmittedPassword] = useState("");

    const updateUsernameValue = (event) => {
        setUsernameInput(event.target.value);
      };
      const updatePasswordValue = (event) => {
        setPasswordInput(event.target.value);
      };
      const { user } = useContext(GlobalContext);
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
            {user
          ? user.map((user, index) =>
              checkForUser(submittedUsername, submittedPassword, user) ? 
                (
                   <Link key={index} to={"/"}>Logged in!</Link> 
                
                )
               : null
            )
          : null}

        <button
          onClick={(e) => {
            setSubmittedUsername(usernameInput);
            setSubmittedPassword(passwordInput);
            console.log();
            e.preventDefault()
          
          }}
        ></button>
      </form>
    </>
}

function checkForUser(username, password, user) {

   

  if (user.username === username && user.password === password) {
    
    return true
  }
}
