// const { DataTypes } = require('sequelize');
// const {sequelize} = require('../config/db');
// const User = require('./userModel');

// const Notification = sequelize.define('Notification', {
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: User,
//             key: 'id',
//         },
//         onDelete: 'CASCADE',
//     },
//     type: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     message: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     isRead: {
//         type: DataTypes.BOOLEAN, 
//         defaultValue: false
//     },
//      // createdAt: {
//   //   type: Date,
//   //   default: Date.now
//   // },
// },
// {
//   timestamps: true
// });

// Notification.belongsTo(User, {foreignKey: 'userId'});

// module.exports = Notification;