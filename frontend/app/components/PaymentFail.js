'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react'

const PaymentFail = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  
    return (
      // <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Payment Failed!</h1>
          {transactionId && <p>Transaction ID: {transactionId}</p>}
          <p>Job Posting Unsuccessful. Please try again.</p>
        </div>
      // </div>
    );
}

export default PaymentFail