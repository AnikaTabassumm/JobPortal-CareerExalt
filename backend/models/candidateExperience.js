const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const JobSeeker = require('./jobSeekerModel');

const CandidateExperience = sequelize.define('CandidateExperience', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: JobSeeker, // Assuming you have a JobSeeker model
      key: 'userId',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'candidate_experiences',
  timestamps: true,
});

module.exports = CandidateExperience;
