import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";

import "../styles/styles.css";
import CheckoutNavButton from "./CheckoutNavButton.jsx";
import NotificationNavButton from "./NotificationNavButton.jsx";

const Navbar = () => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const { setShowLogoutAlert } = useContext(GlobalContext)
  const { loggedIn } = useContext(GlobalContext);
  const { logout } = useContext(GlobalContext);


  const toggleInputField = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleNavbarSearch = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const searchQuery = formData.get('searchQuery')

    setSearchValue('')
    toggleInputField()
    navigate(`/searchPage/${searchQuery}`)
  }

  return loggedIn ? (
    <nav
      className="navbar sticky-top border-bottom border-dark"
      style={{ backgroundColor: "#E27D60" }}
    >
      <Link className="ms-3" to="/">
        <img src="/src/assets/petabw.png" alt="petaLogo" height="80px" />
      </Link>

      <div className=" links fw-bold mx-2 text-decoration-none d-flex p-2">

        <button className="navbar-btn mx-2 text-decoration-none text-secondary">
          <Link to={`/searchPage/Collection`}>
            <img
              src="/src/assets/search.png"
              alt="Search button"
              height="40px"
            // onClick={toggleInputField}
            />
          </Link>
        </button>

        <button className="navbar-btn mx-2 text-decoration-none text-secondary" >
          <Link to="/NewAuction">
            <img src="/src/assets/selly.png" alt="Sell" height="40px" />
          </Link>
        </button>

        <button className="navbar-btn mx-2 text-decoration-none text-secondary">
          <Link to={"/AboutPage"}>
            <img
              src="/src/assets/info_sign-512.png"
              href=""
              alt="Help"
              height="40px"
            />
          </Link>
        </button>

        <button className="navbar-btn mx-2 text-decoration-none text-secondary" >
          <Link to="/AccountPage">
            <img src="/src/assets/account.webp" alt="Account" height="40px" />
          </Link>
        </button>

        <NotificationNavButton />

        <CheckoutNavButton />

        <button
          className="logout-btn"
          onClick={() => {
            logout(); // set loggedIn to false
            navigate("/")
            setShowLogoutAlert(true)

          }}>

          <img
            src="/src/assets/logout.png"
            className="logout-img"
            height="40px"
          />
        </button>
      </div>
    </nav>
  ) : (
    ""
  );
};

export default Navbar;