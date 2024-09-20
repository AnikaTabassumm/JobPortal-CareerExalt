const asyncHandler = require('express-async-handler');
const JobApplication = require('../models/jobApplicationModel');
const { JobSeeker, JobPost } = require('../models');

//@desc Create new job application
//@route POST /api/jobApplications/jobPosts/:jobPostId
//@access Private
const createJobApplication = asyncHandler(async (req, res) => {
    const { jobSeekerEmail, resume, coverLetter } = req.body;
    const { jobPostId} = req.params

    if (!jobSeekerEmail || !resume) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    const jobseeker = await JobSeeker.findOne({where: { userEmail: jobSeekerEmail}});

    if(!jobseeker) {
        res.status(404);
        throw new Error('Job seeker not found!');
    }

    const jobPost = await JobPost.findByPk(jobPostId);

    if(!jobPost) {
        res.status(404);
        throw new Error('Job Post not found!');
    }

    const jobApplication = await JobApplication.create({
        jobSeekerId: jobseeker.userId,
        jobPostId,
        resume,
        coverLetter,
    });

    res.status(201).json(jobApplication);
});

//@desc Get job application by ID
//@route GET /api/jobApplications/:id
//@access Private
const getJobApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const jobApplication = await JobApplication.findByPk(id, {
        include: [
            { model: JobSeeker, attributes: ['userName', 'userEmail'] },
            { model: JobPost, attributes: ['title', 'description'] }
        ]
    });

    if (!jobApplication) {
        res.status(404);
        throw new Error('Job application not found');
    }

    res.status(200).json(jobApplication);
});

//@desc Get job applications by job post ID
//@route GET /api/jobApplications/jobPost/:jobPostId
//@access Private
const getJobApplicationByJobPostId = asyncHandler(async (req, res) => {
    const { jobPostId } = req.params;

    const jobApplications = await JobApplication.findAll({
        where: { jobPostId },
        include: [
            { model: JobSeeker, attributes: ['userName', 'userEmail'] },
            { model: JobPost, attributes: ['title', 'description'] }
        ]
    });

    if (!jobApplications || jobApplications.length === 0) {
        res.status(404);
        throw new Error('No job applications found for this job post');
    }

    res.status(200).json(jobApplications);
});

//@desc Delete job application by ID
//@route DELETE /api/jobApplications/:id
//@access Private
const deleteJobApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const jobApplication = await JobApplication.findByPk(id);

    if (!jobApplication) {
        res.status(404);
        throw new Error('Job application not found');
    }

    await jobApplication.destroy();

    res.status(200).json({ message: 'Job application deleted successfully' });
});

module.exports = {
    createJobApplication,
    getJobApplication,
    getJobApplicationByJobPostId,
    deleteJobApplication,
};