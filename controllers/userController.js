const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/emailHelper");
const crypto = require("crypto");

exports.register = BigPromise(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new CustomError("Username, Email and Password are required", 400));
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      username,
      email,
      password,
    });
  } else if (!!user?.isVerified) {
    return next(new CustomError("User already registered"));
  }

  const otp = user.getEmailVerificationToken();
  user.username = username;
  user.password = password;
  await user.save({
    validateBeforeSave: false,
  });

  try {
    await mailHelper({
      email: email,
      subject: "Pin The Trip - Verify Your Account",
      message: `<p>Respected Sir/Madam,</p><h3>Please use the following OTP <span style="color:Tomato;">${otp}</span> to verify your Email.</h3><p>Thank You.</p>`,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      id: user._id,
    });
  } catch (error) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save({ validateBeforeSave: false });
  }
});

exports.verifyEmail = BigPromise(async (req, res, next) => {
  const { otp } = req.body;
  const userId = req.query.userId;
  const verificationToken = `${userId}.${otp}`;

  const encrpytToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: encrpytToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Token is invalid or expired"), 400);
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User Registered Successfully",
  });
});

exports.resendOtp = BigPromise(async (req, res, next) => {
  const userId = req.query.userId;

  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    return next(new CustomError("User Info not Found"), 400);
  } else if (!!user?.isVerified) {
    return next(new CustomError("User already registered"));
  }

  const otp = user.getEmailVerificationToken();
  await user.save({
    validateBeforeSave: false,
  });

  try {
    await mailHelper({
      email: user.email,
      subject: "Pin The Trip - Verify Your Account",
      message: `<p>Respected Sir/Madam,</p><h3>Please use the following OTP <span style="color:Tomato;">${otp}</span> to verify your Email.</h3><p>Thank You.</p>`,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      id: user._id,
      otp,
    });
  } catch (error) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save({ validateBeforeSave: false });
  }
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for presence of email and password
  if (!email || !password) {
    return next(new CustomError("Email and Password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new CustomError("Email or Password does not match or exist", 400));
  }

  if (!user.isVerified) {
    return next(new CustomError("User Not Verified", 400));
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);
  if (!isPasswordCorrect) {
    return next(new CustomError("Password does not match or exist", 400));
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

  // Change url after deployment
  const myUrl = `${req.protocol}://localhost:3000/password/reset/${forgotToken}`;

  const message = `<p>Respected Sir/Madam,</p><h3>A request has been received to change the password for your Pin The Trip account.</h3>
  <a href=${myUrl} target="_blank">Reset Password</a>
  <p>Thank You.</p>`;

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

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
