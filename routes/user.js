const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
  verifyEmail,
  resendOtp,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/register").post(register);
router.route("/verifyEmail").post(verifyEmail);
router.route("/resendOtp").post(resendOtp);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/user").get(isLoggedIn, getLoggedInUserDetails);

module.exports = router;
