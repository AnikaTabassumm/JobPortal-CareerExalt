const express = require("express");
const router = express.Router();
const {
  createCandidateSkill,
  getSkillsByJobSeekerId,
  updateCandidateSkill,
  deleteCandidateSkill,
} = require("../controllers/candidateSkillController");
const { protect } = require("../middleware/authMiddleware");

// Create a new personal skill for a job seeker
router.post("/", protect, createCandidateSkill); 

// Get all personal skills for a job seeker
router.get("/:jobSeekerId", protect, getSkillsByJobSeekerId); 

// Update a personal skill for a job seeker
router.put("/:id", protect, updateCandidateSkill); 

// Delete a skill for a job seeker
router.delete("/:id", protect, deleteCandidateSkill); 

module.exports = router;
