import { BrowserRouter, Route, Routes } from "react-router-dom"

import HomePage from "../pages/HomePage.jsx"
import Navbar from "./Navbar.jsx"
import LoginPage from "../pages/LoginPage.jsx"
import RegisterPage from "../pages/RegisterPage.jsx"
import Footer from "./Footer.jsx"

export default function Router() {
  return (
    <BrowserRouter>    <div className="App">
      <Navbar />
      <div className="content">
        <Routes >
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
      </Routes>
      </div>
    </div>
    <Footer />
      
    </BrowserRouter>

  );
}