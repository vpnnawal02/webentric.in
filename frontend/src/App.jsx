import React from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react"
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
import PopUpForm from "./components/PopUpForm"
import AdminDashboard from "./admin_dashboard/AdminDashboard"
import Login from "./pages/Login"
import OfferPopup from "./utils/OfferPopUp"
import ScrollToTop from "./utils/ScrollToTop"
import LoadingScreen from "./utils/LoadingScreen"



function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    })
  }, [])

  return (

    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <ScrollToTop />
          <OfferPopup />
          <Navbar />
          <ContactButtons />
          <Routes>

            {/* Public Routes  */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/price-calculator" element={<CalculateProjectCost />} />

            {/* Admin Routes  */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>

  )
}

export default App
