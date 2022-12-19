const express = require("express");
const router = express.Router();

const { createPin } = require("../controllers/pinController");

router.route("/createPin").post(createPin);

module.exports = router;
