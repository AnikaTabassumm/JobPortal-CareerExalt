const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const OTP = sequelize.define("OTP", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
 updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = OTP;
