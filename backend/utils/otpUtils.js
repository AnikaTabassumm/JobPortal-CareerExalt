const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const OTP = require("../models/otpModel");
const { sendOTP } = require("./emailUtils");
const User = require("../models/userModel");

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const createAndSendOTP = async (email, userId) => {
  const otp = generateOTP();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await OTP.create({
    userId: userId,
    otp,
    expiresAt,
  });

  await sendOTP(email, otp);
};

const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const otpRecord = await OTP.findOne({ where: { userId: user.id, otp } });
  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return res.status(400).send({ message: "Invalid or expired OTP" });
  }

  await otpRecord.destroy();

  user.isVerified = true;
  await user.save();

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Redirect to a common landing page
  // const redirectUrl = '/landing';

  res.status(200).send({
    message: "OTP verified successfully",
    token,
    // redirectUrl,
  });
});

module.exports = {
  createAndSendOTP,
  verifyOTP,
};
