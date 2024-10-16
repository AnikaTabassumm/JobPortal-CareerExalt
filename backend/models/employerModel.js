const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./userModel');
const Package = require('./package');

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
  // packageId: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 0,
  //   references: {
  //     model: Package,
  //     key: "id",
  //   },
  // },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyLogo: {
    type: DataTypes.STRING,
    allowNull: true,
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
