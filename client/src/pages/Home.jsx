import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AItoolsSection from '../components/AItoolsSection'
import TestimonialCard from '../components/TestimonialCard'
import Testimonials from '../components/Testimonials'
import PricingSection from '../components/PricingSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero/>
      <AItoolsSection/>
      <PricingSection/>
      <Testimonials/>
      <Footer/>
    </>
  )
}

export default Home