import React from 'react'
import CompList from '../components/CompList'
import LandingPageNavbar from '../components/Navbar'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
      <LandingPageNavbar  />
      <CompList />
      <Footer />
      </div>
  )
}

export default page