import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import HowWeWork from '../components/HowWeWork'
import Testimonials from '../components/Testimonials'

const Home = () => {
    return (
        <div>
            <Hero />
            <Services />
            <HowWeWork />
            <Testimonials id='testimonials' />
        </div>
    )
}

export default Home
