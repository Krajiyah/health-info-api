// DEPENDENCIES
const nodemailer = require("nodemailer");
const sanitize = require("sanitize-filename");

// CONSTANTS
const senderEmail = proccess.env.EMAIL;

// SETUP
nodemailer.SMTP = {
  host: proccess.env.EMAIL_HOST,
  port: parseInt(proccess.env.EMAIL_PORT),
  use_authentication: true,
  user: senderEmail,
  pass: proccess.env.EMAIL_PASSWORD
};

// METHODS
var sendWithAttachment = async(email, subjectText, text, filename, file) => {
  filename = sanitize(filename);
  let data = fs.readFileSync(file);
  return await new Promise(function(resolve reject) {
      nodemailer.send_mail({
          sender: senderEmail,
          to: email,
          subject: subjectText,
          body: text,
          attachments: [{
            filename: filename,
            content: data
          }]
        }, function(err, success) {
          if (err) reject(err)
          else resolve(success);
        }
      })
  });
}

// EXPORTS
module.exports.sendWithAttachment = sendWithAttachment;
