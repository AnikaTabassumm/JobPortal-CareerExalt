"use client";

import {
  fetchJobApplicationsByJobPostId,
  updateJobApplicationStatus,
} from "@/store/slices/jobApplicationSlice";
import { fetchJobSeeker } from "@/store/slices/jobSeekerSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ApplicantList = ({ jobId }) => {
  const dispatch = useDispatch();
  const { appli } = useSelector((state) => state.jobApplication);
  const [applicationsList, setApplicationsList] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [stat, setStat] = useState('');


  useEffect(() => {
    if (jobId) {
      setLoading(true);
      setError(null);

      // Fetch job applications
      dispatch(fetchJobApplicationsByJobPostId(jobId))
        .then((result) => {
          const fetchedApplications = result.payload;

          if (fetchedApplications && fetchedApplications.length > 0) {
            setApplicationsList(fetchedApplications);

            // Fetch job seekers
            const fetchApplicants = async () => {
              try {
                const applicantPromises = fetchedApplications.map(
                  async (application) => {
                    const jobSeeker = await dispatch(
                      fetchJobSeeker(application.jobSeekerId)
                    );
                    return {
                      ...jobSeeker.payload,
                      resume: application.resume,
                      coverLetter: application.coverLetter,
                      applicationId: application.id,
                    };
                  }
                );

                const resolvedApplicants = await Promise.all(applicantPromises);
                setApplicants(resolvedApplicants);
              } catch (err) {
                setError("Error fetching applicant details.");
              }
              setLoading(false);
            };
            fetchApplicants();
          } else {
            setLoading(false);
            setApplicants([]);
          }
        })
        .catch(() => {
          setLoading(false);
          setError("Failed to load job applications.");
        });
    }
  }, [jobId, dispatch]);

  console.log("Applicant object:", applicants);

  const handleChange = (event, applicationId) => {
    console.log('appli id: ', applicationId)
    const status = event.target.value;
    setStat(status);
    if (applicationId) {
      dispatch(updateJobApplicationStatus({ applicationId, status }));
    } else {
      console.error("Application ID is undefined");
    }
  };
  

  const handleRowClick = (id) => {
    window.open(`/candidate-profile/${id}`, "_blank");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Applicant List</h1>
        <div className="overflow-x-auto">
          {applicants.length === 0 ? (
            <div className="text-center text-gray-600">
              No Applicants available
            </div>
          ) : (
            <table className="min-w-full table-auto bg-white border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-4 text-gray-700">Name</th>
                  <th className="p-4 text-gray-700">Email</th>
                  <th className="p-4 text-gray-700">Resume</th>
                  <th className="p-4 text-gray-700">Cover Letter</th>
                  <th className="p-4 text-gray-700">Profile</th>
                  <th className="p-4 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-4 text-gray-700">
                      {applicant.data.userName}
                    </td>
                    <td className="p-4 text-gray-700">
                      {applicant.data.userEmail}
                    </td>
                    <td
                    // className="p-4 text-blue-600 underline cursor-pointer"
                    // onClick={() => openResume(applicant.resume)}
                    >
                      {/* View Resume */}
                      <a
                        href={`http://localhost:5000/${applicant.resume}`} // Use relative path
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </td>
                    <td
                    // className="p-4 text-blue-600 underline cursor-pointer"
                    // onClick={() => openCoverLetter(applicant.coverLetter)}
                    >
                      {/* View Cover Letter */}
                      <a
                        href={`http://localhost:5000/${applicant.coverLetter}`} // Use relative path
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Cover Letter
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRowClick(applicant.data.userId)}
                        className="bg-green-700 text-white py-1 px-1 rounded"
                      >
                        View profile
                      </button>
                    </td>
                    <td>
                      <select
                        className="bg-white text-black border shadow"
                        onChange={(e) => handleChange(e, applicant.applicationId)}
                        defaultValue={stat}
                      >
                        <option className="" value="">{'Select Status' || stat}</option>
                        <option value="accepted">accepted</option>
                        <option value="rejected">rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      {showPdf && (
        <PDFViewer file={pdfFile} onClose={() => setShowPdf(false)} />
      )}
    </div>
  );
};

export default ApplicantList;
