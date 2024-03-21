import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "/src/HomePage.jsx";
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import AccountPage from "/src/pages/AccountPage.jsx";

export default function Router() {
  return (
    <BrowserRouter>    <div className="App">
      <Navbar />
      <div className="content">
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="AccountPage" element={<AccountPage />} />
        </Routes>
      </div>
    </div>
    <Footer />
    </BrowserRouter>

  );
}