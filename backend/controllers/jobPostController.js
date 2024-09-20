const asyncHandler = require('express-async-handler');
const JobPost = require('../models/jobPostModel');
const Employer = require('../models/employerModel');

// @desc Create a new job post
// @route POST /api/jobposts
// @access  Private (employer only)
const createJobPost = asyncHandler(async (req, res) => {
    const { employerEmail, title, description, requirements, location, salaryRange} = req.body;

    if (!employerEmail || !title || !description || !requirements || !location || !salaryRange) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    const employer = await Employer.findOne({ where: { userEmail: employerEmail}});
    
    if(!employer) {
        res.status(404);
        throw new Error('Employer not found!');
    }

    const newJobPost = await JobPost.create({
        employerId: employer.userId,
        title,
        description,
        requirements,
        location,
        salaryRange,
    });

    res.status(201).json(newJobPost);
});


// @desc Get all job posts
// @route GET /api/jobposts/all
// @access Public
const getAllJobPosts = asyncHandler(async (req, res) => {
    const jobPosts = await JobPost.findAll();
    res.status(200).json(jobPosts);
});

// @desc Get a single job post
// @route GET /api/jobposts/:id
// @access Public
const getJobPostById = asyncHandler(async (req, res) => {
    const jobPost = await JobPost.findByPk(req.params.id);

    if (!jobPost) {
        res.status(404);
        throw new Error('Job post not found');
    }

    res.status(200).json(jobPost);
});

// @desc Get job posts by employer ID
// @route GET /api/jobposts/employer/:employerId
// @access Private
const getJobPostsByEmployer = asyncHandler(async (req, res) => {
    const {employerId} = req.params;

    const jobPosts = await JobPost.findAll({ where: { employerId } });

    if(!jobPosts) {
        res.status(404);
        throw new Error('No job posts found');
    };

    res.status(200).json(jobPosts);
});

// @desc Update job post
// @route PUT /api/jobposts/:id
// @access Private
const updateJobPost = asyncHandler(async (req, res) => {
    
  const jobPost = await JobPost.findByPk(req.params.id);
  
    if (!jobPost) {
      res.status(404);
      throw new Error("Job post not found");
    }
  
    await JobPost.update(req.body, { where: { id: req.params.id } });
  
    const updatedJobPost = await JobPost.findByPk(req.params.id);
  
    res.status(200).json(updatedJobPost);
  });

  const deleteJobPost = asyncHandler(async (req, res) => {
    
    const jobPost = await JobPost.findByPk(req.params.id);
    
      if (!jobPost) {
        res.status(404);
        throw new Error("Job post not found");
      }
    
      await JobPost.destroy();
    
      res.status(200).json({ message: 'Job Post deleted successfully' });
    });

  module.exports = {
    createJobPost,
    getAllJobPosts,
    getJobPostById,
    getJobPostsByEmployer,
    updateJobPost,
    deleteJobPost
  };
