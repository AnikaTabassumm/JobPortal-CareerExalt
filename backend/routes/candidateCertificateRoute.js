const express = require("express");
const router = express.Router();
const {createCertificate, updateCertificate, deleteCertificate, getCertificate}= require('../controllers/candidateCertificateController');
const { protect } = require('../middleware/authMiddleware');

// Certificate Routes
router
    .route('/')
    .post(protect, createCertificate); // Create Certificate

router.route("/:userId").get(protect, getCertificate);
router
    .route('/:id')
    .put(protect, updateCertificate) // Update Certificate
    .delete(protect, deleteCertificate); // Delete Certificate

module.exports = router;
