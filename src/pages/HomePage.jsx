import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { GlobalContext } from "../GlobalContext";

export default function HomePage() {

  const {loggedIn, setLoggedIn} = useContext(GlobalContext)


  return loggedIn ? <>
    <h1>Home!</h1>
    {console.log(loggedIn)}
    <Button>Hej på dej</Button>
    <div></div>
    </> : ""
 
}