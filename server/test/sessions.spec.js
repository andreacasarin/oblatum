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
        assert.equal('test', data.name);
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
                return true;
              },
            },
          ]);
        },
      },
    };
    sessions.create(req, res, {}, modelsStub);
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
        assert.equal('Bad credentials', data.errors[0]);
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
        assert.equal(400, code);
        return res;
      },
      json: (data) => {
        assert.equal(0, data.errors[0]);
        assert.equal(1, data.errors[1]);
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
});
