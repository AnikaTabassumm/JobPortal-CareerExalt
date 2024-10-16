const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./userModel');
const Resume = require('./resumeModel');

const JobSeeker = sequelize.define('Jobseeker', {

  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
{
  timestamps: true,
});



module.exports = JobSeeker;