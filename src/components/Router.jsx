import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage.jsx"
import SecondPage from "../pages/SecondPage.jsx"
import AuctionPage from "../pages/AuctionPage.jsx"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"

export default function Router() {
  return (
    <BrowserRouter>    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SecondPage" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>

  );
}