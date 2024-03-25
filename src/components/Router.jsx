import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "/src/HomePage.jsx";
import Navbar from "./Navbar.jsx"
import ListPage from "../pages/ListPage.jsx"
import Footer from "./Footer.jsx"

export default function Router() {
  return (
    <BrowserRouter>    <div className="App">
      <Navbar />
      <div className="content">
        <Routes >
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
    <Footer />
    </BrowserRouter>

  );
}