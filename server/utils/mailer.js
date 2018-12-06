const nodemailer = require('nodemailer');

exports.send = (options = {
  from: '"Oblatum 👻" <support@oblatum.io>',
  to: 'support@oblatum.io',
  subject: 'Hello ✔',
  body: 'This is the default Oblatum message!',
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
