// // vkki glyx nlns tson

let nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shoppingonline2109@gmail.com",
    pass: "vkkiglyxnlnstson",
  },
});

// let mailOptions = {
//   from: "shoppingonline2109@gmail.com",
//   to: "iammanish2109@gmail.com",
//   subject: "hello from nodemailer ",
//   html: '<img src="https://m.media-amazon.com/images/I/81oCiB0UE3L._UX679_.jpg"></img>',
// };

module.exports = {
  transporter,
};
