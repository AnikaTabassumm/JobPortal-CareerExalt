
import React from 'react';
import MemberNavbar from '../components/MemberNavbar';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';
import LandingPageNavbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <LandingPageNavbar />
      {/* <MemberNavbar /> */}
      <div className="flex pt-16"> 
        <Sidebar />
        <div className="flex-grow overflow-y-auto h-screen bg-gray-100 ml-12 md:ml-16">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
