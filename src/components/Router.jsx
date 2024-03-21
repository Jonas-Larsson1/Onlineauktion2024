import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage.jsx"
import SecondPage from "../pages/SecondPage.jsx"
import Navbar from "./Navbar.jsx"
import App from "../App.jsx"

export default function Router() {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/SecondPage" element={<SecondPage />} />
        
      </Routes>
    </BrowserRouter>
  </>
}