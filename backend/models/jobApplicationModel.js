const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const JobSeeker = require("./jobSeekerModel");
const JobPost = require("./jobPostModel");

const JobApplication = sequelize.define(
  "JobApplication",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobSeekerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: JobSeeker,
        key: "userId",
      },
    },
    jobPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: JobPost,
        key: "id",
      },
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    coverLetter: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = JobApplication;
