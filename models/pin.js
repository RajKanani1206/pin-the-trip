const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      maxLength: [20, "First name should be under 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      maxLength: [20, "Last name should be under 20 characters"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      minLength: [3, "Title should be minimum of 3 characters"],
      maxLength: [20, "Title should be under 20 characters"],
    },
    desc: {
      type: String,
      required: [true, "Please provide a description"],
      minLength: [3, "Description should be minimum of 3 characters"],
      maxLength: [20, "Description should be under 20 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [0, "Min. rating must be 0 star"],
      max: [5, "Max. rating must be 5 stars"],
    },
    lat: {
      type: Number,
      required: [true, "Please provide a latitude"],
    },
    long: {
      type: Number,
      required: [true, "Please provide a longitude"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", pinSchema);
