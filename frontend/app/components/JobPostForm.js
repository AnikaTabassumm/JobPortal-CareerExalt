"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJobPost } from "@/store/slices/jobPostSlice";
import { createOrder } from "@/store/slices/orderSlice";
import { getEmployer } from "@/store/slices/employerSlice";

const JobPostForm = ({ employerId, packageId }) => {
  console.log("employer is: ", employerId);
  console.log("package is: ", packageId);
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.jobPost);
  const { employer } = useSelector((state) => state.employer);
  const { orderData, payment } = useSelector((state) => state.order);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    requirements: "",
    location: "",
    salaryRange: "",
    
  });

  useEffect(() => {
    if (employerId) {
      dispatch(getEmployer(employerId))
      .then((result) => {
        if (result.payload) {
          console.log("Employer fetched:", result.payload);
        } else {
          console.error("Failed to fetch employer:", result.error);
        }
      });
    }
  }, [employerId, dispatch]);

  useEffect(() => {
    console.log("emp: ", employer)
  }, [employer])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create job post with form data and employerId, packageId
    const jobPostData = {
      ...formData,
      employerId,
      packageId,
      company: employer.data.companyName,
    };
    console.log('jobpostdata: ',jobPostData)

    console.log("Form Data:", formData);
console.log("Employer ID:", employerId);
console.log("Package ID:", packageId);
// console.log("Company Name:", companyName);

    try {
      // Dispatch the createJobPost action and unwrap the result to get jobPostId
      const result = await dispatch(createJobPost(jobPostData)).unwrap();

      console.log("Result: ", result);

      if (!result || !result.id) {
        throw new Error("Job post creation failed. No ID returned.");
      }

      // Assuming the result contains the jobPostId
      const jobPostId = result.id;
      const packageId = result.packageId;
      console.log(jobPostId);

      if (!jobPostId || !packageId) {
        throw new Error("Job post ID or package ID is missing from the response");
      }

      const orderData = {
        jobPostId, // Ensure this is correctly populated
        packageId, // Ensure this is correctly populated
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
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
      alert("An error occurred: " + (error.message || ''));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Post a New Job
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Job Category */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="category">
              Job Category
            </label>
            <select
              id="category"
              name="category"
              className=" bg-white w-full p-2 border border-gray-300 rounded-md"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Software">Software</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="title">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          {/* Job Description */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="description">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a detailed job description"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="requirements">
              Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="List the job requirements"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Salary Range */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="salaryRange">
              Salary Range
            </label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              value={formData.salaryRange}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Submitting..." : "Submit Job"}
            </button>
          </div>

          {/* Error or Success Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;
