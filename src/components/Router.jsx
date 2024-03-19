import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage.jsx"
import SecondPage from "../pages/SecondPage.jsx"
import Navbar from "./Navbar.jsx"

export default function Router() {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SecondPage" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  </>
}