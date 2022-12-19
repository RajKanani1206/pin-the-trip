const express = require("express");
const router = express.Router();

const { createPin, getAllPins } = require("../controllers/pinController");

router.route("/createPin").post(createPin);
router.route("/getAllPins").get(getAllPins);

module.exports = router;
