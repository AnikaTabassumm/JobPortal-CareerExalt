const express = require("express");
const router = express.Router();
const {
  createExperience,
  updateExperience,
  deleteExperience,
  getExperience
} = require("../controllers/candidateExperienceController");
const { protect } = require("../middleware/authMiddleware");


router.route("/").post(protect, createExperience); // Create Experience

router.route("/:userId").get(protect, getExperience); // Fetch candidate's experiences

router
  .route("/:id")
  .put(protect, updateExperience) // Update Experience
  .delete(protect, deleteExperience); // Delete Experience

module.exports = router;
