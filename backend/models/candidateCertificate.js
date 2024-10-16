const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const JobSeeker = require('./jobSeekerModel');

const CandidateCertificate = sequelize.define('CandidateCertificate', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: JobSeeker, // Assuming you have a JobSeeker model
      key: 'userId',
    },
  },
  certificateName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'candidate_certificates',
  timestamps: true,
});

module.exports = CandidateCertificate;
