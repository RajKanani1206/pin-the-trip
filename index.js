const app = require("./app");
const mongoose = require("mongoose");
const connectWithDb = require("./config/db");
require("dotenv").config();

mongoose.set("strictQuery", true);

// Connect with Database
connectWithDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
