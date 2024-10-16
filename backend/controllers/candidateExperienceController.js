const asyncHandler = require("express-async-handler");
const CandidateExperience = require('../models/candidateExperience');

// Create a candidate's experience
const createExperience = asyncHandler(async (req, res) => {
    const { title, company, from, to, userId } = req.body;

    const experience = await CandidateExperience.create({ userId, title, company, from, to });
    res.status(201).json({ success: true, data: experience });
});

// Fetch all experiences for a candidate
const getExperience = asyncHandler(async (req, res) => {
  const { userId } = req.params; // or from decoded token, req.user, etc.
  
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const experiences = await CandidateExperience.findAll({
      where: { userId },
    });

    if (!experiences) {
      return res.status(404).json({ message: 'No experiences found' });
    }
    
    res.json({ experiences });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching experiences' });
  }
});
  

// Update a candidate's experience
const updateExperience = asyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming you meant id here
    const experience = await CandidateExperience.findByPk(id);

    if (!experience) {
        return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    const updatedExperience = await experience.update(req.body);
    res.status(200).json({ success: true, updatedExperience });
});

// Delete a candidate's experience
const deleteExperience = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const experience = await CandidateExperience.findByPk(id);

    if (!experience) {
        return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    await experience.destroy();
    res.status(200).json({ success: true, message: 'Experience deleted' });
});

module.exports = {
    createExperience,
    updateExperience,
    deleteExperience,
    getExperience
};
