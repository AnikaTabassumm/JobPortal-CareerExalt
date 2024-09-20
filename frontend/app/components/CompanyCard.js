import React from 'react';

const CompanyCard = ({ img, name, positions }) => {
  return (
    <div className='py-14 px-16 text-center bg-white border rounded cursor-pointer'>
      <img
        className='rounded-full w-24 h-24 mx-auto mb-4'
        src={img}
        alt={name}
      />
      <p className='text-black text-xl'>{name}</p>
      <p className='text-xs font-semibold'>{positions} open positions</p>
    </div>
  );
};

export default CompanyCard;
