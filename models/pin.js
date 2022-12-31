const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a Username"],
      maxLength: [20, "Username should be under 20 characters"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    desc: {
      type: String,
      required: [true, "Please provide a description"],
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
