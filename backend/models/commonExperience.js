const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const JobSeeker = require('./jobSeekerModel');
const CandidateExperience = require('./candidateExperience');

const CommonExperience = sequelize.define('CommonExperience',
    {
        jobSeekerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: JobSeeker,
            key: 'userId',
          },
        },
        experienceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: CandidateExperience,
            key: 'id',
          },
        },
      },
      {
        tableName: 'jobseeker_common_experience',
      }
    );
    
    module.exports = CommonExperience;