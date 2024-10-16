const asyncHandler = require('express-async-handler');
const Employer = require('../models/employerModel');
const fs = require('fs');
const path = require('path');


//@desc Get employer's data
//@route GET /api/employers/:id
//@access Private
const getEmployer = asyncHandler(async (req, res) => {

    console.log('reqq: ',req)
    const {id} = req.params;
  const employer = await Employer.findOne({ where: { userId: id } });

  if (!employer) {
      res.status(404);
      throw new Error('Employer not found');
  }

  res.status(200).json({
        success: true,
        message: 'Employer retrieved successfully',
        data: employer,
  });
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
  const [rowsUpdated, [updatedEmployer]] = await Employer.update(req.body, {
      where: { userId: req.params.id },
      returning: true, 
  });

  if (rowsUpdated === 0) {
      res.status(400);
      throw new Error('Failed to update employer');
  }

  res.status(200).json(updatedEmployer);
});

// @desc Upload company logo
// @route POST /api/employers/:id/upload
// @access Private
const uploadCompanyLogo = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const employer = await Employer.findOne({ where: { userId: req.params.id } });

    if (!employer) {
        return res.status(404).json({ message: 'Employer not found' });
    }

    const filePath = `uploads/${req.file.filename}`;

    await Employer.update({ companyLogo: filePath }, { where: { userId: req.params.id } });

    res.status(200).json({
        message: 'Company logo uploaded successfully',
        companyLogo:  req.file.path,
    });
});

// @desc Delete company logo
// @route DELETE /api/employers/:id/logo
// @access Private
const deleteCompanyLogo = asyncHandler(async (req, res) => {
    const employer = await Employer.findOne({ where: { userId: req.params.id } });

    if (!employer || !employer.companyLogo) {
        return res.status(404).json({ message: 'Logo not found' });
    }

    // Delete the file from the uploads folder
    const filePath = path.join(__dirname, '..', employer.companyLogo);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('File deleted successfully');
    } else {
        console.log('File not found on the server');
        return res.status(404).json({ message: 'File not found on the server' });
      }

    await Employer.update({ companyLogo: null }, { where: { userId: req.params.id } });

    res.status(200).json({ message: 'Logo deleted successfully' });
});

// @desc Delete employer
// @route DELETE /api/employers/:id
// @access Private
const deleteEmployer = asyncHandler(async (req, res) => {
    const employer = await Employer.findOne({ where: { userId: req.params.id } });

    if (!employer) {
        res.status(404);
        throw new Error('Employer not found');
    }

    await employer.destroy();
    res.status(200).json({ message: 'Employer deleted' });
});

// @desc Get all employers
// @route GET /api/employers
// @access Private
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
    getAllEmployers,
    uploadCompanyLogo,
    deleteCompanyLogo,
};
