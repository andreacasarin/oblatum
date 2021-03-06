const { assert } = require('chai');
const { describe, it } = require('mocha');
const mailer = require('../../utils/mailer');

describe('Mailer', () => {
  it('it should call trasport send with right parameters', () => {
    const options = {
      from: '"Oblatum 👻" <support@oblatum.io>',
      to: 'support@oblatum.io',
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

  it('it should call trasport send', () => {
    const nodemailer = require('nodemailer');
    nodemailer.createTestAccount((err, account) => {
      const responsePromise = mailer.send({
        from: '"Oblatum 👻" <support@oblatum.io>',
        to: 'support@oblatum.io',
        subject: 'Test mail ✔',
        body: 'Please ignore me, I am a test!',
      }, nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      }));
      responsePromise.then((response) => {
        assert.notEqual(response.accepted.length, 0);
      });
    });
  });

  // it('it should send me an email', () => {
  //   const responsePromise = mailer.send({
  //     from: '"Oblatum 👻" <support@oblatum.io>',
  //     to: 'test@oblatum.io',
  //     subject: 'Test ✔',
  //     body: 'Please ignore me, I am a test!',
  //   });
  //   responsePromise.then((response) => {
  //     assert.notEqual(response.accepted.length, 0);
  //   });
  // });
});
