const assert = require('assert');
const sessions = require('../controllers/sessions');

describe('Sessions', () => {
  it('should create session if params are right', (done) => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'test',
      },
      params: {},
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
        findAll: (options) => {
          assert.equal('test@example.com', options.where.email);
          return Promise.resolve([
            {
              name: 'test',
              checkPassword: (password) => {
                assert.equal('test', password);
                return true;
              },
            },
          ]);
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
      params: {},
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
        findAll: (options) => {
          assert.equal('test@example.com', options.where.email);
          return Promise.resolve([
            {
              name: 'test',
              checkPassword: (password) => {
                assert.equal('test', password);
                return false;
              },
            },
          ]);
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
      params: {},
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
        findAll: (options) => {
          assert.equal('test@example.com', options.where.email);
          return Promise.reject({ errors: [0, 1] });
        },
      },
    };
    sessions.create(req, res, {}, modelsStub);
  });

  it('should read session form middleware', (done) => {
    const req = {
      tokenDecoded: '123',
      params: {},
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
    sessions.read(req, res, {});
  });

  it('should verify session with valid token', (done) => {
    const req = {
      headers: {
        authorization: 'Bearer 123',
      },
      body: {},
      params: {},
    };
    const res = {};
    const jwtStub = {
      verify: (token, secret) => {
        assert.equal('123', token);
        assert.ok(secret !== '');
        return 321;
      },
    };
    const nextStub = () => {
      assert.equal('321', req.tokenDecoded);
      assert.ok(true);
      done();
    };
    sessions.verify(req, res, nextStub, jwtStub);
  });

  it('should not verify session with invalid token', (done) => {
    const req = {
      headers: {
        authorization: 'Bearer 123',
      },
      body: {},
      params: {},
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
    sessions.verify(req, res, nextStub, jwtStub);
  });
});
