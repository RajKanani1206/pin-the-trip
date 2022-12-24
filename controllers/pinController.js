const Pin = require("../models/pin");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createPin = BigPromise(async (req, res, next) => {
  const { username, title, desc, rating, lat, long } = req.body;

  if (!username || !title || !desc || !rating || !lat || !long) {
    return next(
      new CustomError("First Name, Last Name, Title, Description, Rating, Latitude and Longitude are required", 400)
    );
  }

  const newPin = await Pin.create({
    username,
    title,
    desc,
    rating,
    lat,
    long,
  });

  res.status(200).json({
    success: true,
    newPin,
  });
});

exports.getAllPins = BigPromise(async (req, res, next) => {
  try {
    const pins = await Pin.find();
    res.status(200).json({
      success: true,
      pins,
    });
  } catch (error) {
    new CustomError("Something went wrong", 400);
  }
});
