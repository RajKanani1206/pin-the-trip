const app = require("./app");
const express = require("express");
const mongoose = require("mongoose");
const connectWithDb = require("./config/db");
const path = require("path");
require("dotenv").config();

mongoose.set("strictQuery", true);

// Connect with Database
connectWithDb();

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
