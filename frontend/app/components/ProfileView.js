"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfilePicture,
  fetchJobSeeker,
  uploadProfilePicture,
} from "@/store/slices/jobSeekerSlice";
import { setUserInfo } from "@/store/slices/userSlice";
import Experience from "./Experience";
import Skill from "./Skills";
import Education from "./Education";
import Certificate from "./Certificate";
import { DeleteSvg, EditSvg } from "@/public/images/SVG/svg";

const ProfileView = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { jobSeeker, status, error } = useSelector((state) => state.jobSeeker);
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [picturePreview, setPicturePreview] = useState(
    "/images/defaultUser.png"
  );

  useEffect(() => {
    console.log("Current Redux state:", { jobSeeker, status, error });
    if (jobSeeker && jobSeeker.data && jobSeeker.data.profilePicture) {
      setPicturePreview(
        `http://localhost:5000/${jobSeeker.data.profilePicture}`
      );
    }
  }, [jobSeeker]);

  // Handle local storage retrieval and fetching job seeker
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
      dispatch(fetchJobSeeker(localUserInfo.id)).finally(() => {
        setLoading(false); // Ensure loading is set to false after fetching
      });
    }
  }, [dispatch, userInfo]);

  // Debugging to verify states
  useEffect(() => {
    console.log("User Info:", userInfo);
    console.log("Job Seeker Data:", jobSeeker);
  }, [userInfo, jobSeeker]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const response = await dispatch(
        uploadProfilePicture({ id: jobSeeker.data.userId, formData })
      ).unwrap(); // Unwrap to directly get the fulfilled result

      if (response?.profilePicture) {
        // Update the picture preview with the new URL
        setPicturePreview(`http://localhost:5000/${response.profilePicture}`);

        // Optionally, update the Redux state for jobSeeker directly if needed
        dispatch(fetchJobSeeker(userInfo.id)); // Ensure jobSeeker data is refetched
      }
      setFile(null);
      setIsEdit(false);
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload image, please try again.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the profile picture?"
    );
    if (confirmed) {
      try {
        await dispatch(deleteProfilePicture(jobSeeker.data.userId));
        await dispatch(fetchJobSeeker(userInfo.id));
        setPicturePreview("/images/defaultUser.png");
        setIsEdit(true); // Optionally toggle edit mode
      } catch (error) {
        alert("Failed to delete profile picture. Please try again.");
      }
    }
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error?.message || "Failed to load data"}</div>;
  }

  if (!jobSeeker || !jobSeeker.data) {
    return <div>No job seeker data found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto md:p-6">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center space-x-4">
          <div className="flex-col border">
            {isEdit || !jobSeeker.data.profilePicture == null ? (
              <img
                src={picturePreview}
                width={150}
                height={150}
                alt="Profile"
                className=""
              />
            ) : (
              <img
                src={`http://localhost:5000/${jobSeeker.data.profilePicture}`}
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
            )}

            {/* Edit or Upload Profile Picture */}
            {isEdit || !jobSeeker.data.profilePicture ? (
              <form className="flex-col">
                <input
                  type="file"
                  name="file"
                  className="text-xs"
                  onChange={handleFileChange}
                />
              </form>
            ) : (
              <div className="flex justify-between">
                <button
                  className="border-b-2 border-x-2"
                  onClick={handleDelete}
                >
                  <DeleteSvg />
                </button>
                <button
                className="border-b-2 border-x-2"
                onClick={()=> setIsEdit(true)}
                >
                  <EditSvg />
                </button>
              </div>
            )}
          </div>
          {/* Job Seeker Info */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {jobSeeker?.data?.userName || userInfo?.id.name}
            </h1>
            <p className="text-gray-600">{jobSeeker?.data?.userEmail}</p>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <Experience jobSeeker={jobSeeker} />

      {/* Skills Section */}
      <Skill jobSeeker={jobSeeker} />

      {/* Education Section */}
      <Education jobSeeker={jobSeeker} />

      {/* Certificate Section */}
      <Certificate jobSeeker={jobSeeker} />
    </div>
  );
};

export default ProfileView;
