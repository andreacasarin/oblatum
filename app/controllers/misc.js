const nodemailer = require('nodemailer');

exports.sendmail = (req, res) => {
  const transporter = nodemailer.createTransport({ host: 'localhost' });

  const mailOptions = {
    from: '"Oblatum 👻" <support@oblatum.it>', // sender address
    to: 'reaalessandro95@gmail.com, support@oblatum.it', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Someone is interested in Oblaum', // plain text body
    html: '<b>Someone is interested in Oblaum</b>', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json(error);
      return false;
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.json(info);
    return true;
  });
};
