
import { BrowserRouter, Route, Routes } from "react-router-dom";


import AuctionPage from "../pages/AuctionPage.jsx"
import HomePage from "../pages/HomePage.jsx";
import Navbar from "./Navbar.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import Footer from "./Footer.jsx";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext.jsx";

export default function Router() {
  const { loggedIn } = useContext(GlobalContext);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          {loggedIn ? (
            <div>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/AuctionPage/:id" element={<AuctionPage />} />
                  {/* Alla andra paths när man är inloggad hamnar här */}
                </Routes>
              </div>
              <Footer />
            </div>
          ) : (
            <Routes>
              {/* Är man inte inloggad kommer man endast åt login och register */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/registerPage" element={<RegisterPage />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}
