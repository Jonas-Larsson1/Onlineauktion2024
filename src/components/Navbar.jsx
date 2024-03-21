import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";

import "../pages/styles.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn } = useContext(GlobalContext);
  const { logout } = useContext(GlobalContext);
  const toggleInputField = () => {
    setIsOpen(!isOpen);
  };

  return loggedIn ? (
    <nav
      className="navbar sticky-top border-bottom border-dark"
      style={{ backgroundColor: "#E27D60" }}
    >
      <Link className="ms-3" to="/">
        <img src="/src/assets/petabw.png" alt="petaLogo" height="80px" />
      </Link>

      <div className="links fw-bold mx-5 text-decoration-none d-flex p-2">
        <div className="container d-flex">
          <div className={`collapse ${isOpen ? "show" : ""}`} id="searchField">
            <form className="form-inline ">
              <input
                className="form-control border border-dark form-control-l"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>

          <img
            className="ms-5"
            src="/src/assets/magnifyingGlass.webp"
            alt="Search button"
            height="40px"
            onClick={toggleInputField}
          />
        </div>

        <Link className="mx-2 text-decoration-none text-secondary" to="/">
          <img src="/src/assets/sell.png" alt="Sell" height="40px" />
        </Link>
        <Link className="mx-2 text-decoration-none text-secondary" to="/">
          <img src="/src/assets/help.webp" alt="Help" height="40px" />
        </Link>
        <Link className="ms-2 text-decoration-none text-secondary" to="/">
          <img src="/src/assets/account.webp" alt="Account" height="40px" />
        </Link>
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
