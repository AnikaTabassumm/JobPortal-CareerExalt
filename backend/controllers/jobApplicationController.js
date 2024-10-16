const asyncHandler = require('express-async-handler');
const JobApplication = require('../models/jobApplicationModel');
const JobSeeker = require('../models/jobSeekerModel');
const JobPost = require('../models/jobPostModel');

//@desc Create new job application
//@route POST /api/jobApplications/jobPosts/:jobPostId
//@access Private
const createJobApplication = asyncHandler(async (req, res) => {
    const { jobSeekerId } = req.body;
    const { jobPostId } = req.params
    
    console.log('Files: ', req.files)

    if (!req.files || !req.files.resume || !req.files.coverLetter) {
        res.status(400);
        throw new Error('Please upload both resume and cover letter');
    }

    const resumeFile = req.files.resume[0]; // Assuming you are using a library like 'express-fileupload' or 'multer'
    const coverLetterFile = req.files.coverLetter[0];

    const jobseeker = await JobSeeker.findOne({ where: { userId: jobSeekerId } });

    if (!jobseeker) {
        res.status(404);
        throw new Error('Job seeker not found!');
    }

    const jobPost = await JobPost.findByPk(jobPostId);

    if (!jobPost) {
        res.status(404);
        throw new Error('Job Post not found!');
    }

    // const resume = req.files.resume[0].path; // multer stores files in an array
    // const coverLetter = req.files.coverLetter[0].path;

    try {
        const resumePath = `uploads/${resumeFile.filename}`;
        const coverLetterPath = `uploads/${coverLetterFile.filename}`;
        
        console.log('Resume Path:', resumePath);
        console.log('Cover Letter Path:', coverLetterPath);

        const jobApplication = await JobApplication.create({
            jobSeekerId: jobseeker.userId,
            jobPostId: jobPost.id,
            resume: resumePath,
            coverLetter: coverLetterPath,
        });
        res.status(201).json(jobApplication);
    } catch (error) {
        console.error('Error creating job application:', error);
        res.status(500).json({ message: 'Failed to create job application' });
    }
    
});

const updateJobApplicationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Find the job application by ID
    const jobApplication = await JobApplication.findByPk(id);

    if (!jobApplication) {
        res.status(404);
        throw new Error('Job application not found');
    }

    // Update the status
    jobApplication.status = status;
    await jobApplication.save();

    res.status(200).json({ message: 'Job application status updated successfully', jobApplication });
});

const getJobApplicationsByJobSeekerId = asyncHandler(async (req, res) => {
    const { jobSeekerId } = req.params;

    const applications = await JobApplication.findAll({
        where: { jobSeekerId },
        include: ['JobPost'] // Include JobPost or any other related model as needed
    });

    // if (!applications.length) {
    //     res.status(404);
    //     throw new Error('No job applications found for this job seeker.');
    // }

    res.status(200).json(applications);
});

//@desc Get job application by ID
//@route GET /api/jobApplications/:id
//@access Private
const getJobApplication = asyncHandler(async (req, res) => {
    const jobPostId = req.params.jobPostId;

    // Fetch job applications for the specified job post
    const applications = await JobApplication.findAll({
        where: { jobPostId },
        include: [{ model: JobSeeker, attributes: ['userId', 'name'] }] // Include seeker info as needed
    });

    if (!applications.length) {
        return res.status(404).json({ message: 'No applications found for this job post.' });
    }

    res.status(200).json(applications);
});

//@desc Get job applications by job post ID
//@route GET /api/jobApplications/jobPost/:jobPostId
//@access Private
const getJobApplicationByJobPostId = asyncHandler(async (req, res) => {
    const { jobPostId } = req.params;

    const jobApplications = await JobApplication.findAll({
        where: { jobPostId },
        include: [
            { model: JobSeeker, attributes: ['userName', 'userEmail'] }
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
    getJobApplicationsByJobSeekerId,
    updateJobApplicationStatus
};
