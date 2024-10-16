"use client";

import {
  createSkill,
  deleteSkill,
  getSkillsByUserId,
} from "@/store/slices/candidateSkillSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Skill = ({ jobSeeker }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { skills, loading, error } = useSelector(
    (state) => state.candidateSkill
  );

  // const [isEditing, setIsEditing] = useState(false);
  // const [editingIndex, setEditingIndex] = useState(null);
  const [addSkills, setAddSkills] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (jobSeeker?.data?.userId) {
      dispatch(getSkillsByUserId(jobSeeker.data.userId));
    }
  }, [dispatch, jobSeeker]);

  useEffect(() => {
    console.log("Skill:", skills);
  }, [skills]);

  const addSkill = async () => {
    // const updatedSkills =  newSkill
    console.log("New Skill to Add:", newSkill);
    if (newSkill) {
      try {
        await dispatch(
          createSkill({ skillData: newSkill, userId: jobSeeker.data.userId })
        );
        console.log("Skill Added Successfully");
        setNewSkill(""); // Clear the input after adding skill
        dispatch(getSkillsByUserId(jobSeeker.data.userId));
      } catch (error) {
        console.error("Failed to add skill:", error);
      }
    }
    // const addSkill = async() => {
    //   const updatedSkills = [ ...skills, newSkill]
    //   // const skillAsString = JSON.stringify(updatedSkills);

    //   if (updatedSkills) {
    //     setSkills(updatedSkills);
    //     setNewSkill('');
    //   };

    // const updatedFormData = {
    //   ...jobSeeker.data,
    //   // skills: skillAsString
    // };

    // console.log("Updated FormData: ", updatedFormData);

    // await dispatch(
    //   updateJobSeeker({
    //     id: jobSeeker.data.userId,
    //     formData: updatedFormData,
    //   })
    // )
  };

  const removeSkill = async (skillId) => {
    await dispatch(deleteSkill(skillId));
    // dispatch(getSkillsByUserId(jobSeeker.data.userId));
  };

  return (
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
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 text-red-600"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}
        </>
      )}

      <input
        type="text"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        className="bg-white w-full p-2 mt-4 border rounded"
        placeholder="Add a new skill"
      />
      <button
        onClick={addSkill}
        className="mt-2 py-2 px-4 bg-blue-500 text-white rounded"
      >
        Add Skill
      </button>
    </div>
  );
};

export default Skill;
