const { assert } = require('chai');
const { describe, it } = require('mocha');
const sessions = require('../../controllers/sessions');

describe('Sessions', () => {
  it('should create session if params are right', (done) => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'test',
      },
    };
    const res = {
      status: (code) => {
        assert.equal(200, code);
        return res;
      },
      json: (data) => {
        assert.equal('test', data.user.name);
        assert.equal('123', data.token);
        done();
      },
    };
    const jwtStub = {
      sign: (options, secret) => {
        assert.equal(Math.floor(Date.now() / 1000) + (60 * 60), options.exp);
        assert.equal('test', options.data.user.name);
        assert.ok(secret !== '');
        return '123';
      },
    };
    const modelsStub = {
      User: {
        findOne: (options) => {
          assert.equal('test@example.com', options.where.email);
          return Promise.resolve({
            name: 'test',
            password: 'test',
            passwordConfirmation: 'test',
            checkPassword: (password) => {
              assert.equal('test', password);
              return Promise.resolve(true);
            },
          });
        },
      },
    };
    sessions.create(req, res, {}, modelsStub, jwtStub);
  });

  it('should not create session if password is wrong', (done) => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'test',
      },
    };
    const res = {
      status: (code) => {
        assert.equal(401, code);
        return res;
      },
      json: (data) => {
        assert.equal('Bad credentials', data.errors[0].message);
        done();
      },
    };
    const modelsStub = {
      User: {
        findOne: (options) => {
          assert.equal('test@example.com', options.where.email);
          return Promise.resolve({
            name: 'test',
            password: 'test',
            passwordConfirmation: 'test',
            checkPassword: (password) => {
              assert.equal('test', password);
              return Promise.resolve(true);
            },
          });
        },
      },
    };
    sessions.create(req, res, {}, modelsStub);
  });

  it('should not create session if user is not found', (done) => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'test',
      },
    };
    const res = {
      status: (code) => {
        assert.equal(401, code);
        return res;
      },
      json: (data) => {
        assert.equal('Bad credentials', data.errors[0].message);
        done();
      },
    };
    const modelsStub = {
      User: {
        findOne: (options) => {
          assert.equal('test@example.com', options.where.email);
          return Promise.reject(new Error([0, 1]));
        },
      },
    };
    sessions.create(req, res, {}, modelsStub);
  });

  it('should read session with valid token', (done) => {
    const req = {
      headers: {
        authorization: 'Bearer 123',
      },
    };
    const res = {
      status: (code) => {
        assert.equal(200, code);
        return res;
      },
      json: (data) => {
        assert.equal('123', data.user);
        done();
      },
    };
    const jwtStub = {
      verify: (token, secret) => {
        assert.equal('123', token);
        assert.ok(secret !== '');
        return { data: { user: 321 } };
      },
    };
    const nextStub = () => {
      assert.equal('321', req.tokenDecoded.data.user);
      assert.ok(true);
      done();
    };
    sessions.read(req, res, nextStub, jwtStub);
  });

  it('should not read session with invalid token', (done) => {
    const req = {
      headers: {
        authorization: 'Bearer 123',
      },
    };
    const res = {
      status: (code) => {
        assert.equal(403, code);
        return res;
      },
      json: (data) => {
        assert.equal('Forbidden', data.errors[0].message);
        done();
      },
    };
    const jwtStub = {
      verify: (token, secret) => {
        assert.equal('123', token);
        assert.ok(secret !== '');
        throw new Error('error');
      },
    };
    const nextStub = () => {
      assert.equal('321', req.tokenDecoded);
      assert.ok(true);
      done();
    };
    sessions.read(req, res, nextStub, jwtStub);
  });
});
