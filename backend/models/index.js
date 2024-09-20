const { sequelize } = require('../config/db');
const Admin = require('./adminModel');
const Employer = require('./employerModel');
const JobApplication = require('./jobApplicationModel');
const JobPost = require('./jobPostModel');
const JobSeeker = require('./jobSeekerModel');
// const Resume = require('./resumeModel');
const User = require('./userModel');
const Contact = require('./contactModel');
const OTP = require('./otpModel');


User.hasOne(JobSeeker, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Employer, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Admin, { foreignKey: 'userId', onDelete: 'CASCADE' });

JobSeeker.belongsTo(User, { foreignKey: 'userId' });
// JobSeeker.hasMany(Resume, { foreignKey: 'jobSeekerId', onDelete: 'CASCADE' });

Employer.belongsTo(User, { foreignKey: 'userId' });
Employer.hasMany(JobPost, { foreignKey: 'employerId'})
Admin.belongsTo(User, { foreignKey: 'userId' });

// Resume.belongsTo(JobSeeker, { foreignKey: 'jobSeekerId' });
// Resume.belongsTo(JobPost, { foreignKey: 'jobPostId' });

JobPost.belongsTo(Employer, {foreignKey: 'employerId'});
// JobPost.hasMany(Resume, { foreignKey: 'jobPostId', onDelete: 'CASCADE' });
JobPost.hasMany(JobApplication, { foreignKey: 'jobPostId', onDelete: 'CASCADE' });

JobApplication.belongsTo(JobSeeker, {foreignKey: 'jobSeekerId'}),
JobApplication.belongsTo(JobPost, {foreignKey: 'jobPostId'}),
// JobApplication.belongsTo(Resume, {foreignKey: 'resumeId'}),

OTP.belongsTo(User, { foreignKey: 'userId'});

module.exports = {
    sequelize,
    User,
    JobSeeker,
    Employer,
    Admin,
    // Resume,
    JobApplication,
    JobPost,
    Contact,
    OTP
}