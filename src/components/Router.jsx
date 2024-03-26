
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import AuctionPage from "../pages/AuctionPage.jsx"
// import HomePage from "../pages/HomePage.jsx";
import Navbar from "./Navbar.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import SearchPage from "../pages/SearchPage.jsx"
import Footer from "./Footer.jsx";
import AccountPage from "../pages/AccountPage.jsx";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import AboutPage from "../pages/AboutPage.jsx";

export default function Router() {
  const { loggedIn } = useContext(GlobalContext);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          {!loggedIn && <Navigate to='/' /> }
          {loggedIn ? (
            <div>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<ListPage />} />
                  <Route path="/AuctionPage/:id" element={<AuctionPage />} />
                  <Route path="/AccountPage/" element={<AccountPage />} />
                  <Route
                    path="/SearchPage/:incomingSearchQuery"
                    element={<SearchPage />}
                  />
                  <Route path="/AboutPage" element={<AboutPage />} />
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
