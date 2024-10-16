const express = require("express");
const router = express.Router();
const {createEducation, updateEducation, deleteEducation, getEducation} = require('../controllers/candidateEducationController');
const { protect } = require('../middleware/authMiddleware');

// Education Routes
router
    .route('/')
    .post(protect, createEducation); // Create Education

router.route("/:userId").get(protect, getEducation);
router
    .route('/:id')
    .put(protect, updateEducation)  // Update Education
    .delete(protect, deleteEducation); // Delete Education

module.exports = router;
