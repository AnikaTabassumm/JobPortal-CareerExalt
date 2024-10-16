"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createExperience,
  updateExperience,
  deleteExperience,
  fetchExperiences,
} from "@/store/slices/candidateExperienceSlice";

const Experience = ({ jobSeeker }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { experiences, loading, error } = useSelector(
    (state) => state.candidateExperience
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [addExperience, setAddExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    from: "",
    to: "",
  });

  // Fetch experiences when the jobSeeker prop changes
  useEffect(() => {
    if (jobSeeker?.data?.userId) {
      dispatch(fetchExperiences(jobSeeker.data.userId));
    }
  }, [dispatch, jobSeeker]);

  // useEffect(() => {
  //   // Check if userInfo is null, then load from localStorage
  //   const localUserInfo = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userInfo')) : null;
  //   if (!userInfo && localUserInfo) {
  //     dispatch(setUserInfo(localUserInfo));
  //   }

  //   // Once userInfo is available, fetch the job seeker profile
  //   if (localUserInfo?.id) {
  //     console.log("Job Seeker ID from User Info:", localUserInfo?.id);
  //     dispatch(fetchExperiences(localUserInfo.id));
  //   }
  // }, [dispatch, userInfo, jobSeeker]);

  useEffect(() => {
    console.log("Experience:", experiences);
  }, [experiences]);

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setNewExperience(experiences[index]);
  };

  const handleSave = async (index) => {
    const experienceToUpdate = experiences[index];

    const updatedExperience = {
      ...experienceToUpdate,
      ...newExperience, // Use spread operator to get new values directly
    };

    try {
      const resultAction = await dispatch(
        updateExperience({
          id: experienceToUpdate.id,
          experienceData: updatedExperience,
        })
      );
      if (updateExperience.fulfilled.match(resultAction)) {
        setIsEditing(false);
        setEditingIndex(null);
        setNewExperience({ title: "", company: "", from: "", to: "" });
        dispatch(fetchExperiences(jobSeeker.data.userId)); // Fetch experiences again after update
      }
    } catch (error) {
      console.error("Failed to update experience:", error);
    }
  };

  const handleAddExperience = async () => {
    setNewExperience({
      title: "",
      company: "",
      from: "",
      to: "",
    });

    const newExperienceData = {
      title: newExperience.title,
      company: newExperience.company,
      from: newExperience.from,
      to: newExperience.to,
    };
    console.log(newExperienceData);
    try {
      const resultAction = await dispatch(
        createExperience({
          experienceData: newExperienceData,
          userId: jobSeeker.data.userId,
        })
      );

      // Log the result to debug
      console.log("New Experience Created:", resultAction);

      if (createExperience.fulfilled.match(resultAction)) {
        console.log(resultAction.payload);
        setNewExperience({
          title: "",
          company: "",
          from: "",
          to: "",
        });
        setAddExperience(false);
      } else {
        console.error("Failed to add experience:", resultAction.payload);
      }
    } catch (error) {
      console.error("Failed to add experience:", error);
    }
  };

  const handleDelete = async (experienceId) => {
    if (!experienceId) {
      console.error("No experience ID provided");
      return;
    }

    try {
      const resultAction = await dispatch(deleteExperience(experienceId));
      if (deleteExperience.fulfilled.match(resultAction)) {
        console.log(`Experience with ID ${experienceId} deleted successfully`);
      }
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };
  
  return (
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
              <div className="py-4 px-3 md:px-8 rounded shadow" key={experience?.id || index}>
                {isEditing && editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={newExperience.title}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          title: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={newExperience.company}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          company: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      value={newExperience.from}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          from: e.target.value,
                        })
                      }
                      className="bg-white w-full p-2 mb-2 border rounded"
                      placeholder="From"
                    />
                    <input
                      type="text"
                      value={newExperience.to}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
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
                    <h2>{experience.title}</h2>
                    <p>{experience.company}</p>
                    <p>
                      {experience.from} - {experience.to}
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
                        onClick={() => handleDelete(experience.id)}
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

      {/* Add Experience Button */}
      {!addExperience ? (
        <button
          className="py-2 px-3 md:px-6 text-white bg-blue-500 rounded mt-2"
          onClick={() => setAddExperience(true)}
        >
          Add Experience
        </button>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mt-4">
            Add New Experience
          </h3>
          <input
            type="text"
            value={newExperience.title}
            onChange={(e) =>
              setNewExperience({ ...newExperience, title: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="Title"
          />
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="Company"
          />
          <input
            type="text"
            value={newExperience.from}
            onChange={(e) =>
              setNewExperience({ ...newExperience, from: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="From"
          />
          <input
            type="text"
            value={newExperience.to}
            onChange={(e) =>
              setNewExperience({ ...newExperience, to: e.target.value })
            }
            className="bg-white w-full p-2 mb-2 border rounded"
            placeholder="To"
          />
          <button
            className="py-2 px-6 text-white bg-blue-500 rounded mt-2"
            onClick={handleAddExperience}
          >
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default Experience;
