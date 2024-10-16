const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const OTP = require("../models/otpModel");
const { sendOTP } = require("./emailUtils");
const User = require("../models/userModel");

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const createAndSendOTP = async (email, userId) => {
  console.log('Creating OTP for user:', userId)
  const otp = generateOTP();
  console.log('Generated OTP:', otp)

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  try{
    await OTP.create({
    userId: userId,
    otp,
    expiresAt,
  });
  console.log("OTP saved successfully");
  } catch(error) {
    console.log("Error saving OTP:", error);
  }
  
  await sendOTP(email, otp);
};


module.exports = {
  createAndSendOTP,
};
