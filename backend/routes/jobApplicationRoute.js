const express = require('express');
const router = express.Router();
const {createJobApplication, getJobApplication, getJobApplicationByJobPostId, deleteJobApplication} = require('../controllers/jobApplicationController');

router.post('/jobPosts/:jobPostId', createJobApplication);
router.get('/jobPosts/:jobPostId', getJobApplicationByJobPostId);
router.route('/:id').get(getJobApplication).delete(deleteJobApplication);

module.exports = router;