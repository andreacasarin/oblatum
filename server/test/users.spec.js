const assert = require('assert');
const users = require('../controllers/users');

describe('Users', () => {
  it('it should call model with right parameters to create a user', (done) => {
    const req = {
      body: {
        name: 'Name',
        surname: 'Surname',
        email: 'test@example.com',
        password: '12345678',
        passwordConfirmation: '12345678',
        role: 'user',
      },
    };
    const res = {
      status: (data) => {
        assert.equal(200, data);
        return res;
      },
      json: (data) => {
        assert.equal(1, data.user.id);
        done();
      },
    };
    const modelsStub = {
      User: {
        create: (data) => {
          assert.equal(data, req.body);
          return Promise.resolve({ id: 1 });
        },
      },
    };
    users.create(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to read all users', (done) => {
    const req = { params: {} };
    const res = {
      status: (data) => {
        assert.equal(200, data);
        return res;
      },
      json: (data) => {
        assert.equal(1, data.users[0].id);
        assert.equal(2, data.users[1].id);
        done();
      },
    };
    const modelsStub = {
      User: {
        findAll: (data) => {
          assert.equal(data, null);
          return Promise.resolve([{ id: 1 }, { id: 2 }]);
        },
      },
    };
    users.read(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to read a user', (done) => {
    const req = { params: { id: 1 } };
    const res = {
      status: (data) => {
        assert.equal(200, data);
        return res;
      },
      json: (data) => {
        assert.equal(1, data.user.id);
        done();
      },
    };
    const modelsStub = {
      User: {
        findById: (data) => {
          assert.equal(data, req.params.id);
          return Promise.resolve({ id: 1 });
        },
      },
    };
    users.read(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to update a user', (done) => {
    const req = {
      body: {
        name: 'Name',
        surname: 'Surname',
        email: 'test@example.com',
        password: '12345678',
        passwordConfirmation: '12345678',
        role: 'user',
      },
      params: { id: 1 },
    };
    const res = {
      status: (data) => {
        assert.equal(200, data);
        return res;
      },
      json: (data) => {
        assert.equal(1, data.user);
        done();
      },
    };
    const modelsStub = {
      User: {
        update: (data, options) => {
          assert.equal(data, req.body);
          assert.equal(options.where.id, req.params.id);
          return Promise.resolve(1);
        },
      },
    };
    users.update(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to delete a user', (done) => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: (data) => {
        assert.equal(200, data);
        return res;
      },
      json: (data) => {
        assert.equal(1, data.user);
        done();
      },
    };
    const modelsStub = {
      User: {
        destroy: (options) => {
          assert.equal(options.where.id, req.params.id);
          return Promise.resolve(1);
        },
      },
    };
    users.delete(req, res, {}, modelsStub);
  });

  it('create should return one or more errors when called with wrong parameters', (done) => {
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: (data) => {
        assert.equal(400, data);
        return res;
      },
      json: (data) => {
        assert.equal('test', data.errors);
        done();
      },
    };
    const modelsStub = {
      User: {
        create: () => Promise.reject({ errors: 'test' }),
      },
    };
    users.create(req, res, {}, modelsStub);
  });

  it('readAll should return one or more errors when called with wrong parameters', (done) => {
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: (data) => {
        assert.equal(400, data);
        return res;
      },
      json: (data) => {
        assert.equal('test', data.errors);
        done();
      },
    };
    const modelsStub = {
      User: {
        findAll: () => Promise.reject({ errors: 'test' }),
      },
    };
    users.read(req, res, {}, modelsStub);
  });

  it('read should return one or more errors when called with wrong parameters', (done) => {
    const req = {
      params: {
        id: 123,
      },
      body: {},
    };
    const res = {
      status: (data) => {
        assert.equal(400, data);
        return res;
      },
      json: (data) => {
        assert.equal('test', data.errors);
        done();
      },
    };
    const modelsStub = {
      User: {
        findById: () => Promise.reject({ errors: 'test' }),
      },
    };
    users.read(req, res, {}, modelsStub);
  });

  it('update should return one or more errors when called with wrong parameters', (done) => {
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: (data) => {
        assert.equal(400, data);
        return res;
      },
      json: (data) => {
        assert.equal('test', data.errors);
        done();
      },
    };
    const modelsStub = {
      User: {
        update: () => Promise.reject({ errors: 'test' }),
      },
    };
    users.update(req, res, {}, modelsStub);
  });

  it('delete should return one or more errors when called with wrong parameters', (done) => {
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: (data) => {
        assert.equal(400, data);
        return res;
      },
      json: (data) => {
        assert.equal('test', data.errors);
        done();
      },
    };
    const modelsStub = {
      User: {
        destroy: () => Promise.reject({ errors: 'test' }),
      },
    };
    users.delete(req, res, {}, modelsStub);
  });
});
