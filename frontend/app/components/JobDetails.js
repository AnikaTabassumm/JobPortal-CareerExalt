'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JobEditForm from './JobEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { getJobPostById, updateJobPost } from '@/store/slices/jobPostSlice';
import { getEmployer } from '@/store/slices/employerSlice';
import { setUserInfo } from '@/store/slices/userSlice';
import { useSearchParams } from 'next/navigation';
import { createOrder } from '@/store/slices/orderSlice';
import JobApplicationForm from './JobApplicationForm';

const JobDetails = ({ jobId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobPost, error } = useSelector((state) => state.jobPost);
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  // const [jobDetails, setJobDetails] = useState(job); // Store job details
  const [role, setRole] = useState('')
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    if(jobId) {
      dispatch(getJobPostById(jobId)).finally(() => {
        setLoading(false); 
      });
    }
  }, [jobId, dispatch])

  useEffect(() => {
    const localUserInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    if (!userInfo && localUserInfo) {
      dispatch(setUserInfo(localUserInfo));
    }
    setRole(userInfo?.role || localUserInfo.role);
  });

  const handleEditClick = () => {
    setIsEditing(true); // Show edit form
  };

  const handleSave = (updatedJob) => {
    dispatch(updateJobPost({ id: jobId, jobPostData: updatedJob }))
      .unwrap()
      .then(() => {
        setIsEditing(false); // Switch back to view mode after successful update
        dispatch(getJobPostById(jobId)); // Fetch the updated data
      })
      .catch((error) => {
        console.error('Failed to update job post:', error);
      });
  };

  const handleSubmitClick = async() => {
    try {
    const orderData = {
      jobPostId : jobId, // Ensure this is correctly populated
      packageId : jobPost.packageId, // Ensure this is correctly populated
    };

    // Now create the order using the jobPostId and packageId
    try {
      // Dispatch the createOrder thunk
      const resultAction = await dispatch(createOrder(orderData));

      if (createOrder.fulfilled.match(resultAction)) {
        console.log("Order created successfully:", resultAction.payload);
        // Redirect to payment URL or handle success here
        window.location.href = resultAction.payload.url;
      } else {
        console.error("Order creation failed:", resultAction.payload);
        alert("Order creation failed: " + resultAction.payload);
      }
    } catch (error) {
      console.error("Error during order creation:", error);
      alert("Something went wrong.");
    }
  } catch (err) {
    console.error("Job post submission error:", err);
  }
  dispatch(getJobPostById(jobId));
  }

  const handleApplicantClick = () => {
    router.push(`/employer/applicants/job/${jobId}`);
  };

  const handleApply = () => {
    setShowApplicationForm(true);
  }
  const handleView = (id) => {
    router.push(`/company-profile/${id}`)
  }
  

  if (isEditing) {
    // If in edit mode, show the JobEditForm
    return <JobEditForm job={jobPost} onSave={handleSave} />;
  }

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!jobPost) {
    return <div>No job post found.</div>;
  }


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 text-center py-5">{jobPost.title}</h2>
      <p className="text-gray-600 mb-4">
        <strong>Company:</strong> {jobPost.company}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Category:</strong> {jobPost.category}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Requirements:</strong> {jobPost.requirements}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Description:</strong> {jobPost.description}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Salary:</strong> {jobPost.salaryRange}
      </p>
      <p className="text-gray-600 mb-6">
        <strong>Location:</strong> {jobPost.location}
      </p>
      {role === 'employer' ? (
        jobPost.visibilityStatus === 'Pending' ? (
          <div className="flex gap-4">
            <button
        onClick={handleEditClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Edit Post
      </button>
            <button
        onClick={handleSubmitClick}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Submit Post
      </button>
          </div>
        ) : (
          <button
        onClick={handleApplicantClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        View Applicants
      </button>
        )
        
      ) : (
        <div className="flex justify-between pb-5">
          <button
        onClick={() => handleApply()}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Apply
      </button>
      <button
        onClick={() => handleView(jobPost.employerId)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Company Profile
      </button>
        </div>
      )}

  {showApplicationForm && <JobApplicationForm jobId={jobId} />}
      
    </div>
  );
};

export default JobDetails;
