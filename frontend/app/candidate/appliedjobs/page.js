'use client';

import { useState } from 'react';
import { format } from 'date-fns'; // to format the date

const AppliedJobsList = () => {
  // Sample list of applied jobs with company, job title, application date, and status
  const [appliedJobs, setAppliedJobs] = useState([
    { 
      id: 1, 
      company: 'Tech Corp', 
      title: 'Frontend Developer', 
      applicationDate: '2024-09-01', 
      status: 'Applied' 
    },
    { 
      id: 2, 
      company: 'InnovateX', 
      title: 'Backend Developer', 
      applicationDate: '2024-08-25', 
      status: 'In Review' 
    },
    { 
      id: 3, 
      company: 'Startup Labs', 
      title: 'Full Stack Engineer', 
      applicationDate: '2024-09-05', 
      status: 'Interview Scheduled' 
    },
    { 
      id: 4, 
      company: 'Global Tech', 
      title: 'Product Manager', 
      applicationDate: '2024-08-15', 
      status: 'Rejected' 
    },
  ]);

  // Function to get status color
  const getStatus = (status) => {
    switch (status) {
      case 'Applied':
        return 'text-yellow-500';
      case 'In Review':
        return 'text-blue-500';
      case 'Interview Scheduled':
        return 'text-green-500';
      case 'Rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-gray-600 text-lg md:text-xl lg:text-2xl font-bold pb-3">My Applied Jobs</h1>
      <ul className="space-y-6">
        {appliedJobs.map((job) => (
          <li
            key={job.id}
            className="p-6 bg-white border border-gray-300 rounded-lg flex flex-wrap justify-between items-center"
          >
            <div>
              <h2 className="md:text-xl font-semibold text-gray-500 pb-2">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">
                Applied on {format(new Date(job.applicationDate), 'MMMM d, yyyy')}
              </p>
            </div>

            <div>
              <p className='font-semibold text-sm md:text-base pt-3'>Status:</p>
              <p className={`md:text-lg font-medium ${getStatus(job.status)}`}>
                {job.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobsList;