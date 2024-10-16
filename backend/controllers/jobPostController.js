const asyncHandler = require('express-async-handler');
const JobPost = require('../models/jobPostModel');
const Employer = require('../models/employerModel');
const Package = require('../models/package');
const Order = require('../models/order');

// @desc Create a new job post
// @route POST /api/jobposts
// @access  Private (employer only)
const createJobPost = asyncHandler(async (req, res) => {
  const { employerId, packageId, company, category, title, description, requirements, location, salaryRange } = req.body;

  if (!category || !title || !description || !requirements || !location || !salaryRange) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  const employer = await Employer.findOne({ where: { userId: employerId } });
  
  if (!employer) {
    res.status(404);
    throw new Error('Employer not found');
  }
  const pack = await Package.findOne({ where: { id: packageId } });


  // // Calculate expiration date based on package's `postVisibilityDays`
  // const expirationDate = new Date();
  // expirationDate.setDate(expirationDate.getDate() + pack.postVisibilityDays);

  const newJobPost = await JobPost.create({
    employerId: employer.userId,
    packageId: pack.id,
    company,
    category,
    title,
    description,
    requirements,
    location,
    salaryRange,
    // expirationDate, 
    // visibilityStatus,
    // status: 'pending', 
  });

  res.status(201).json(newJobPost);
});

// @desc Get all job posts
// @route GET /api/jobposts/all
// @access Public
const getAllJobPosts = asyncHandler(async (req, res) => {
  try {
    const jobPosts = await JobPost.findAll({
      include: [
        {
          model: Employer,
          attributes: ['companyName', 'companyLogo'], // Include other fields if needed
        },
      ],
    });
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job posts' });
  }
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
  const { employerId } = req.params;

  const jobPosts = await JobPost.findAll({ where: { employerId } });

  if (!jobPosts.length) {
    res.status(404);
    throw new Error('No Job posts found');
  }

  res.status(200).json(jobPosts);
});

// @desc Update job post
// @route PUT /api/jobposts/:id
// @access Private
const updateJobPost = asyncHandler(async (req, res) => {
  console.log('Request body:', req.body);
  const { category, title, description, requirements, location, salaryRange } = req.body;
  
  const jobPost = await JobPost.findByPk(req.params.id);

  if (!jobPost) {
    res.status(404);
    throw new Error("Job post not found");
  }

  await jobPost.update({
    category,
    title,
    description,
    requirements,
    location,
    salaryRange
  });

  const updatedJobPost = await JobPost.findByPk(req.params.id);

  res.status(200).json(updatedJobPost);
});

// @desc Delete job post
// @route DELETE /api/jobposts/:id
// @access Private
const deleteJobPost = asyncHandler(async (req, res) => {
  
  const { id } = req.params;
  console.log("del: ", id)
  await Order.destroy({ where: { jobPostId: id } });

  const jobPost = await JobPost.findByPk(id);

  if (!jobPost) {
    res.status(404);
    throw new Error("Job post not found");
  }

  await jobPost.destroy();

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
