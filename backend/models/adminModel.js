const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./userModel');

const Admin = sequelize.define('Admin', {

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
},
{
  timestamps: true
});

module.exports = Admin;