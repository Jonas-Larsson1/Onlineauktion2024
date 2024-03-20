import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar fixed-top border-bottom border-dark" style={{ backgroundColor: "#E27D60" }}>
            <Link className="mx-3" to="/">
                <img src="/src/assets/petabw.png" alt="petaLogo" height="80px" />
            </Link>

            <div className="links fw-bold mx-5 text-decoration-none">
                <Link className="mx-3 text-decoration-none text-secondary" to="/">Help</Link>
                <Link className="mx-3 text-decoration-none text-secondary" to="/">Sell</Link>
                <Link className="mx-3 text-decoration-none text-secondary" to="/">Account</Link>
            </div>

        </nav>
    );
}

export default Navbar;