import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage.jsx"
import SecondPage from "../pages/SecondPage.jsx"
import Navbar from "./Navbar.jsx"
import LoginPage from "../pages/LoginPage.jsx"
import RegisterPage from "../pages/RegisterPage.jsx"

export default function Router() {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SecondPage" element={<SecondPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </>
}