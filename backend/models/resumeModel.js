// const { DataTypes } = require('sequelize');
// const {sequelize} = require('../config/db');
// const JobSeeker = require('./jobSeekerModel');
// const JobPost = require('./jobPostModel');

// const Resume = sequelize.define('Resume', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     // jobSeekerId: {
//     //     type: DataTypes.INTEGER,
//     //     allowNull: false,
//     //     references: {
//     //         model: JobSeeker,
//     //         key: 'id',
//     //     },
//     //     onDelete: 'CASCADE',
//     // },
//     jobSeekerId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     // jobPostId: {
//     //     type: DataTypes.INTEGER,
//     //     allowNull: false,
//     //     references: {
//     //         model: JobPost,
//     //         key: 'id',
//     //     },
//     //     onDelete: 'CASCADE',
//     // },
//     jobPostId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     fileUrl: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     fileType: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// }, {
//     timestamps: true,
// });



// module.exports = Resume;