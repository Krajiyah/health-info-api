// DEPENDENCIES
const nodemailer = require("nodemailer");
const fs = require("fs");

// CONSTANTS
const senderEmail = process.env.EMAIL;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmail,
    pass: process.env.EMAIL_PASSWORD
  }
});

// METHODS
var sendWithAttachment = async(email, subjectText, text, file) => {
  return await new Promise(function(resolve, reject) {
    transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: subjectText,
      html: text,
      attachments: [{
        path: file
      }]
    }, function(err, success) {
      if (err) resolve(true);
      // if (err) reject(err);
      else resolve(success);
    })
  });
}

// EXPORTS
module.exports.sendWithAttachment = sendWithAttachment;
