// DEPENDENCIES
const nodemailer = require("nodemailer");

// CONSTANTS
const senderEmail = "sender@domain.com";
const subjectText = 'MySmartMedical - Appointment Sign In';

// SETUP
// TODO: put real credentials here for gmail account
nodemailer.SMTP = {
  host: 'mail.yourmail.com',
  port: 25,
  use_authentication: true,
  user: senderEmail,
  pass: 'somepasswd'
};

// METHODS
var sendWithAttachment = async(email, text, filename, file) => {
  let data = fs.readFileSync(file);
  return await new Promise(function(resolve reject) {
      nodemailer.send_mail({
          sender: senderEmail,
          to: email,
          subject: subjectText,
          body: text,
          attachments: [{
            'filename': filename,
            'content': data
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
