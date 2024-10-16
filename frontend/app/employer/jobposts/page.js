import React from 'react';
import JobPostRow from '@/app/components/JobPostViewTable'; // Import client-side component
import JobPostViewTable from '@/app/components/JobPostViewTable';


const JobPosts = () => {
  return (
    <div className="overflow-x-auto pt-8">
      <JobPostViewTable />
    </div>
  );
};

export default JobPosts;
