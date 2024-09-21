import React from 'react'
import MemberNavbar from '../components/MemberNavbar'
import Sidebar from '../components/SideBar'

const layout = ({children}) => {
  return (
    <div>
        <MemberNavbar />
        <div className="flex">
            <Sidebar />
            <div className='bg-gray-100 flex-grow ps-12 '>
                {children}
            </div>
            
        </div>
    </div>
  )
}

export default layout