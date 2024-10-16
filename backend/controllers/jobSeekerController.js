const asyncHandler = require("express-async-handler");
const JobSeeker = require('../models/jobSeekerModel');
const fs = require('fs');
const path = require('path');
//@desc Get jobSeeker's data
//@route GET/api/jobSeekers/:id
//@access Private
const getJobSeeker = asyncHandler(async (req, res) => {
    console.log('Headers:', req.headers);
    const {id} = req.params;
    const jobseeker = await JobSeeker.findOne({ where: { userId: id }});

    if(!jobseeker) {
        res.status(404);
        throw new Error('Jobseeker not found!')
    }


    // Send a structured response
    res.status(200).json({
        success: true,
        message: 'Jobseeker retrieved successfully',
        data: jobseeker,
    });
});

//@desc Update jobSeeker's data
//@route PUT /api/jobSeekers/:id
//@access Private
// const updateJobSeeker = asyncHandler(async (req, res) => {
//     console.log("Request Body:", req.body);
//     const jobseeker = await JobSeeker.findOne({ where: { userId: req.params.id } });

//     if (!jobseeker) {
//         res.status(404);
//         throw new Error('Jobseeker not found');
//     }

//     // if (req.body.experience) {
//     //     // req.body.experience = JSON.stringify(req.body.experience);
//     //     try {
//     //         req.body.experience = JSON.parse(req.body.experience); // Ensure it's valid JSON
//     //       } catch (e) {
//     //         console.error('Failed to parse experience field:', e); // Log error
//     //         return res.status(400).json({ error: 'Invalid experience format' });
//     //       }
//     // }

//     const [rowsUpdated, [updatedJobseeker]] = await JobSeeker.update(req.body, {
//         where: { userId: req.params.id },
//         returning: true, 
//     });

//     if (rowsUpdated === 0) {
//         res.status(400);
//         throw new Error('Failed to update jobseeker');
//     }

//     console.log("Updated Jobseeker:", updatedJobseeker); // Log updated job seeker
//     // updatedJobseeker.experience = JSON.parse(updatedJobseeker.experience || '[]');

//     res.status(200).json(updatedJobseeker);
// });



const uploadProfilePicture = async (req, res) => {
    console.log('Request Body:', req.body); // Check if any data is in the body
    console.log('Request Params:', req.params); // Check params
    console.log('Request File:', req.file); // Check if file is received
    try {
        if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
   
      const jobSeeker = await JobSeeker.findOne({ where: {userId: req.params.id}});
  
      if (!jobSeeker) {
        return res.status(404).json({ message: "Job Seeker not found" });
      }

      
      const filePath = `uploads/${req.file.filename}`;
      console.log(filePath)
      // Update the profile picture field with the uploaded file's path
      const updateResponse = await JobSeeker.update(
        { profilePicture: filePath },
        { where: { userId: req.params.id } }
      );
      console.log("Update Response:", updateResponse);
  
      res.status(200).json({
        message: "Profile picture uploaded successfully",
        profilePicture: req.file.path,
      });
    } catch (error) {
        console.error("Error uploading profile picture:", error); // Log the error
        res.status(500).json({ message: "Error uploading profile picture", error: error.message });
    }
  };

  const deleteProfilePicture = async (req, res) => {
    try {
      const jobSeeker = await JobSeeker.findOne({ where: { userId: req.params.id}});
      console.log('jobseeker :', jobSeeker)
  
      if (!jobSeeker || !jobSeeker.profilePicture) {
        return res.status(404).json({ message: 'Profile picture not found' });
      }
  
      // Delete the file from the uploads folder
      const filePath = path.join(__dirname, '..', jobSeeker.profilePicture); // Construct the full file path
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Remove the file
        console.log('File deleted successfully');
      }  else {
        console.log('File not found on the server');
        return res.status(404).json({ message: 'File not found on the server' });
      }
  
      // Update the jobSeeker's profilePicture field in the database
      await JobSeeker.update(
        { profilePicture: null },
        { where: { userId: req.params.id } }
      );
  
      res.status(200).json({ message: 'Profile picture deleted successfully' });
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      res.status(500).json({ message: 'Error deleting profile picture' });
    }
  };

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
    deleteJobSeeker,
    getAllJobSeekers,
    uploadProfilePicture,
    deleteProfilePicture
};
