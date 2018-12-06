const mailer = require('../utils/mailer');

exports.sendmail = (req, res, next, mail = mailer) => {
  res.json(mail.send({
    from: '"Oblatum 👻" <support@oblatum.io>',
    to: 'support@oblatum.io',
    subject: 'Interested ✔',
    body: `Someone is interested in Oblatum: ${req.body.email}`,
  }));
};
