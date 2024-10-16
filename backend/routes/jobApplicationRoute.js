const express = require("express");
const router = express.Router();
const upload = require("../middleware/fileUploadMiddleware");
const {
  createJobApplication,
  getJobApplication,
  getJobApplicationByJobPostId,
  deleteJobApplication,
  getJobApplicationsByJobSeekerId,
  updateJobApplicationStatus,
} = require("../controllers/jobApplicationController");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/jobPosts/:jobPostId",
  protect,
  upload.fields([{ name: "resume" }, { name: "coverLetter" }]),
  createJobApplication
);
router.get("/jobPosts/:jobPostId", protect, getJobApplicationByJobPostId);
router
  .route("/:id")
  .get(protect, getJobApplication)
  .delete(protect, deleteJobApplication);

router.get('/job-seeker/:jobSeekerId', protect, getJobApplicationsByJobSeekerId);
router.put('/:applicationId/status', updateJobApplicationStatus);

module.exports = router;
