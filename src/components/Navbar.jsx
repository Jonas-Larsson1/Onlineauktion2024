import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import Button from "react-bootstrap/esm/Button";
import "../pages/styles.css"

export default function Navbar() {
  const {loggedIn, setLoggedIn} = useContext(GlobalContext)
  return <>
    <nav>
      |&nbsp;
      <Link to={"/"}>Home</Link> |&nbsp;
      <Link to={"/secondPage"}>Andra sidan</Link> |&nbsp;
      {loggedIn ?  <button className="logout-btn" onClick={() => {
            setLoggedIn(false)
      }}>Logout</button> :  <Link to={"/loginPage"}>Login</Link>}
      
    </nav>
  </>
}