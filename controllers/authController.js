const BigPromise = require("../middlewares/bigPromise");

exports.auth = BigPromise(async (req, res) => {
  res.status(200).json({
    greet: "hello",
  });
});
