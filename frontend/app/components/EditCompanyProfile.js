'use client';

import { useState, useEffect } from 'react';

const EditCompanyProfile = ({ companyData, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    size: '',
    location: '',
    contactInformation: '',
    companyDescription: '',
  });

  // Update formData if companyData changes
  useEffect(() => {
    if (companyData) {
      setFormData({
        companyName: companyData.data.companyName || '',
        industry: companyData.data.industry || '',
        size: companyData.data.size || '',
        location: companyData.data.location || '',
        contactInformation: companyData.data.contactInformation || '',
        companyDescription: companyData.data.companyDescription || '',
      });
    }
  }, [companyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Company Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="bg-gray-100 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Industry Type</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="bg-gray-100 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Size (Employees)</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="bg-gray-100 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="bg-gray-100 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Contact Information</label>
          <input
            type="text"
            name="contactInformation"
            value={formData.contactInformation}
            onChange={handleChange}
            className="bg-gray-100 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Company Description</label>
          <textarea
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            className="bg-gray-100 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSaveClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => onSave(companyData)} // Cancel and return to the original data
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
