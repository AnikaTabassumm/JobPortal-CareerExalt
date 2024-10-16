import React from 'react'
import CompanyProfile from '../../components/CompanyProfile'
import Footer from '../../components/Footer'

const page = ({params}) => {
  const {id} = params;
  return (
    <><div className="flex justify-center overflow-y-auto h-screen bg-gray-100">
        <div className="flex-grow py-16">
            <CompanyProfile id={id}/>
        </div>
        
        </div>
    <Footer />
    </>
    
  )
}

export default page