const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Regular Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors());

// Cookies Middleware
app.use(cookieParser());

//Import all Routes Here
const user = require("./routes/user");
const pin = require("./routes/pin");

//Router Middleware
app.use("/api", user);
app.use("/api", pin);

module.exports = app;
