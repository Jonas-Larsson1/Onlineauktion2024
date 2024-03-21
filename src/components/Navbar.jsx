import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleInputField = () => {
        setIsOpen(!isOpen);
    };


    return (
        <nav className="navbar border-bottom border-dark" style={{ backgroundColor: "#E27D60" }}>
            <Link className="ms-3" to="/">
                <img src="/src/assets/petabw.png" alt="petaLogo" height="80px" />
            </Link>

            <div className="links fw-bold mx-5 text-decoration-none d-flex p-2">

                <div className="container d-flex">
                    
                    <div className={`collapse ${isOpen ? 'show' : ''}`} id="searchField">
                        <form className="form-inline ">
                            <input className="form-control border border-dark form-control-l" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>

                    <img className="ms-5"src="/src/assets/magnifyingGlass.webp" alt="Search button" height="40px" onClick={toggleInputField} />
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
            </div>

        </nav>
    );
}

export default Navbar;



