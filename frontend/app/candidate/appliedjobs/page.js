'use client';

import JobsApplied from '@/app/components/JobsApplied';

const AppliedJobsList = () => {
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-gray-600 text-lg md:text-xl lg:text-2xl font-bold pb-3">My Applied Jobs</h1>
      <JobsApplied />
    </div>
  );
};

export default AppliedJobsList;