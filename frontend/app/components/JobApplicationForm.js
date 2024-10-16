import { createJobApplication } from '@/store/slices/jobApplicationSlice';
import { setUserInfo } from '@/store/slices/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

const JobApplicationForm = ({ jobId }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { jobSeeker, status, error } = useSelector((state) => state.jobSeeker);
  const [formData, setFormData] = useState({
    resume: null,
    coverLetter: null,
  });

  useEffect(() => {
    console.log("Jobseeker Data:", jobSeeker);
  }, [jobSeeker]);
  console.log('jobId: ', jobId)

//   useEffect(() => {
//     const localUserInfo =
//       typeof window !== "undefined"
//         ? JSON.parse(localStorage.getItem("userInfo"))
//         : null;

//     // Set user info from local storage if not already set in Redux
//     if (!userInfo && localUserInfo) {
//       dispatch(setUserInfo(localUserInfo));
//     }

//     // Fetch job seeker profile if userInfo is available
//     if (localUserInfo?.id) {
//       dispatch(fetchJobSeeker(localUserInfo.id)).finally(() => {
//         setLoading(false); // Ensure loading is set to false after fetching
//       });
//     }
//   }, [dispatch, userInfo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object to handle file uploads
    const jobSeekerId = jobSeeker.data.userId;
    console.log('jsId: ', jobSeekerId)

    const applicationData = {
        ...formData,
        jobPostId: jobId,
        jobSeekerId
    }

    try {
      // Dispatch the action to create a job application
      await dispatch(createJobApplication(applicationData)).unwrap();
      console.log('Application submitted successfully')
      // Optionally, handle success (like showing a success message or redirecting)
    } catch (error) {
      // Handle error (like showing an error message)
      console.error('Failed to create job application:', error.message || error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Apply for Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">

          {/* Resume Upload */}
          <div>
            <label htmlFor="resume" className="block text-gray-700 mb-2">
              Upload Resume
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500"
              required
            />
            <p className="text-sm text-gray-500 mt-2">PDF, DOC, or DOCX. Max size 5MB.</p>
          </div>

          {/* Cover Letter Upload */}
          <div>
            <label htmlFor="coverLetter" className="block text-gray-700 mb-2">
              Upload Cover Letter
            </label>
            <input
              id="coverLetter"
              name="coverLetter"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500"
              required
            />
            <p className="text-sm text-gray-500 mt-2">PDF, DOC, or DOCX. Max size 5MB.</p>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobApplicationForm;
