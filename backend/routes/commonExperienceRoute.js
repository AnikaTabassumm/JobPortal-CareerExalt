// routes/jobSeekerExperienceRoutes.js
const express = require('express');
const router = express.Router();
const {
    addExperienceToJobSeeker,
    getExperiencesByJobSeeker,
    updateJobSeekerExperience,
    deleteJobSeekerExperience,
    getJobSeekersByExperience
} = require('../controllers/commonExperienceController');



// Add experience association for job seeker
router.post('/:jobSeekerId/add-experience', addExperienceToJobSeeker);

// Get all experiences by job seeker
router.get('/:jobSeekerId/experiences', getExperiencesByJobSeeker);

// Update experience association for job seeker
router.put('/:jobSeekerId/update-experience/:oldExperienceId', updateJobSeekerExperience);

// Delete experience association for job seeker
router.delete('/:jobSeekerId/delete-experience/:experienceId', deleteJobSeekerExperience);

// Get all job seekers by experience
router.get('/experience/:experienceId/job-seekers', getJobSeekersByExperience);

module.exports = router;
