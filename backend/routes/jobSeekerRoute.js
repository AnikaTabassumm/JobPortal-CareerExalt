const express = require("express");
const router = express.Router();
const {getJobSeeker, updateJobSeeker, deleteJobSeeker} = require('../controllers/jobSeekerController');
// const {protect} = require('../middleware/authMiddleware');


router.route('/:id').get(getJobSeeker).put(updateJobSeeker).delete(deleteJobSeeker);

module.exports = router;

//router.route('/:id').get(protect, getJobSeeker).put(protect, updateJobSeeker).delete(protect, deleteJobSeeker);