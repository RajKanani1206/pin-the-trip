const nodemailer = require("nodemailer");

const mailHelper = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    html: "<h1>Congrats</h1>",
  };

  await transporter.sendMail(message);
};

module.exports = mailHelper;
