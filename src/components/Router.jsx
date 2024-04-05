import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";

import { GlobalContext } from "../GlobalContext.jsx";

import AuctionPage from "../pages/AuctionPage.jsx";
import ListPage from "../pages/ListPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import AccountPage from "../pages/AccountPage.jsx";
import NewAuctionPage from "../pages/NewAuctionPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";

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
                  <Route path="/" element={<ListPage />} />
                  <Route path="/AuctionPage/:id" element={<AuctionPage />} />
                  <Route path="/AccountPage/" element={<AccountPage />} />
                  <Route
                    path="/SearchPage/:incomingSearchQuery"
                    element={<SearchPage />}
                  />
                  <Route path="/AboutPage" element={<AboutPage />} />
                  <Route path="/NewAuction" element={<NewAuctionPage />} />
                  <Route path="*" element={<PageNotFound />}></Route>
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}
