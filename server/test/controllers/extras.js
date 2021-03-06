const { assert } = require('chai');
const { describe, it } = require('mocha');
const extras = require('../../controllers/extras');

describe('Extras', () => {
  it('it should call mailer with right parametes', () => {
    const req = {
      body: {
        email: 'support@oblatum.io',
      },
    };
    const res = {
      json: (data) => {
        assert.equal(data, null);
      },
    };
    const mailerStub = {
      send: (data) => {
        assert.ok(data.body.includes(req.body.email));
      },
    };
    extras.sendmail(req, res, {}, mailerStub);
  });
});
