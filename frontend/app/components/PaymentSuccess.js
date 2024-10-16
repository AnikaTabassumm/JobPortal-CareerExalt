'use client';

// import { useRouter} from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  
    return (
      // <div className="flex justify-center items-center h-screen">
        <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          {transactionId && <p>Transaction ID: {transactionId}</p>}
          <p>Job Posted Successfully!</p>
        </div>
      // </div>
    );
}

export default PaymentSuccess