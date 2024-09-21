import React from 'react'

const ResumeUpdate = ({count, status}) => {
  return (
    <div className='px-4 py-2 lg:py-4 lg:px-7 bg-indigo-400 text-white'>
        <h2 className='text-xl lg:text-3xl md:pb-3'>{count}</h2>
        <p className='text-sm lg:text-lg'>{status}</p>
    </div>
  )
}

export default ResumeUpdate