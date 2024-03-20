import { Link } from "react-router-dom";

export default function Navbar() {
  return <>
    <nav>
      |&nbsp;
      <Link to={"/"}>Home</Link> |&nbsp;
      <Link to={"/secondPage"}>Andra sidan</Link> |&nbsp;
      <Link to={"/loginPage"}>Login</Link> |&nbsp;
    </nav>
  </>
}