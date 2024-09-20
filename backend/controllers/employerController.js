const asyncHandler = require('express-async-handler');
const Employer = require('../models/employerModel');

//@desc Get employer's data
//@route GET /api/employers/:id
//@access Private
const getEmployer = asyncHandler(async (req, res) => {
    const employer = await Employer.findOne({ where: { userId: req.params.id } });

    if (!employer) {
        res.status(404);
        throw new Error('Employer not found');
    }

    res.status(200).json(employer);
});

//@desc Update employer's data
//@route PUT /api/employers/:id
//@access Private
const updateEmployer = asyncHandler(async (req, res) => {
    const employer = await Employer.findOne({ where: { userId: req.params.id } });

    if (!employer) {
        res.status(404);
        throw new Error('Employer not found');
    }

    const updatedEmployer = await Employer.update(req.body, { where: { userId: req.params.id }, returning: true });

    res.status(200).json(updatedEmployer);
});

//@desc Delete employer
//@route DELETE /api/employers/:id
//@access Private
const deleteEmployer = asyncHandler(async (req, res) => {
    const employer = await Employer.findOne({ where: { userId: req.params.id } });

    if (!employer) {
        res.status(404);
        throw new Error('Employer not found');
    }

    await employer.destroy();

    res.status(200).json({ message: 'Employer deleted' });
});

const getAllEmployers = asyncHandler(async (req, res) => {
    const employers = await Employer.findAll();

    if (!employers || employers.length === 0) {
        res.status(404);
        throw new Error('No employers found');
    }

    res.status(200).json(employers);
});


module.exports = {
    getEmployer,
    updateEmployer,
    deleteEmployer,
    getAllEmployers
};