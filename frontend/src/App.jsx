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
import PopUpForm from "./components/PopUpForm"
import AdminDashboard from "./admin_dashboard/AdminDashboard"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import WebsiteDevelopment from "./pages/services/WebsiteDevelopment"
import WebDesign from "./pages/services/WebDesign"
import EcommerceDevelopment from "./pages/services/EcommerceDevelopment"
import CustomSoftwareDevelopment from "./pages/services/CustomSoftwareDevelopment"
import WebApplicationDevelopment from "./pages/services/WebApplicationDevelopment"
import LandingPageDevelopment from "./pages/services/LandingPageDevelopment"
import WebsiteRedesign from "./pages/services/WebsiteRedesign"
import WebsiteMaintenance from "./pages/services/WebsiteMaintenance"
import SeoServices from "./pages/services/SeoServices"
import DelhiLocation from "./pages/locations/Delhi"
import DelhiNCRLocation from "./pages/locations/DelhiNCR"
import NoidaLocation from "./pages/locations/Noida"
import GurgaonLocation from "./pages/locations/Gurgaon"
import SmallBusiness from "./pages/industries/SmallBusiness"
import Startups from "./pages/industries/Startups"
import Education from "./pages/industries/Education"
import RestaurantsCafes from "./pages/industries/RestaurantsCafes"
import Fitness from "./pages/industries/Fitness"
import ScrollToTop from "./utils/ScrollToTop"
// Offer popup temporarily disabled — uncomment to re-enable.
// import OfferPopup from "./utils/OfferPopUp"
import LoadingScreen from "./utils/LoadingScreen"
import BlogsPage from "./pages/Blogs/BlogPage"
import BlogDetail from "./pages/Blogs/BlogDetail"



function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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
          {/* Offer popup disabled — uncomment to re-enable. */}
          {/* <OfferPopup /> */}
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
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />

            {/* Service Routes */}
            <Route path="/website-development" element={<WebsiteDevelopment />} />
            <Route path="/web-design" element={<WebDesign />} />
            <Route path="/ecommerce-development" element={<EcommerceDevelopment />} />
            <Route path="/custom-software-development" element={<CustomSoftwareDevelopment />} />
            <Route path="/web-application-development" element={<WebApplicationDevelopment />} />
            <Route path="/landing-page-development" element={<LandingPageDevelopment />} />
            <Route path="/website-redesign" element={<WebsiteRedesign />} />
            <Route path="/website-maintenance" element={<WebsiteMaintenance />} />
            <Route path="/seo-services" element={<SeoServices />} />

            {/* Location Routes */}
            <Route path="/locations/delhi" element={<DelhiLocation />} />
            <Route path="/locations/delhi-ncr" element={<DelhiNCRLocation />} />
            <Route path="/locations/noida" element={<NoidaLocation />} />
            <Route path="/locations/gurgaon" element={<GurgaonLocation />} />

            {/* Industry Routes */}
            <Route path="/industries/small-business" element={<SmallBusiness />} />
            <Route path="/industries/startups" element={<Startups />} />
            <Route path="/industries/education" element={<Education />} />
            <Route path="/industries/restaurants-cafes" element={<RestaurantsCafes />} />
            <Route path="/industries/fitness" element={<Fitness />} />

            {/* Admin Routes  */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>

  )
}

export default App
