'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobPostsByEmployer } from '@/store/slices/jobPostSlice';
import { fetchPackages } from '@/store/slices/packageSlice';
import { setUserInfo } from "@/store/slices/userSlice";
import { getEmployer } from '@/store/slices/employerSlice';
import { useRouter } from 'next/navigation';

const CompanyDashboardView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobPosts } = useSelector(state => state.jobPost);
  const { userInfo } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.employer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUserInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    // Set user info from local storage if not already set in Redux
    if (!userInfo && localUserInfo) {
      dispatch(setUserInfo(localUserInfo));
    }

    // Fetch job posts if userInfo is available
    if (localUserInfo?.id) {
      dispatch(getJobPostsByEmployer(localUserInfo.id)).finally(() => {
        setLoading(false); // Ensure loading is set to false after fetching
      });
    }
  }, [dispatch, userInfo]);

  const handleViewApplicants = (jobId) => {
    router.push(`/employer/applicants/job/${jobId}`);

  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-800">Company Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-5">
        {/* Total Jobs Posted */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-600">Total Jobs Posted</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">{jobPosts.length}</p>
        </div>
      </div>

      {/* Job Listing Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Open Jobs</h2>
        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading job posts: {error}</p>
          ) : (
            jobPosts
              .filter((job) => job.visibilityStatus === 'Open') 
              .map((job) => (
                <div key={job.id} className="flex flex-wrap justify-between items-center p-4 bg-gray-50 border rounded-md">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">{job.title}</h3>
                    <p className="text-gray-500">Expiration Date: {job.expirationDate}</p>
    
                  </div>
                  <div>
                    <button onClick={() => handleViewApplicants(job.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      View Applicants
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboardView;
