const asyncHandler = require("express-async-handler");
const CandidateEducation = require('../models/candidateEducation');

//@desc Create candidate education
//@route POST /api/educations
//@access Private
const createEducation = asyncHandler(async (req, res) => {
    const { userId, degree, institution, from, to } = req.body;
    
    const education = await CandidateEducation.create({ userId, degree, institution, from, to });
    res.status(201).json({ success: true, data: education });
});

// Fetch all experiences for a candidate
const getEducation = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
  
    try {
      const education = await CandidateEducation.findAll({
        where: { userId },
      });
  
      if (!education) {
        return res.status(404).json({ message: 'No education found' });
      }
      
      res.json({ education });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching experiences' });
    }
  });

//@desc Update candidate education
//@route PUT /api/educations/:id
//@access Private
const updateEducation = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const education = await CandidateEducation.findByPk(id);

    if (!education) {
        res.status(404);
        throw new Error('Education record not found');
    }

    const updatedEducation = await education.update(req.body);
    res.status(200).json ( {success: true, updatedEducation});
});

//@desc Delete candidate education
//@route DELETE /api/educations/:id
//@access Private
const deleteEducation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const education = await CandidateEducation.findByPk(id);

    if (!education) {
        res.status(404);
        throw new Error('Education record not found');
    }

    await education.destroy();
    res.status(200).json({ message: 'Education record deleted' });
});

// Export the functions
module.exports = {
    createEducation,
    updateEducation,
    deleteEducation,
    getEducation
};
