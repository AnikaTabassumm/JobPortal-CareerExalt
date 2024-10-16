import Footer from '@/app/components/Footer'
import MemberNavbar from '@/app/components/MemberNavbar'
import LandingPageNavbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/SideBar'
import React from 'react'

const page = () => {
  return (
    <div>
      <LandingPageNavbar />
      <div className="flex pt-16"> {/* Add padding-top to offset the fixed navbar */}
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto h-screen bg-gray-100 ml-12 md:ml-16">
          <h1 className="font-bold text-3xl ps-10">Dashboard</h1>
        </div>
      </div>

    </div>
  )
}

export default page