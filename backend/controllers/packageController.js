const asyncHandler = require('express-async-handler');
const Package = require('../models/package');

// @desc    Create a new package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = asyncHandler(async (req, res) => {
    const { name, price,  benefits, postVisibilityDays } = req.body;

    if (!name || !price || !postVisibilityDays) {
        res.status(400);
        throw new Error('Please fill in all required fields');
    }

    const newPackage = await Package.create({
        name,
        price,
        benefits,
        postVisibilityDays,
    });

    res.status(201).json(newPackage);
});

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getAllPackages = asyncHandler(async (req, res) => {
    const packages = await Package.findAll();

    if (!packages) {
        res.status(404);
        throw new Error('No packages found');
    }

    res.status(200).json(packages);
});

// @desc    Get a single package by ID
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const singlePackage = await Package.findByPk(id);

    if (!singlePackage) {
        res.status(404);
        throw new Error('Package not found');
    }

    res.status(200).json(singlePackage);
});

// @desc    Update package by ID
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, price, benefits, postVisibilityDays } = req.body;

    const packageToUpdate = await Package.findByPk(id);

    if (!packageToUpdate) {
        res.status(404);
        throw new Error('Package not found');
    }

    packageToUpdate.name = name || packageToUpdate.name;
    packageToUpdate.price = price || packageToUpdate.price;
    packageToUpdate.benefits = benefits || packageToUpdate.benefits;
    packageToUpdate.postVisibilityDays = postVisibilityDays || packageToUpdate.postVisibilityDays;

    const updatedPackage = await packageToUpdate.save();
    res.status(200).json(updatedPackage);
});

// @desc    Delete a package by ID
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const packageToDelete = await Package.findByPk(id);

    if (!packageToDelete) {
        res.status(404);
        throw new Error('Package not found');
    }

    await packageToDelete.destroy();

    res.status(200).json({ message: 'Package deleted successfully' });
});

module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
};
