import React from 'react'
import SEO from "../components/SEO.jsx";
import { SITE, organizationSchema, websiteSchema, localBusinessSchema, breadcrumbSchema } from "../utils/seoMeta.js";
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import HowWeWork from '../components/HowWeWork'
import Testimonials from '../components/Testimonials'
import WhyChooseUs from '../components/WhyChooseUs'

const Home = () => {
    return (
        <div>
            <SEO
                title="Website Development Company in Delhi, India | Webentric"
                description="Webentric is a website development company in Delhi, India building fast, SEO-friendly business websites, e-commerce stores & landing pages that convert."
                keywords={["website development company in Delhi", "web design services Delhi", "website designer Delhi", "website development services India", "ecommerce website development Delhi", "landing page design India"]}
                canonical={SITE.url}
                schema={[organizationSchema(), websiteSchema(), localBusinessSchema(), breadcrumbSchema([{ name: "Home", url: SITE.url }])]}
            />
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <HowWeWork />
            <Testimonials id='testimonials' />
        </div>
    )
}

export default Home