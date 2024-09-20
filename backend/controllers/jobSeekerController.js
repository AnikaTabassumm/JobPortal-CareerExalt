const asyncHandler = require("express-async-handler");
const JobSeeker = require('../models/jobSeekerModel');

//@desc Get jobSeeker's data
//@route GET/api/jobSeekers/:id
//@access Private
const getJobSeeker = asyncHandler(async (req, res) => {
    const jobseeker = await JobSeeker.findOne({ where: { userId: req.params.id }});

    if(!jobseeker) {
        res.status(404);
        throw new Error('Jobseeker not found!')
    }

    res.status(200).json(jobseeker)
});

//@desc Update jobSeeker's data
//@route PUT /api/jobSeekers/:id
//@access Private
const updateJobSeeker = asyncHandler(async (req, res) => {
    const jobseeker = await JobSeeker.findOne({ where: { userId: req.params.id }});

    if (!jobseeker) {
        res.status(404);
        throw new Error('Job Seeker not found');
    }

    await JobSeeker.update(req.body, { where: { userId: req.params.id } });

    const updatedJobSeeker = await JobSeeker.findOne({ where: { userId: req.params.id } });
    res.status(200).json(updatedJobSeeker);
});

//@desc Delete jobSeeker's data
//@route DELETE /api/jobSeekers/:id
//@access Private
const deleteJobSeeker = asyncHandler(async (req, res) => {
    const jobseeker = await JobSeeker.findOne({ where: { userId: req.params.id } });

    if (!jobseeker) {
        res.status(404);
        throw new Error('Job Seeker not found');
    }

    await jobseeker.destroy();

    res.status(200).json({ message: 'Job Seeker deleted' });
});

const getAllJobSeekers = asyncHandler(async (req, res) => {
    const jobseekers = await JobSeeker.findAll(); 
    if(!jobseekers || jobseekers.length === 0) {
        res.status(404);
        throw new Error('No job seekers found!');
    }

    res.status(200).json(jobseekers);
});


module.exports = {
    getJobSeeker,
    updateJobSeeker,
    deleteJobSeeker,
    getAllJobSeekers
};
