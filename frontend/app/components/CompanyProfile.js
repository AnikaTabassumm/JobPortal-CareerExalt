'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployer } from '@/store/slices/employerSlice';

const CompanyProfile = ({ id }) => {
  const dispatch = useDispatch();
  const { employer, status, error } = useSelector((state) => state.employer);
  const [loading, setLoading] = useState(true);
  const [picturePreview, setPicturePreview] = useState("/images/defaultUser.png");

  useEffect(() => {
    if (id) {
      dispatch(getEmployer(id)).then(() => {
        setLoading(false); // Stop loading once data is fetched
      }).catch(() => {
        setLoading(false); // Stop loading if there was an error
      });
    } else {
      setLoading(false); // Stop loading if there is no ID provided
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log("Employer Data:", employer);
  }, [employer]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error?.message || "Failed to load data"}</div>;
  }

  if (!employer || !employer.data) {
    return <div>No company data found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-col border">
          {employer.data.companyLogo == null ? (
            <img
              src={picturePreview}
              width={150}
              height={150}
              alt="Profile"
              className=""
            />
          ) : (
            <img
              src={`http://localhost:5000/${employer.data.companyLogo}`}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
              }}
            />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {employer.data.companyName}
          </h2>
          <p className="text-gray-600">{employer.data.industry}</p>
        </div>
      </div>
      <div className="space-y-4">
        <p>
          <strong className="text-gray-700">Size:</strong> {employer.data.size}
        </p>
        <p>
          <strong className="text-gray-700">Location:</strong> {employer.data.location}
        </p>
        <p>
          <strong className="text-gray-700">Contact Information:</strong>{' '}
          {employer.data.contactInformation}
        </p>
        <p>
          <strong className="text-gray-700">Description:</strong>{' '}
          {employer.data.companyDescription}
        </p>
      </div>
    </div>
  );
};

export default CompanyProfile;
