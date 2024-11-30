'use client';

import { getAllJobPosts } from '@/store/slices/jobPostSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const JobList = () => {
  const dispatch = useDispatch();
  const { jobPosts, error } = useSelector((state) => state.jobPost);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dispatch the action to fetch job posts
    const fetchData = async () => {
      await dispatch(getAllJobPosts());
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, [dispatch]);

  const handleJobClick = (id) => {
    window.open(`/job-details/${id}`, '_blank'); // Navigate to job details page
  };

  // Filter job posts where visibilityStatus is 'open'
  const openJobPosts = jobPosts?.filter((job) => job.visibilityStatus === 'Open');

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading job posts: {error}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {openJobPosts && openJobPosts.length > 0 ? (
            openJobPosts.map((job) => (
              <div
                onClick={() => handleJobClick(job.id)}
                key={job.id}
                className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4"
              >
                <img
                  src={`http://localhost:5000/${job.Employer?.companyLogo}`}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">{job.company}</h2>
                  <p className="text-lg text-indigo-600">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No open job posts available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobList;
