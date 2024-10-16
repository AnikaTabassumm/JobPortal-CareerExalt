const asyncHandler = require("express-async-handler");
const Skill = require('../models/candidateSkill'); // Updated import name

// Create a new personal skill (for a job seeker)
const createCandidateSkill = asyncHandler(async (req, res) => {
  const { skill, jobSeekerId } = req.body;

  if (!jobSeekerId || !skill) {
    res.status(400);
    throw new Error("Job Seeker ID and Skill are required");
  }

  const newSkill = await Skill.create({
    
    skill: skill,
    userId: jobSeekerId,
  });
  res.status(201).json(newSkill);
  // res.status(201).json({ success: true, data: newSkill });
});

// Get all personal skills for a job seeker
const getSkillsByJobSeekerId = asyncHandler(async (req, res) => {
  const {jobSeekerId} = req.params; // Fixed variable retrieval

  const skills = await Skill.findAll({ where: { userId: jobSeekerId } });

  if (!skills.length) { // Check for empty array instead of null
    res.status(404);
    throw new Error("Skills not found");
  }
  console.log("Skills found: ", skills); 
  res.status(200).json({skills});
});

// Update personal skill for job seeker
const updateCandidateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const { skill } = req.body;

  const skillToUpdate = await Skill.findByPk(id);

  if (!skillToUpdate) {
    res.status(404);
    throw new Error("Skill not found");
  }

  // skillToUpdate.skill = skill || skillToUpdate.skill;

  const updatedSkill = await skillToUpdate.update(req.body);

  res.status(200).json({success: true, updatedSkill});
});

// Delete a skill for job seeker
const deleteCandidateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skill = await Skill.findByPk(id);

  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }

  await skill.destroy();

  res.status(200).json({ message: "Skill removed" });
});

module.exports = {
  createCandidateSkill,
  getSkillsByJobSeekerId,
  updateCandidateSkill,
  deleteCandidateSkill,
};
