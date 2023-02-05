const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    maxLength: [20, "Username should be under 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    validate: [validator.isEmail, "Please enter email in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password should be atleast 6 characters"],
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  emailVerificationExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Validate the password with password send by user
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

// Create and return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// Generate forget password token
userSchema.methods.getForgotPasswordToken = function () {
  // Generate a long and random string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  this.forgotPasswordToken = crypto.createHash("sha256").update(forgotToken).digest("hex");
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

userSchema.methods.getEmailVerificationToken = function () {
  const otp = crypto.randomInt(1000, 9999);
  const verificationToken = `${this._id}.${otp}`;

  this.emailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  this.emailVerificationExpiry = Date.now() + 20 * 60 * 1000;

  return otp;
};

module.exports = mongoose.model("User", userSchema);
