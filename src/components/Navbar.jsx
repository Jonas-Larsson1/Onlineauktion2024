import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";

import "../styles/styles.css";
import { Button } from "react-bootstrap";

const Navbar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('')
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
        <div className=" links fw-bold mx-5 text-decoration-none d-flex p-2">
            <button className="navbar-btn container d-flex">
                <div className={`collapse ${isOpen ? 'show' : ''}`} id="searchField">
                    <form className="form-inline " onSubmit={handleNavbarSearch}>
                        <input 
                        className="form-control border border-dark form-control-l" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search" 
                        value={searchValue}
                        onChange={handleSearchValueChange} 
                        name="searchQuery" />
                    </form>
                </div>
                <img
                className="ms-5 "
                src="/src/assets/magnifyingGlass.webp"
                alt="Search button"
                height="40px"
                onClick={toggleInputField}
                />
            </button>

        <button className="navbar-btn mx-2 text-decoration-none text-secondary" >
        <Link className="ms-3" to="/NewAuction">
          <img src="/src/assets/sell.png" alt="Sell" height="40px" />
        </Link>
        </button>

        <Link to={"/AboutPage"}>
          <button className="navbar-btn mx-2 text-decoration-none text-secondary">
            <img
              src="/src/assets/info_sign-512.png"
              href=""
              alt="Help"
              height="40px"
            />
          </button>
        </Link>

        <button className="navbar-btn ms-2 text-decoration-none text-secondary" >
        <Link to="/AccountPage">
          <img src="/src/assets/account.webp" alt="Account" height="40px" />
          </Link>
        </button>
        <button
          className="logout-btn"
          onClick={() => {
            logout(); // set loggedIn to false
          }}
        >
          <img
            src="/src/assets/logout.webp"
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