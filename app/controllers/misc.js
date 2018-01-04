const mailer = require('../utils/mailer');

exports.sendmail = (req, res) => {
  res.json(mailer.send({
    from: '"Oblatum 👻" <noreply@oblatum.it>',
    to: 'reaalessandro95@gmail.com',
    subject: 'Hello ✔',
    body: `Someone is interested in Oblatum: ${req.body.email}`,
  }));
};
