// models/skillModel.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const JobSeeker = require("./jobSeekerModel");

const Skill = sequelize.define(
  "Skill",
  {
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
    skill: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "candidate_skill",
    timestamps: true,
  }
);

module.exports = Skill;
