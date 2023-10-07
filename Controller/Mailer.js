const nodemailer = require("nodemailer");

function sendGmail(tomailId) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "shripadshet@gmail.com",
      pass: "onpf yhxx zkip gxbe",
    },
  });
  let mailOptions = {
    from: "shripadshet@gmail.com",
    to: tomailId ? tomailId : "shripadshet@gmail.com",
    subject: "Check Mail",
    text: "Its working node mailer",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("success");
  });
}
module.exports = {
  sendGmail,
};
