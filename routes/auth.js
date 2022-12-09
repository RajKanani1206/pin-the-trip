const express = require("express");
const router = express.Router();

const { auth } = require("../controllers/authController");

router.route("/login").get(auth);

module.exports = router;
