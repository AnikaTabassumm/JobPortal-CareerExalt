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
  const {
    name,
    email,
    password,
    role,
  } = req.body;

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

  // Create user
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
    }

    await transaction.commit();
    try {
      await createAndSendOTP(user.email, user.id);
      res.json({ message: 'OTP sent. Please verify OTP to confirm registraion.' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send OTP' });
    }

    // await createAndSendOTP(user.email, user.id);

    // res.status(201).json({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    //   // isVerified: user.isVerified,
    // });
  } catch (error) {
    await transaction.rollback();
    res.status(400).send("Error creating user data");
  }
});

//@desc Register Admin
//@route POST/api/users/admin/register
//@access Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //Checking if user exists
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creating user
  const transaction = await sequelize.transaction();

  try {
    const user = await User.create(
      {
        name,
        email,
        password: hashedPassword,
        role: "admin",
      },
      { transaction }
    );

    // if (user) {
    await Admin.create(
      {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        // code,
      },
      { transaction }
    );
    // }

    await transaction.commit();

    try {
      await createAndSendOTP(user.email, user.id);
      res.json({ message: 'OTP sent. Please verify OTP to confirm registraion.' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send OTP' });
    }

    // await createAndSendOTP(user.email, user.id);

    // res.status(201).json({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    // });
  } catch (error) {
    await transaction.rollback();
    res.status(400).send("Error creating user data");
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

const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  await sendOTP(user);
  res.status(200).send({ message: "OTP sent to your email" });
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  const otpRecord = await OTP.findOne({ where: { userId: user.id, otp } });

  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return res.status(400).send({ message: "Invalid or expired OTP" });
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedNewPassword;
  await user.save();

  res.status(200).send({ message: "Password reset successfully" });
};

// //@desc Get user data
// //@route GET/api/users/user
// //@access Private
// const getUser = asyncHandler(async (req, res) => {
//   const { _id, name, email, role } = await User.findById(req.user.id);

//   res.status(200).json({
//     id: _id,
//     name,
//     email,
//     role,
//   });
// });

// const getAll = asyncHandler(async (req, res) => {
//   const users = await User.find();

//   res.status(200).json(users);
// });

// //Generating token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

module.exports = {
  registerUser,
  loginUser,
  registerAdmin,
  resetPasswordRequest,
  resetPassword
  // getUser,
  // getAll,
};
