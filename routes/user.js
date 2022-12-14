const express = require("express");
const router = express.Router();

const { register, login, logout, forgotPassword } = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);

module.exports = router;
