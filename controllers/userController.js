const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");

exports.register = BigPromise(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return next(CustomError("First Name, Last Name, Email and Password are required", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for presence of email and password
  if (!email || !password) {
    return next(CustomError("Email and Password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(CustomError("Email or Password does not match or exist", 400));
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);
  if (!isPasswordCorrect) {
    return next(CustomError("Password does not match or exist", 400));
  }

  cookieToken(user, res);
});
