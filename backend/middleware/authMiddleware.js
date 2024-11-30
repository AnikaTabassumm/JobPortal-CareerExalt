const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
require('dotenv').config();


//Protecting routes and verifying jwt
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;  // Fallback to cookie if needed
  }

  console.log('Incoming Token from Header or Cookie:', token);  

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }


  // // Check if token exists in cookies
  // if (req.cookies && req.cookies.token) {
  //   try {
  //     // Getting token from cookies
  //     token = req.cookies.token;

  try {
      //Verifying the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Getting user by the token
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      if (!req.user.isVerified) {
        res.status(401);
        throw new Error("Not authorized, user not verified");
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  // }
  // if (!token) {
  //   res.status(401);
  //   throw new Error("Not authorized, no token!");
  // }
});

//checking for specific role
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error('Not authorized, insufficient permissions');
        }
        next();
    };
};

module.exports = {protect, authorize}  