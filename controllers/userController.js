const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/emailHelper");
const crypto = require("crypto");

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

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Success",
  });
});

exports.forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomError("Email not found as registered"));
  }

  const forgotToken = user.getForgotPasswordToken();

  await user.save({
    validateBeforeSave: false,
  });

  const myUrl = `${req.protocol}://${req.get("host")}/password/reset/${forgotToken}`;

  const message = `Copy paste this link in your URL and hit enter \n\n ${myUrl}`;

  try {
    await mailHelper({
      email: user.email,
      subject: "Pin The Trip - Password Reset Email",
      message,
    });

    res.send({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
  }
});

exports.passwordReset = BigPromise(async (req, res, next) => {
  const token = req.params.token;

  const encrpytToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: encrpytToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Token is invalid or expired"), 400);
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new CustomError("Password and confirm password does not match"), 400);
  }

  user.password = req.body.password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  cookieToken(user, res);
});
