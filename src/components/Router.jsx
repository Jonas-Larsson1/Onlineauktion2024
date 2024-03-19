import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage.jsx"
import SecondPage from "../pages/SecondPage.jsx"
import AuctionPage from "../pages/AuctionPage.jsx"
import Navbar from "./Navbar.jsx"

export default function Router() {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SecondPage" element={<SecondPage />} />
        <Route path="/AuctionPage/:id" element={<AuctionPage />} />
      </Routes>
    </BrowserRouter>
  </>
}