
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Employer = require('./employerModel');
const Package = require('./package');
const JobPost = require('./jobPostModel');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  jobPostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: JobPost, 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  packageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: JobPost,
      key: 'packageId',
    },
  },
  transId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment: {
    type: DataTypes.ENUM("pending", "done", "failed"),
      defaultValue: "pending",
  },
}, {
  timestamps: true, 
  tableName: 'orders',
});

module.exports = Order;
