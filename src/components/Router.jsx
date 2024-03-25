import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "/src/HomePage.jsx";
import Navbar from "./Navbar.jsx"
<<<<<<< HEAD
import ListPage from "../pages/ListPage.jsx"
=======
import Footer from "./Footer.jsx"
>>>>>>> main

export default function Router() {
  return (
    <BrowserRouter>    <div className="App">
      <Navbar />
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/secondPage" element={<SecondPage />} />
        <Route path="/auctions" element={<ListPage />} />
      </Routes>
=======
      <div className="content">
        <Routes >
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
    <Footer />
>>>>>>> main
    </BrowserRouter>

  );
}