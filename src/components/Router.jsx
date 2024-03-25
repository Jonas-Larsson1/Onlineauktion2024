import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage.jsx"
import AuctionPage from "../pages/AuctionPage.jsx"
import Navbar from "./Navbar.jsx"
import SearchPage from "../pages/SearchPage.jsx"
import Footer from "./Footer.jsx"

export default function Router() {
  return (
    <BrowserRouter>    <div className="App">
      <Navbar />
      <div className="content">
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/AuctionPage/:id" element={<AuctionPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        </Routes>
      </div>
    </div>
    <Footer />
    </BrowserRouter>
  );
}