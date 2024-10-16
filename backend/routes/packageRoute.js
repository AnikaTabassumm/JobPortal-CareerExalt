const express = require('express');
const router = express.Router();
const {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage
} = require('../controllers/packageController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a new package (admin only)
router.post('/', protect, authorize('admin'), createPackage);

// Route to get all packages (public)
router.get('/', getAllPackages);

// Route to get a single package by ID (public)
router.get('/:id', getPackageById);

// Route to update package by ID (admin only)
router.put('/:id', protect, authorize('admin'), updatePackage);

// Route to delete a package by ID (admin only)
router.delete('/:id', protect, authorize('admin'), deletePackage);

module.exports = router;
