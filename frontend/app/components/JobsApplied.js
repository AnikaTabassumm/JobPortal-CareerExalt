'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobApplicationsByJobSeekerId } from "@/store/slices/jobApplicationSlice"; // Adjust the import based on your folder structure

const JobsApplied = () => {
  const dispatch = useDispatch();
  const {
    applications,
    loading,
    error,
  } = useSelector((state) => state.jobApplication);
  const { jobSeeker, status } = useSelector((state) => state.jobSeeker);

  const getStatus = (status) => {
    switch (status) {
      case "Applied":
        return "text-yellow-500";
      case "In Review":
        return "text-blue-500";
      case "Interview Scheduled":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    if (jobSeeker?.data.userId) {
      dispatch(fetchJobApplicationsByJobSeekerId(jobSeeker.data.userId));
    }
  }, [jobSeeker, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
    {applications.length === 0 ? ( 
        <p className="text-center text-gray-500">No job applications found</p>
    ) : (
        <ul className="space-y-6">
            {applications.map((job) => (
                <li
                    key={job.id}
                    className="p-6 bg-white border border-gray-300 rounded-lg flex flex-wrap justify-between items-center"
                >
                    <div>
                        <h2 className="md:text-xl font-semibold text-gray-500 pb-2">
                            {job.title}
                        </h2>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500">
                            Applied on {job.createdAt}
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-sm md:text-base pt-3">Status:</p>
                        <p className={`md:text-lg font-medium ${getStatus(job.status)}`}>
                            {job.status}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )}
</div>
  );
};

export default JobsApplied;
