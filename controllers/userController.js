const bcrypt = require("bcrypt");

const User = require("../models/userSchema");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// const keys = require('../config/keys')
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).select(
    "-password -createdAt -updatedAt -__v"
  );
  res.status(201).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getAllClients = catchAsync(async (req, res, next) => {
  const users = await User.find({ userRole: "client" }).select(
    "-password -createdAt -updatedAt -__v"
  );
  res.status(201).json({
    status: "success",
    data: {
      clients: users,
    },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to get profile data from Zoho
  // ======================================
  res.status(201).json({
    status: "success",
    data: {},
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  // ======================================
  // Code to update profile data from Zoho
  // ======================================

  const { email, username } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) return res.send("User not found.");

  const zohoAccount = await zoho.updateZohoAccount(
    existingUser.zohoAccountId,
    username
  );

  res.status(201).json({
    status: "success",
    data: {
      zohoAccount,
    },
  });
});
