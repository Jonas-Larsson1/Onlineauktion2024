import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <nav className="navbar fixed-bottom border-top border-dark" style={{ backgroundColor: "#E27D60" }}>
            <Link className="mx-3" to="/">
                <img src="/src/assets/petaicon.png" alt="petaLogo" height="50px" />
            </Link>

            <span class="fw-bold text-secondary">
            ©Procuring Every Thinkable Animal Auctions 2024
            </span>

            <div className="links fw-bold mx-5 text-decoration-none">
            <Link className="mx-3" to="mailto:denhärmailenfunkarinte@glömdet.com" target="_blank">
                <img src="/src/assets/em.webp" alt="email logo" height="40px" />
            </Link>    
            <Link className="mx-3" to="https://www.don't-call-us-we'll-call-you.com">
                <img src="/src/assets/tp.png" alt="telephone logo" height="40px" />
            </Link>
            <Link className="mx-3" to="https://www.facebook.com/">
                <img src="/src/assets/fb.webp" alt="facebook logo" height="40px" />
            </Link>
            <Link className="mx-3" to="https://www.instagram.com/">
                <img src="/src/assets/ig.webp" alt="instagram logo" height="40px" />
            </Link>
            <Link className="mx-3" to="https://www.youtube.com/">
                <img src="/src/assets/yt.webp" alt="youtube logo" height="40px" />
            </Link>
            </div>

        </nav>
    );
}

export default Footer;