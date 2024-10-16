import Footer from '@/app/components/Footer'
import MemberNavbar from '@/app/components/MemberNavbar'
import LandingPageNavbar from '@/app/components/Navbar'
import CreatePackageForm from '@/app/components/PackageForm'
import Sidebar from '@/app/components/SideBar'
import React from 'react'

const page = () => {
  return (
    <div>
        <LandingPageNavbar />
      <div className="flex pt-16"> 
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-grow overflow-y-auto h-screen bg-gray-100 ml-12 md:ml-16">
        <CreatePackageForm/>
        </div>
      </div>

        </div>
  )
}

export default page