const nodemailer = require('nodemailer');

exports.configure = (options = {
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}) => nodemailer.createTransport(options);

exports.send = (options = {
  from: '"Oblatum 👻" <support@oblatum.it>',
  to: 'support@oblatum.it',
  subject: 'Hello ✔',
  body: 'Someone is interested in Oblatum!',
}, transporter = this.configure()) => {
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.body,
    html: options.body,
  };
  return transporter.sendMail(mailOptions);
};
