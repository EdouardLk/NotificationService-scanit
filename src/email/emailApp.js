
require('dotenv').config();
require('./codeGenerator');

let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_EMAIL_PASSWORD
  }
});

let mailOptions = {
  from: 'scanit.ynov@gmail.com',
  to: 'edouard.lukau91@gmail.com',
  subject: "Test Service d'envoi de mail ptn",
  text: 'grrrr!'
};

function Send(){

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

//generateRandomCode;