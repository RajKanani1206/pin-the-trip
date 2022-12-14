const express = require("express");
const router = express.Router();

const { register, login, logout, forgotPassword, passwordReset } = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);

module.exports = router;
