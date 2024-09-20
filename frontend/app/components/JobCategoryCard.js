'use client';

import React from 'react';
import { ItSvg } from '../public/images/SVG/svg';


const JobCategoryCard = () => {
  return (
    <div className="py-5 px-16 text-center hover:shadow-md bg-white cursor-pointer">
      <div className="flex justify-center py-2">
        <ItSvg />
      </div>
      <p className="text-black text-lg">IT Engineer</p>
      <p className="text-xs font-semibold hover:text-blue-800">3 open positions</p>
    </div>
  );
};

export default JobCategoryCard;