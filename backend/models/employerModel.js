const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./userModel');

const Employer = sequelize.define('Employer', {

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyLogo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInformation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});



module.exports = Employer;
