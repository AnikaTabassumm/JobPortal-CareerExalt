import React from 'react'
import AdminRegistrationForm from '../components/AdminRegForm';

const Admin = () => {
  return (
    <div className="flex-grow overflow-y-auto h-screen bg-gray-100">
        <h1 className="text-gray-500 font-bold text-3xl text-center pt-20">Admin Registration/Login</h1>
        <div className="flex justify-center items-center py-10"> 
           <AdminRegistrationForm /> 
        </div>
        
    </div>
  )
}

export default Admin;