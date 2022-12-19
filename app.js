const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Regular Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies Middleware
app.use(cookieParser());

//Import all Routes Here
const user = require("./routes/user");
const pin = require("./routes/pin");

//Router Middleware
app.use("/api", user);
app.use("/api", pin);

module.exports = app;
