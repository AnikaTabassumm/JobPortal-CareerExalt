const { commonExperience, candidateExperience, JobSeeker } = require('../models');

// Add Experience Association
const addExperienceToJobSeeker = async (req, res) => {
    try {
        const { experienceId } = req.body;
        const jobSeekerId = req.params.jobSeekerId;

        const newAssociation = await commonExperience.create({ jobSeekerId, experienceId });
        res.status(201).json(newAssociation);
    } catch (error) {
        res.status(500).json({ message: 'Error adding experience to job seeker', error });
    }
};

// Fetch All Experiences for Job Seeker
const getExperiencesByJobSeeker = async (req, res) => {
    try {
        const jobSeekerId = req.params.jobSeekerId;

        const experiences = await commonExperience.findAll({
            where: { jobSeekerId },
            include: [{ model: candidateExperience }],
        });

        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching experiences for job seeker', error });
    }
};

// Update Experience Association
const updateJobSeekerExperience = async (req, res) => {
    try {
        const { experienceId } = req.body;
        const jobSeekerId = req.params.jobSeekerId;

        const updatedAssociation = await commonExperience.update(
            { experienceId },
            { where: { jobSeekerId, experienceId: req.params.oldExperienceId } }
        );

        if (updatedAssociation[0] === 0) {
            return res.status(404).json({ message: 'Experience association not found' });
        }

        res.status(200).json({ message: 'Experience association updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating experience association', error });
    }
};

// Delete Experience Association
const deleteJobSeekerExperience = async (req, res) => {
    try {
        const { experienceId } = req.params;
        const jobSeekerId = req.params.jobSeekerId;

        const deleted = await commonExperience.destroy({
            where: { jobSeekerId, experienceId },
        });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Experience association not found' });
        }

        res.status(200).json({ message: 'Experience association deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting experience association', error });
    }
};

// Get All Job Seekers by Experience
const getJobSeekersByExperience = async (req, res) => {
    try {
        const experienceId = req.params.experienceId;

        const jobSeekers = await commonExperience.findAll({
            where: { experienceId },
            include: [{ model: JobSeeker }],
        });

        res.status(200).json(jobSeekers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job seekers for experience', error });
    }
};

module.exports = {
    addExperienceToJobSeeker,
    getExperiencesByJobSeeker,
    getJobSeekersByExperience,
    updateJobSeekerExperience,
    deleteJobSeekerExperience
}