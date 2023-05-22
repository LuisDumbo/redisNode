const nodemailer = require('nodemailer');
require('dotenv').config();
const email = process.env.EMAIL_NAME;
const email_pass = process.env.EMAIL_PASS;


class EmailSender {
  constructor() {

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: email_pass
      }
    });
  }

  sendEmail(to, subject, text) {
    let mailOptions = {
      from: email,
      to: to,
      subject: subject,
      text: text
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  }
}

export default EmailSender