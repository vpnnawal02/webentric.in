import React from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Portfolio from "./pages/Portfolio"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ContactButtons from "./utils/ContactButtons"
import Pricing from "./pages/Pricing"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsOfService from "./pages/TermsOfService"
import CalculateProjectCost from "./pages/CalculateProjectCost"
import CustomWebsitePage from "./pages/CustomWebsitePage"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    })
  }, [])

  return (
    <>
      <Navbar />
      <ContactButtons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/price-calculator" element={<CalculateProjectCost />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
