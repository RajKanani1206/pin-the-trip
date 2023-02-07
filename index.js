const app = require("./app");
const mongoose = require("mongoose");
const connectWithDb = require("./config/db");
require("dotenv").config();

mongoose.set("strictQuery", true);

// Connect with Database
connectWithDb();

if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
