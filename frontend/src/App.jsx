import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Portfolio from "./pages/Portfolio"
import Services from "./pages/Services"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
