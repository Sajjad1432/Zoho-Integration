const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const keys = require('../config/keys');

const State = require('../models/stateSchema')
const Service = require('../models/serviceSchema');
const Resource = require('../models/resourceSchema');
const SubscriptionPlan = require('../models/subscriptionPlanSchema');
const SubscriptionPlanService = require('../models/subscriptionPlanServiceSchema');
const User = require("../models/userSchema");
const ApplicationForm = require('../models/applicationFormSchema');
const StatePrice = require('../models/statePriceSchema');

// For deleting data only
const Payment = require('../models/paymentSchema');
const ServiceRate = require('../models/serviceRateSchema');
const Subscription = require('../models/subscriptionSchema');

const defaultStates = require('../defaultData/defaultStates');
const defaultServices = require('../defaultData/defaultServices');
const defaultResources = require('../defaultData/defaultResources');
const defaultSubscriptionPlans = require('../defaultData/defaultSubscriptionPlans');
const defaultSubscriptionPlanServices = require('../defaultData/defaultSubscriptionPlanServices');
const defaultUsers = require("../defaultData/defaultUsers.js");
const defaultApplicationFormData = require('../defaultData/defaultFormData');
const defaultStatePrices = require('../defaultData/defaultStatePrices');
const stripe = require("stripe")(
  "sk_test_51LJ0PkA1dDAJbGD4vJVJ8wm7FjQe18XkYNEd3kS1tMmQGI0YBh1KO2q6BcwuCvwbJ7nsc0NORsYvYEfnpELU9Ory003L9O9tVf"
)

const zoho = require('./ZohoController');

const signToken = (email) => {
  return jwt.sign({ email }, keys.jwtSecret, {
    expiresIn: keys.jwtExpiresIn
  })
}

exports.createDefaultData = catchAsync(async (req, res) => {
  try {
    // Only deleting data
    await Payment.deleteMany();
    await ServiceRate.deleteMany();
    await Subscription.deleteMany();

    // 1.
    await State.deleteMany();
    const states = await State.insertMany(defaultStates);
    // 2.
    await Service.deleteMany();
    const services = await Service.insertMany(defaultServices);
    // 3.
    await Resource.deleteMany();
    const resources = await Resource.insertMany(defaultResources);
    // 4.
    await SubscriptionPlan.deleteMany();
    const subscriptionPlans = await SubscriptionPlan.insertMany(
      defaultSubscriptionPlans
    );
    // 5.
    await SubscriptionPlanService.deleteMany();
    const subscriptionPlanServices = await SubscriptionPlanService.insertMany(
      defaultSubscriptionPlanServices
    );
    // 6.
    await User.deleteMany();
    const users = await User.insertMany(defaultUsers);

    // 7.
    await ApplicationForm.deleteMany();
    const applicationFormData = await ApplicationForm.insertMany(defaultApplicationFormData);

    // 8.
    await StatePrice.deleteMany();
    const statePrices = await StatePrice.insertMany(defaultStatePrices);

    res.status(201).send({
      status: "success",
      data: {
        states,
        services,
        resources,
        subscriptionPlans,
        subscriptionPlanServices,
        users,
        applicationFormData,
        statePrices
      }
    })
  } catch (error) {
    console.log(error.message)
  }
})

// const changedPasswordAfter = function(passwordChangedAt, JWTTimeStamp) {
//   if(passwordChangedAt) {
//     const changedTimeStamp = parseInt(passwordChangedAt.getTime() / 1000, 10);
//     return JWTTimeStamp < changedTimeStamp;
//   }

//   return false;
// };

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  // Check if username and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400))
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401))
  }

  const token = signToken(user.email)
  const cookieOptions = {
    expires: new Date(Date.now() + keys.jwtCookieExpiresIn * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https"
  }
  // Use if deploying on https
  // x-forwarded-proto is heroku specific
  console.log(token)
  res.cookie("jwt", token, cookieOptions)

  // Remove the password from the output
  user.password = undefined
  req.user = user
  console.log(user)
  res.send(user)
})

exports.registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password, subscriptionPlanId } = req.body

  const customer = await stripe.customers.create({
    email
  })

  const user = new User({
    username,
    email,
    userRole: "client",
    password: bcrypt.hashSync(password, 8),
    stripeId: customer.id,
    subscriptionPlanId
  });

  console.log(user);

  await user.save()
  user.password = undefined
  // req.user = user


  const token = signToken(user.email)
  const cookieOptions = {
    expires: new Date(Date.now() + keys.jwtCookieExpiresIn * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https"
  }
  // Use below option if deploying on https
  // x-forwarded-proto is heroku specific

  // res.cookie("jwt", token, cookieOptions)
  return res.send(user)
})

// exports.tempLogin = catchAsync(async (req, res, next) => {

//   const email = 'admin@nbf.com';
//   const password = '0786';

//   // Check if user exists and password is correct
//   const user = await User.findOne({ email });

//   if(!user || !(await bcrypt.compare(password, user.password))) {
//     return next(new AppError('Incorrect username or password', 401));
//   }

//   const token = signToken(user.email);

//   const cookieOptions = {
//     expires: new Date(Date.now() + keys.jwtCookieExpiresIn * 60 * 60 * 1000),
//     httpOnly: true,
//     secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
//   };
//   // Use below option if deploying on https
//   // x-forwarded-proto is heroku specific

//   res.cookie('jwt', token, cookieOptions);

//   // Remove the password from the output
//   user.password = undefined;

//   // res.redirect('/dashboard');

//   res.status(200).json({
//     status: 'success',
//     token,
//     data: {
//       user
//     }
//   });
// });

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true
  })
  // res.status(200).json({ status: 'success' });
  req.user = ""

  // return res.redirect('/login');
  // req.logout();
  res.send(req.user)
}

// exports.protect = catchAsync(async (req, res, next) => {
//   // 1) Getting token and check if it's there
//   let token
//   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   } else if(req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if(!token) {
//     return next(new AppError('You are not logged in! Please login to get access.', 401));
//   }

//   // 2) Verification Token
//   const decoded = await promisify(jwt.verify)(token, keys.jwtSecret);

//   // 3) Check if user still exists
//   const currentUser = await User.findOne({ email: decoded.email });
//   if(!currentUser) {
//     return next(new AppError('The user belonging to this token does no longer exist', 401));
//   }

//   // 4) Check if user changed password after the token was issued
//   if(changedPasswordAfter(currentUser.passwordChangedAt, decoded.iat)) {
//     return next(new AppError('User recently changed password! Please log in again.', 401));
//   };

//   // Grant access to the protected route
//   currentUser.password = undefined;
//   req.user = currentUser;
//   return next();
// });

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  // We assume that initialy there is
  // no logged in user
  req.user = undefined

  // 1) Getting token and check if it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return next()
  }

  // 2) Verification Token
  const decoded = await promisify(jwt.verify)(token, keys.jwtSecret)

  // 3) Check if user still exists
  const currentUser = await User.findOne({ email: decoded.email })

  if (!currentUser) {
    return next()
  }

  // 4) Check if user changed password after the token was issued
  // if(changedPasswordAfter(currentUser.passwordChangedAt, decoded.iat)) {
  //   return next(new AppError('User recently changed password! Please log in again.', 401));
  // };

  console.log(currentUser)
  // THERE IS A LOGGED IN USER
  currentUser.password = undefined
  req.user = currentUser
  return next()
}

exports.restrictTo = (...userRoles) => {
  return (req, res, next) => {
    if (!userRoles.includes(req.user.userRole)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      )
    }
    return next()
  }
}

exports.getCurrentUser = (req, res) => {
  res.send(req.user)
}

exports.checkEmail = async (req, res) => {
  const { email } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.send("Email already exists")
  } else return res.send("Email not exists")
}

exports.completeRegistration = async (req, res) => {
  const { email } = req.body

   const existingUser = await User.findOne({
     email
   })


   const formData = {
     username: existingUser.username,
     email,
     subscriptionPlanId: existingUser.subscriptionPlanId
   }
   const zohoAccount = await zoho.createZohoAccount(formData);

   const zohoAccountId = zohoAccount.data[0].details.id;


  const update = await User.updateOne(
    { email },
    { 
      registeredSuccsessfully: true, 
      zohoAccountId: zohoAccountId
    }
  )

  res.send("Ok")
}