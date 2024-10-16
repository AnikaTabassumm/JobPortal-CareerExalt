'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from "@/store/slices/userSlice";
import { deleteJobPost, getJobPostsByEmployer } from '@/store/slices/jobPostSlice';

const JobPostViewTable = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(true); // To manage visibility after deletion
  const { jobPosts, error } = useSelector((state) => state.jobPost);
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

    // Fetch job seeker profile if userInfo is available
    if (localUserInfo?.id) {
      dispatch(getJobPostsByEmployer(localUserInfo.id)).finally(() => {
        setLoading(false); // Ensure loading is set to false after fetching
      });
    }
  }, [dispatch, userInfo]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteJobPost(id)).unwrap();
      await dispatch(getJobPostsByEmployer(userInfo.id));
    } catch (error) {
      console.error("Failed to delete job post:", error);
    }
  };

  const handleRowClick = (id) => {
    window.open(`/job-details/${id}`, '_blank'); // Navigate to job details page
  };

  if (!visible) return null; // Don't render the row if it's deleted

  return (
    <>
      {jobPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No Jobs Posted Yet</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Job ID</th>
              <th className="py-3 px-6 text-left">Job Category</th>
              <th className="py-3 px-6 text-left">Job Title</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {jobPosts.map((job) => (
              <tr
                key={job.id}
                onClick={() => handleRowClick(job.id)}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-3 px-6 text-left">{job.id}</td>
                <td className="py-3 px-6 text-left">{job.category}</td>
                <td className="py-3 px-6 text-left">{job.title}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      job.visibilityStatus === 'Open'
                        ? 'bg-green-200 text-green-800'
                        : job.visibilityStatus === 'Closed'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {job.visibilityStatus}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the row click when deleting
                      handleDelete(job.id);
                    }}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default JobPostViewTable;
