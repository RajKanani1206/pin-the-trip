const Pin = require("../models/pin");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createPin = BigPromise(async (req, res, next) => {
  const { firstName, lastName, title, desc, rating, lat, long } = req.body;

  if (!firstName || !lastName || !title || !desc || !rating || !lat || !long) {
    return next(
      new CustomError("First Name, Last Name, Title, Description, Rating, Latitude and Longitude are required", 400)
    );
  }

  const newPin = await Pin.create({
    firstName,
    lastName,
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
