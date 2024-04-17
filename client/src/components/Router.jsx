import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import ProtectedRoute from "../validation/ProtectedRoute.jsx";

import AuctionPage from "../pages/AuctionPage.jsx";
import ListPage from "../pages/ListPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import AccountPage from "../pages/AccountPage.jsx";
import NewAuctionPage from "../pages/NewAuctionPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import AccountPageOngoingBids from "../pages/AccountPageOngoingBids.jsx";
import AccountPageOngoingAuctions  from "../pages/AccountPageOngoingAuctions.jsx";
import AccountPageClosedAuctions from "../pages/AccountPageClosedAuctions.jsx";
import AccountPageSavedAuctions from "../pages/AccountPageSavedAuctions.jsx";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";


export default function Router() {

  return (
    <>
      <BrowserRouter>
        <div className="App">
            <div>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={
                    <ProtectedRoute>
                      <ListPage />
                    </ProtectedRoute>
                  } /> 
                  <Route path="/AuctionPage/:id" element={
                    <ProtectedRoute>
                      <AuctionPage /> 
                    </ProtectedRoute>
                  } />
                  <Route path="/AccountPage/" element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/AccountPage/OngoingBids" element={
                    <ProtectedRoute>
                      <AccountPageOngoingBids />
                    </ProtectedRoute>
                  } />
                  <Route path="/AccountPage/OngoingAuctions" element={
                    <ProtectedRoute>
                      <AccountPageOngoingAuctions />
                    </ProtectedRoute>
                  } />
                  <Route path="/AccountPage/ClosedAuctions" element={
                    <ProtectedRoute>
                      <AccountPageClosedAuctions />
                    </ProtectedRoute>
                  } />
                  <Route path="/AccountPage/SavedAuctions" element={
                    <ProtectedRoute>
                      <AccountPageSavedAuctions />
                    </ProtectedRoute>
                  } />
                  <Route path="/SearchPage/:incomingSearchQuery" element={
                    <ProtectedRoute>
                      <SearchPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/AboutPage" element={
                    <ProtectedRoute>
                      <AboutPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/NewAuction" element={
                    <ProtectedRoute>
                      <NewAuctionPage /> 
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={
                    <ProtectedRoute>
                      <PageNotFound />
                    </ProtectedRoute>
                  } />

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/registerPage" element={<RegisterPage />} />

                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </div>
              <Footer />
            </div>
        </div>
      </BrowserRouter>
    </>
  );
}
