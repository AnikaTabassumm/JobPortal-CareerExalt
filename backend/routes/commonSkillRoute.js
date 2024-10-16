const express = require("express");
const router = express.Router();
const {getAllCommonSkills, addCommonSkill, assignSkillToJobSeeker, deleteJobSeekerSkill} = require("../controllers/commonSkillController");
const { protect } = require('../middleware/authMiddleware');

// Get all common skills
router.get("/", getAllCommonSkills); // Public access

// Add a new common skill
router.post("/", protect, addCommonSkill); // Requires authentication

// Assign a common skill to a job seeker
router.post("/assign", protect, assignSkillToJobSeeker); // Requires authentication

// Delete a common skill from a job seeker
router.delete("/:jobSeekerId/:commonSkillId", protect, deleteJobSeekerSkill); // Requires authentication

module.exports = router;

