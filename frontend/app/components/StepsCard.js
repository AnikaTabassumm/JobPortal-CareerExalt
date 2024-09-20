import React from 'react'

const StepsCard = ({icon, title, text}) => {
  return (
    <div className='w-full text-center bg-white px-6 py-8 md:px-10 md:py-12 shadow'> 
        <div className="flex justify-center pb-4">
            {icon}
        </div>
        <p className='font-semibold md:text-lg text-gray-800 pb-2'>{title}</p>
        <p className='text-gray-600 text-xs md:text-sm'>{text}</p>
    </div>
  )
}

export default StepsCard