const {DataTypes } = require('sequelize');
const { sequelize } = require("../config/db");

const Package = sequelize.define(
    "Package",

    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        // jobPostLimit: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        benefits: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        postVisibilityDays: {
            type: DataTypes.INTEGER, // Number of days the job post will be visible
            allowNull: false,
            defaultValue: 30, // Default is 30 days, you can adjust as needed
        },
    },
    {
        tableName: 'Package',
        timestamps: true,
    }
);

module.exports = Package;
