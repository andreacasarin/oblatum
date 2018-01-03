const assert = require('assert');
const mailerClass = require('../utils/mailer');

describe('Mailer', () => {
  it('it should configure right by default', () => {
    const transport = mailerClass.configure();
    assert.equal(transport.transporter.options.host, process.env.SMTP_SERVER);
    assert.equal(transport.transporter.options.port, undefined);
    assert.equal(transport.transporter.options.secure, true);
    assert.equal(transport.transporter.options.auth.user, process.env.SMTP_USER);
    assert.equal(transport.transporter.options.auth.pass, process.env.SMTP_PASS);
  });

  it('it should call trasport send', () => {
    const nodemailer = require('nodemailer');
    nodemailer.createTestAccount((err, account) => {
      const transport = mailerClass.configure({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      const responsePromise = mailerClass.send({
        from: '"Oblatum 👻" <noreply@oblatum.it>',
        to: 'noreply@oblatum.it',
        subject: 'Test mail ✔',
        body: 'Please ignore me, I am a test!',
      }, transport);
      responsePromise.then((response) => {
        assert.notEqual(response.accepted.length, 0);
      });
    });
  });

  // it('it should send me an email', () => {
  //   const responsePromise = mailerClass.send({
  //     from: '"Oblatum 👻" <noreply@oblatum.it>',
  //     to: 'test@andreacasarin.com',
  //     subject: 'Test mail ✔',
  //     body: 'Please ignore me, I am a test!',
  //   });
  //   responsePromise.then((response) => {
  //     assert.notEqual(response.accepted.length, 0);
  //   });
  // });
});
