import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Portfolio from "./pages/Portfolio"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ContactButtons from "./utils/ContactButtons"
import Pricing from "./pages/Pricing"

function App() {
  return (
    <>
      <Navbar />
      <ContactButtons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
