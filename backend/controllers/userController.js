const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { createAndSendOTP } = require("../utils/otpUtils");
const {
  User,
  JobSeeker,
  Employer,
  Admin,
  OTP,
  sequelize,
} = require("../models/index");

//@desc Register new user
//@route POST/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user with transaction
  const transaction = await sequelize.transaction();

  try {
    const user = await User.create(
      {
        name,
        email,
        password: hashedPassword,
        role,
        isVerified: false,
      },
      { transaction }
    );

    if (role === "jobseeker") {
      console.log("Registering jobseeker:", user.id, user.name, user.email);
      await JobSeeker.create(
        {
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          skills: "",
          experience: "",
          education: "",
          certifications: "",
        },
        { transaction }
      );
    } else if (role === "employer") {
      console.log("Registering employer:", user.id, user.name, user.email); // Add logging
      await Employer.create(
        {
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          companyName: "",
          industry: "",
          size: "",
          location: "",
          contactInformation: "",
          companyDescription: "",
        },
        { transaction }
      );
    } else if (role === "admin") {
      console.log("Registering admin:", user.id, user.name, user.email);
      await Admin.create(
        {
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
        },
        { transaction }
      );
    }

    await transaction.commit();

    try {
      await createAndSendOTP(user.email, user.id);
      res.json({ message: "OTP sent. Please verify OTP to confirm registration.", userId: user.id });
    } catch (error) {
      console.error("Failed to send OTP:", error); // Log the OTP error
      res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }

  } catch (error) {
    await transaction.rollback();
    console.error("Error creating user or employer:", error); // Improved error logging
    res.status(400).json({ message: "Error creating user data", error: error.message });
  }
});



// //@desc Authenticate a user
// //@route POST/api/users/login
// //@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking user email
  const user = await User.findOne({ where: { email } });
  //checking password
  if (user && (await bcrypt.compare(password, user.password))) {
    if(!user.isVerified) {
      return res.status(400).json({message: 'Account not verified. Please verify OTP.'})
    };

    try {
      await createAndSendOTP(user.email, user.id);
      res.json({ message: 'OTP sent. Please verify OTP to log in.' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

 // const { otp } = req.body;

  // // const user = await User.findOne({ where: { email } });
  // // if (!user) {
  // //   return res.status(404).send({ message: "User not found" });
  // // }
  // const userId = req.user.id;

  // const otpRecord = await OTP.findOne({ where: { userId, otp } });
  // if (!otpRecord || otpRecord.expiresAt < new Date()) {
  //   return res.status(400).send({ message: "Invalid or expired OTP" });
  // }

  // await otpRecord.destroy();

  // const user = await User.findByPk(userId);
  // if (!user) {
  //   return res.status(404).send({ message: "User not found" });
  // }
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
    { expiresIn: "2h" }
  );
  console.log('Generated Token:', token);

  // Redirect to a common landing page
  // const redirectUrl = '/landing';

  res.cookie('token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production', // secure: true for HTTPS
    sameSite: 'Lax',
    maxAge: 7200000, // 2 hour
  }).send({
    message: "OTP verified successfully",
    token: token,
    redirectUrl: `/${user.role}/dashboard`,  // or whatever URL you want to redirect the user to
    userInfo: {
      "id": user.id,
      "role": user.role,
    }
  });
  
});

const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  await createAndSendOTP(user.email, user.id);
  res.status(200).send({ message: "OTP sent to your email" });
};

const resetPassword = async (req, res) => {
  const { otp, newPassword } = req.body;

  // Find OTP record and associated user by OTP
  const otpRecord = await OTP.findOne({ where: { otp } });

  if (!otpRecord) {
    return res.status(400).send({ message: "Invalid OTP" });
  }

  // Check if OTP is expired
  if (otpRecord.expiresAt < new Date()) {
    return res.status(400).send({ message: "OTP has expired" });
  }

  // Find the user based on the userId associated with the OTP
  const user = await User.findOne({ where: { id: otpRecord.userId } });

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  // Update the user's password
  user.password = hashedNewPassword;
  await user.save();

  // Optionally, you can delete the OTP record after successful password reset
  await otpRecord.destroy();

  res.status(200).send({ message: "Password reset successfully" });
};


//@desc Get user data
//@route GET/api/users/user
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: {userId: req.params.id}});

  if(!user) {
    res.status(404);
    throw new Error('User not found!')
}

  res.status(200).json(user);
});

// userController.js
const logout = async(req, res) => {
  res.clearCookie('token', {
    path: '/', 
    httpOnly: false, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax', 
  });

  res.status(200).json({ message: "Logged out successfully" });
};



module.exports = {
  registerUser,
  loginUser,
  resetPasswordRequest,
  resetPassword,
  getUser,
  verifyOTP,
  logout,
};
