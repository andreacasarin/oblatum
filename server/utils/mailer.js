const nodemailer = require('nodemailer');

exports.send = (options = {
  from: '"Oblatum 👻" <support@oblatum.it>',
  to: 'support@oblatum.it',
  subject: 'Hello ✔',
  body: 'Someone is interested in Oblatum!',
}, transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})) => {
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.body,
    html: options.body,
  };
  return transporter.sendMail(mailOptions);
};
