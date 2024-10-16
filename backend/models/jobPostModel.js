const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Employer = require("./employerModel");
const Package = require("./package");

const JobPost = sequelize.define(
  "JobPost",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employer,
        key: "userId",
      },
    },
    packageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Package,
        key: "id",
      },
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Employer,
        key: "companyName",
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salaryRange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibilityStatus: {
      type: DataTypes.STRING,
      defaultValue: 'Pending', // Status of the post, e.g., 'Open', 'Closed'
  },
  expirationDate: {
      type: DataTypes.DATE,
      // allowNull: false,
  },
    // status: {
    //   type: DataTypes.ENUM("pending", "approved"),
    //   defaultValue: "pending",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = JobPost;
