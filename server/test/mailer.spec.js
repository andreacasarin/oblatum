const assert = require('assert');
const mailer = require('../utils/mailer');

describe('Mailer', () => {
  it('it should call trasport send with right parameters', () => {
    const options = {
      from: '"Oblatum 👻" <support@oblatum.it>',
      to: 'support@oblatum.it',
      subject: 'Test mail ✔',
      body: 'Please ignore me, I am a test!',
    };
    const trasportStub = {
      sendMail: (data) => {
        assert.equal(data.from, options.from);
        assert.equal(data.to, options.to);
        assert.equal(data.subject, options.subject);
        assert.equal(data.body, options.html);
        assert.equal(data.body, options.text);
      },
    };
    mailer.send(options, trasportStub);
  });

  // it('it should call trasport send', () => {
  //   const nodemailer = require('nodemailer');
  //   nodemailer.createTestAccount((err, account) => {
  //     const responsePromise = mailer.send({
  //       from: '"Oblatum 👻" <support@oblatum.it>',
  //       to: 'support@oblatum.it',
  //       subject: 'Test mail ✔',
  //       body: 'Please ignore me, I am a test!',
  //     }, nodemailer.createTransport({
  //       host: 'smtp.ethereal.email',
  //       port: 587,
  //       secure: false,
  //       auth: {
  //         user: account.user,
  //         pass: account.pass,
  //       },
  //     }));
  //     responsePromise.then((response) => {
  //       assert.notEqual(response.accepted.length, 0);
  //     });
  //   });
  // });

  // it('it should send me an email', () => {
  //   const responsePromise = mailer.send({
  //     from: '"Oblatum 👻" <support@oblatum.it>',
  //     to: 'test@andreacasarin.com',
  //     subject: 'Test mail ✔',
  //     body: 'Please ignore me, I am a test!',
  //   });
  //   responsePromise.then((response) => {
  //     assert.notEqual(response.accepted.length, 0);
  //   });
  // });
});
