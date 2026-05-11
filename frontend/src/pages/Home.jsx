import React from 'react'
import { Helmet } from "react-helmet"
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import HowWeWork from '../components/HowWeWork'
import Testimonials from '../components/Testimonials'
import WhyChooseUs from '../components/WhyChooseUs'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Web Development Company in Delhi | Webentric</title>

                <meta
                    name="description"
                    content="We build high-converting, modern websites for businesses in Delhi. Fast, SEO-friendly and designed to grow your business."
                />

                <meta
                    name="keywords"
                    content="website development, website design, web development, website development services"
                />

                {/* Open Graph (for sharing preview) */}
                <meta property="og:title" content="Web Development Company in Delhi | Webentric" />
                <meta property="og:description" content="We build modern, high-converting websites for businesses in Delhi." />
                <meta property="og:type" content="website" />
            </Helmet>
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