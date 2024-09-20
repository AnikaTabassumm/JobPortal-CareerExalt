const express = require('express');
const router = express.Router();
const {getEmployer, updateEmployer, deleteEmployer} = require('../controllers/employerController');
// const {protect} = require('../middleware/authMiddleware');

router.route('/:id').get(getEmployer).put(updateEmployer).delete(deleteEmployer);

module.exports = router;

// router.route('/:id').get(protect, getEmployer).put(protect, updateEmployer).delete(protect, deletetEmployer);