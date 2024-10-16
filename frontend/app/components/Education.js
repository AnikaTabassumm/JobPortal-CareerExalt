"use client";

import {
  createEducation,
  deleteEducation,
  fetchEducation,
  updateEducation,
} from "@/store/slices/candidateEducationSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Education = ({ jobSeeker }) => {
  const dispatch = useDispatch();
  const { education, loading, error } = useSelector(
    (state) => state.candidateEducation
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [addEducation, setAddEducation] = useState(false);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    if (jobSeeker?.data?.userId) {
      dispatch(fetchEducation(jobSeeker.data.userId));
    }
  }, [dispatch, jobSeeker]);

  useEffect(() => {
    console.log("Education:", education);
  }, [education]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsEditing(true);
    setNewEducation(education[index]);
  };

  const handleSave = async (index) => {
    const educationToUpdate = education[index];

    const updatedEducation = {
      ...educationToUpdate,
      ...newEducation, 
    };
    try {
      const resultAction = await dispatch(
        updateEducation({
          id: educationToUpdate.id,
          educationData: updatedEducation,
        })
      );
      if (updateEducation.fulfilled.match(resultAction)) {
        setIsEditing(false);
        setEditingIndex(null);
        setNewEducation({ degree: "", institution: "", from: "", to: "" });
        dispatch(fetchEducation(jobSeeker.data.userId)); // Fetch experiences again after update
      }
    } catch (error) {
      console.error("Failed to update education:", error);
    }
  };

  const handleAddEducation = async () => {
    setNewEducation({ degree: "", institution: "", from: "", to: "" });

    const newEducationData = {
      degree: newEducation.degree,
      institution: newEducation.institution,
      from: newEducation.from,
      to: newEducation.to,
    };
    console.log(newEducationData);
    try {
      const resultAction = await dispatch(
        createEducation({
          educationData: newEducationData,
          userId: jobSeeker.data.userId,
        })
      );

      // Log the result to debug
      console.log("New Education Created:", resultAction);

      if (createEducation.fulfilled.match(resultAction)) {
        console.log(resultAction.payload);
        setNewEducation({ degree: "", institution: "", from: "", to: "" });

        setAddEducation(false);
      } else {
        console.error("Failed to add education:", resultAction.payload);
      }
    } catch (error) {
      console.error("Failed to add education:", error);
    }
  };

  const handleDelete = async (educationId) => {
    if (!educationId) {
      console.error("No education ID provided");
      return;
    }

    try {
      const resultAction = await dispatch(deleteEducation(educationId));
      if (deleteEducation.fulfilled.match(resultAction)) {
        console.log(`Education with ID ${educationId} deleted successfully`);
      }
    } catch (error) {
      console.error("Failed to delete education:", error);
    }
  };

  return (
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
              <div className="py-4 px-3 md:px-8  rounded shadow" key={edu?.id || index}>
                {isEditing && editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={newEducation.degree}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          degree: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      value={newEducation.institution}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          institution: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="Institution"
                    />
                    <input
                      type="text"
                      value={newEducation.from}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          from: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="From"
                    />
                    <input
                      type="text"
                      value={newEducation.to}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          to: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="To"
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
                    <h2>{edu.degree}</h2>
                    <p>{edu.institution}</p>
                    <p>
                      {edu.from} - {edu.to}
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
                        onClick={() => handleDelete(edu.id)}
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
      {!addEducation ? (
        <button
          className="py-2 px-3 md:px-6 text-white bg-blue-500 rounded mt-2"
          onClick={() => setAddEducation(true)}
        >
          Add Education
        </button>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mt-4">
            Add New Education
          </h3>
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="Degree"
          />
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) =>
              setNewEducation({ ...newEducation, institution: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="Institution"
          />
          <input
            type="text"
            value={newEducation.from}
            onChange={(e) =>
              setNewEducation({ ...newEducation, from: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="From"
          />
          <input
            type="text"
            value={newEducation.to}
            onChange={(e) =>
              setNewEducation({ ...newEducation, to: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="To"
          />
          <button
            className="py-2 px-6 text-white bg-blue-500 rounded mt-2"
            onClick={handleAddEducation}
          >
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default Education;
