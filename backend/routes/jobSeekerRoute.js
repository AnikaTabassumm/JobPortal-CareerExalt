const express = require("express");
const router = express.Router();
const {getJobSeeker, deleteJobSeeker, uploadProfilePicture, deleteProfilePicture} = require('../controllers/jobSeekerController');
const {protect} = require('../middleware/authMiddleware');
const upload = require('../middleware/fileUploadMiddleware');

router.route('/:id').get(protect, getJobSeeker).delete(protect, deleteJobSeeker);
router.post(
    "/:id/profile-picture",
    protect, 
    upload.single("profilePicture"), 
    uploadProfilePicture 
  );
router.delete('/:id/profile-picture', protect, deleteProfilePicture);


module.exports = router;

