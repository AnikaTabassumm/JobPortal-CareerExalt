"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {

  fetchJobSeeker,

} from "@/store/slices/jobSeekerSlice";
import { fetchExperiences } from "@/store/slices/candidateExperienceSlice";
import { getSkillsByUserId } from "@/store/slices/candidateSkillSlice";
import { fetchCertificates } from "@/store/slices/candidateCertificateSlice";
import { fetchEducation } from "@/store/slices/candidateEducationSlice";

const CandidateProfile = ({id}) => {
  console.log('candi:', id)
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { jobSeeker, status, error } = useSelector((state) => state.jobSeeker);
  const { experiences } = useSelector((state) => state.candidateExperience);
  const { skills } = useSelector((state) => state.candidateSkill);
  const { education } = useSelector((state) => state.candidateEducation);
  const { certificates } = useSelector((state) => state.candidateCertificate);
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


  useEffect(() => {
    if (id) {
      dispatch(fetchJobSeeker(id));
      dispatch(fetchExperiences(id));
      dispatch(getSkillsByUserId(id));
      dispatch(fetchEducation(id));
      dispatch(fetchCertificates(id));
      setLoading(false)
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (jobSeeker?.data?.userId) {
      dispatch(fetchExperiences(jobSeeker.data.userId));
    }
  }, [dispatch, jobSeeker]);

  useEffect(() => {
    console.log("Job Seeker Data:", jobSeeker);
  }, [jobSeeker]);

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
            {jobSeeker.data.profilePicture == null ? (
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
          </div>
          {/* Job Seeker Info */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {jobSeeker?.data?.userName}
            </h1>
            <p className="text-gray-600">{jobSeeker?.data?.userEmail}</p>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {experiences.length === 0 ? ( // Check for the length of experiences
          <p>No experiences added yet.</p>
        ) : (
          <div className="space-y-4">
            {experiences.map(
              (
                experience,
                index // Correctly map over experiences
              ) => (
                <div
                  className="py-4 px-3 md:px-8 rounded shadow"
                  key={experience?.id || index}
                >
                  <h2>{experience.title}</h2>
                  <p>{experience.company}</p>
                  <p>
                    {experience.from} - {experience.to}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-500">{error}</p>}
            {skills.length === 0 ? (
              <p>No skill added yet.</p>
            ) : (
              <div className="flex flex-wrap space-x-2 space-y-2">
                {skills.map((skill, index) => (
                  <span
                    key={skill?.id || index}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center"
                  >
                    {skill?.skill || skill}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Education Section */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {education.length === 0 ? ( // Check for the length of experiences
          <p>No education added yet.</p>
        ) : (
          <div className="space-y-4">
            {education.map(
              (
                edu,
                index // Correctly map over experiences
              ) => (
                <div
                  className="py-4 px-3 md:px-8 rounded shadow"
                  key={edu?.id || index}
                >
                  <h2>{edu.degree}</h2>
                  <p>{edu.institution}</p>
                  <p>
                    {edu.from} - {edu.to}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Certificate Section */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Certificates
        </h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!certificates || certificates.length === 0 ? (
          <p>No certificate added yet.</p>
        ) : (
          <div className="space-y-4">
            {certificates.map(
              (
                cert,
                index // Correctly map over experiences
              ) => (
                <div
                  className="py-4 px-3 md:px-8 rounded shadow"
                  key={cert?.id || index}
                >
                  <h2>{cert.certificateName}</h2>
                  <p>{cert.institution}</p>
                  <p>{cert.year}</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
