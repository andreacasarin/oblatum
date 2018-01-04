const mailer = require('../utils/mailer');

exports.sendmail = (req, res, next, mail = mailer) => {
  res.json(mail.send({
    from: '"Oblatum 👻" <support@oblatum.it>',
    to: 'support@oblatum.it',
    subject: 'Hello ✔',
    body: `Someone is interested in Oblatum: ${req.body.email}`,
  }));
};
