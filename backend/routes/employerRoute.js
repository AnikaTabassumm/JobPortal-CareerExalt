const express = require('express');
const router = express.Router();
const {getEmployer, updateEmployer, deleteEmployer, getAllEmployers, uploadCompanyLogo, deleteCompanyLogo} = require('../controllers/employerController');
const {protect} = require('../middleware/authMiddleware');
const upload = require("../middleware/fileUploadMiddleware"); 

router.get('/all', getAllEmployers);

router.route('/:id').get(protect, getEmployer).put(protect, updateEmployer).delete(protect, deleteEmployer);
router.post(
    "/:id/company-logo",
    protect, 
    upload.single("companyLogo"), 
    uploadCompanyLogo 
  );
router.delete('/:id/company-logo', protect, deleteCompanyLogo);

module.exports = router;

