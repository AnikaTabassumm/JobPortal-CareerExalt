"use client";

import {
    createCertificate,
  deleteCertificate,
  fetchCertificates,
  updateCertificate,
} from "@/store/slices/candidateCertificateSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Certificate = ({ jobSeeker }) => {
  const dispatch = useDispatch();
  const { certificates, loading, error } = useSelector(
    (state) => state.candidateCertificate
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [addCertificate, setAddCertificate] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    certificateName: "",
    institution: "",
    year: "",
  });

  useEffect(() => {
    if (jobSeeker?.data?.userId) {
      dispatch(fetchCertificates(jobSeeker.data.userId));
    }
  }, [dispatch, jobSeeker]);

  useEffect(() => {
    console.log("Certificates:", certificates);
  }, [certificates]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsEditing(true);
    setNewCertificate(certificates[index]);
  };

  const handleSave = async (index) => {
    const certificateToUpdate = certificates[index];

    const updatedCertificate = {
      ...certificateToUpdate,
      ...newCertificate,
    };
    try {
      const resultAction = await dispatch(
        updateCertificate({
          id: certificateToUpdate.id,
          certificateData: updatedCertificate,
        })
      );
      if (updateCertificate.fulfilled.match(resultAction)) {
        setIsEditing(false);
        setEditingIndex(null);
        setNewCertificate({ certificateName: "", institution: "", year: "" });
        dispatch(fetchCertificates(jobSeeker.data.userId));
      }
    } catch (error) {
      console.error("Failed to update Certificate:", error);
    }
  };

  const handleAddCertificate = async () => {
    setNewCertificate({ certificateName: "", institution: "", year: "" });
    
    const newCertificateData = {
      certificateName: newCertificate.certificateName,
      institution: newCertificate.institution,
      year: newCertificate.year,
    };
    console.log(newCertificateData);
    try {
      const resultAction = await dispatch(
        createCertificate({
            certificateData: newCertificateData,
          userId: jobSeeker.data.userId,
        })
      );

      // Log the result to debug
      console.log("New Certificate Created:", resultAction);

      if (createCertificate.fulfilled.match(resultAction)) {
        console.log(resultAction.payload);
        setNewCertificate({ certificateName: "", institution: "", year: "" });

        setAddCertificate(false);
      } else {
        console.error("Failed to add Certificate:", resultAction.payload);
      }
    } catch (error) {
      console.error("Failed to add Certificate:", error);
    }
  };

  const handleDelete = async (certificateId) => {
    if (!certificateId) {
      console.error("No certificate ID provided");
      return;
    }

    try {
      const resultAction = await dispatch(deleteCertificate(certificateId));
      if (deleteCertificate.fulfilled.match(resultAction)) {
        console.log(`Certificate with ID ${certificateId} deleted successfully`);
      }
    } catch (error) {
      console.error("Failed to delete certificate:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Certificates</h2>
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
              <div className="py-4 px-3 md:px-8  rounded shadow" key={cert?.id || index}>
                {isEditing && editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={newCertificate.certificateName}
                      onChange={(e) =>
                        setNewCertificate({
                          ...newCertificate,
                          certificateName: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={newCertificate.institution}
                      onChange={(e) =>
                        setNewCertificate({
                          ...newCertificate,
                          institution: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="Institution"
                    />
                    <input
                      type="text"
                      value={newCertificate.year}
                      onChange={(e) =>
                        setNewCertificate({
                          ...newCertificate,
                          year: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="Year"
                    />
                    
                    <button
                      className="py-2 px-6 text-white bg-blue-500 rounded"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h2>{cert.certificateName}</h2>
                    <p>{cert.institution}</p>
                    <p>
                      {cert.year}
                    </p>
                    <div className="flex justify-between pt-4">
                      <button
                        className="bg-gray-100 text-blue-600 md:py-2 px-5 font-semibold border border-blue-800"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-gray-100 text-red-600 px-3 md:py-2 md:px-5 font-semibold border border-red-800"
                        onClick={() => handleDelete(cert.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      )}
      {!addCertificate ? (
        <button
          className="py-2 px-3 md:px-6 text-white bg-blue-500 rounded mt-2"
          onClick={() => setAddCertificate(true)}
        >
          Add Certificate
        </button>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mt-4">
            Add New Certificate
          </h3>
          <input
            type="text"
            value={newCertificate.certificateName}
            onChange={(e) =>
              setNewCertificate({ ...newCertificate, certificateName: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="Title"
          />
          <input
            type="text"
            value={newCertificate.institution}
            onChange={(e) =>
              setNewCertificate({ ...newCertificate, institution: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="Institution"
          />
          <input
            type="text"
            value={newCertificate.year}
            onChange={(e) =>
              setNewCertificate({ ...newCertificate, year: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="Year"
          />
          <button
            className="py-2 px-6 text-white bg-blue-500 rounded mt-2"
            onClick={handleAddCertificate}
          >
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default Certificate;
