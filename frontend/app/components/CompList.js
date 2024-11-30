'use client';

import { getAllEmployers } from '@/store/slices/employerSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const CompList = () => {
  const dispatch = useDispatch();
  const { employers, loading, error } = useSelector((state) => state.employer);

  useEffect(() => {
    dispatch(getAllEmployers());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Companies</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border-collapse shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left text-gray-700">Company Name</th>
                <th className="p-4 text-left text-gray-700">Industry Type</th>
                <th className="p-4 text-left text-gray-700">Location</th>
              </tr>
            </thead>
            <tbody>
              {employers.map((company, index) => (
                <tr
                  key={company.id}
                  className={`text-black border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="p-4">{company.companyName}</td>
                  <td className="p-4">{company.industry}</td>
                  <td className="p-4">{company.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompList;
