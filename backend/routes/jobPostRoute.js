const express = require('express');
const router = express.Router();
const {createJobPost, getAllJobPosts, getJobPostById, getJobPostsByEmployer, updateJobPost, deleteJobPost} = require('../controllers/jobPostController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/createJob', protect, authorize('employer'), createJobPost);
router.get('/all', getAllJobPosts);
router.get('/:id', getJobPostById);
router.get('/employer/:employerId', protect, authorize('employer', 'admin'), getJobPostsByEmployer);
router.put('/:id', protect, authorize('employer'), updateJobPost);
router.delete('/deleteJob', protect, authorize('employer', 'admin'), deleteJobPost);

module.exports = router;