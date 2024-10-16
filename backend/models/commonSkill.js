// models/commonSkill.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const JobSeeker = require("./jobSeekerModel");
const Skill = require("./candidateSkill");

const CommonSkill = sequelize.define(
  "CommonSkill",
  {
    jobSeekerId: {
      type: DataTypes.INTEGER,
      references: {
        model: JobSeeker,
        key: 'userId',
      },
      allowNull: false,
    },
    skillId: {
      type: DataTypes.INTEGER,
      references: {
        model: Skill,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    tableName: "jobseeker_common_skill",
    timestamps: true,
  }
);

module.exports = CommonSkill;
