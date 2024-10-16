const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const JobSeeker = require('./jobSeekerModel');

const CandidateEducation = sequelize.define('CandidateEducation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },  
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: JobSeeker, // Assuming you have a JobSeeker model
      key: 'userId',
    },
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
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
  tableName: 'candidate_education',
  timestamps: true,
});

module.exports = CandidateEducation;
