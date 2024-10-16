const CommonSkill = require("../models/commonSkill");
const Skill = require("../models/candidateSkill"); // Updated import name

// Get all common skills
const getAllCommonSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll(); // Fetch from Skill model instead of CommonSkill
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new common skill
const addCommonSkill = async (req, res) => {
  const { skill } = req.body; // skillName changed to skill for consistency
  try {
    const newSkill = await Skill.create({ skill });
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a common skill to a job seeker (junction table)
const assignSkillToJobSeeker = async (req, res) => {
  const { jobSeekerId, skillId } = req.body; // Changed from commonSkillId to skillId
  try {
    const commonSkillAssignment = await CommonSkill.create({
      jobSeekerId,
      skillId,
    });
    res.status(201).json(commonSkillAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a common skill from a job seeker
const deleteJobSeekerSkill = async (req, res) => {
  const { jobSeekerId, skillId } = req.params; // Changed from commonSkillId to skillId
  try {
    await CommonSkill.destroy({
      where: { jobSeekerId, skillId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllCommonSkills,
    addCommonSkill,
    assignSkillToJobSeeker,
    deleteJobSeekerSkill
}
