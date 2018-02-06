const assert = require('assert');

const users = require('../controllers/users');

describe('Users', () => {
  it('it should call model with right parameters to create a user', () => {
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
      json: (data) => {
        assert.equal(data.status, 'success');
      },
    };
    const modelsStub = {
      User: {
        create: (data) => {
          assert.equal(data, req.body);
          return Promise.resolve({ dataValues: { id: 1 } });
        },
      },
    };
    users.create(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to read all users', () => {
    const req = { params: {} };
    const res = {
      json: (data) => {
        assert.equal(data.status, 'success');
      },
    };
    const modelsStub = {
      User: {
        findAll: (data) => {
          assert.equal(data, null);
          return Promise.resolve({ dataValues: [{ id: 1 }, { id: 2 }] });
        },
      },
    };
    users.read(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to read a user', () => {
    const req = { params: { id: 1 } };
    const res = {
      json: (data) => {
        assert.equal(data.status, 'success');
      },
    };
    const modelsStub = {
      User: {
        findById: (data) => {
          assert.equal(data, req.params.id);
          return Promise.resolve({ dataValues: { id: 1 } });
        },
      },
    };
    users.read(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to update a user', () => {
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
      json: (data) => {
        assert.equal(data.status, 'success');
      },
    };
    const modelsStub = {
      User: {
        update: (data, options) => {
          assert.equal(data, req.body);
          assert.equal(options.where.id, req.params.id);
          return Promise.resolve([1]);
        },
      },
    };
    users.update(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to delete a user', () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      json: (data) => {
        assert.equal(data.status, 'success');
      },
    };
    const modelsStub = {
      User: {
        destroy: (options) => {
          assert.equal(options.where.id, req.params.id);
          return Promise.resolve([1]);
        },
      },
    };
    users.delete(req, res, {}, modelsStub);
  });

  it('it should return one or more errors when called with wrong parameters', () => {
    const req = {
      params: {},
      body: {},
    };
    const res = {
      json: (data) => {
        assert.equal(data.status, 'failure');
      },
    };
    const modelsStub = {
      User: {
        create: () => Promise.resolve({ errors: [1, 2] }),
        findAll: () => Promise.resolve({ errors: [1, 2] }),
        findById: () => Promise.resolve({ errors: [1, 2] }),
        update: () => Promise.resolve({ errors: [1, 2] }),
        destroy: () => Promise.resolve({ errors: [1, 2] }),
      },
    };
    users.create(req, res, {}, modelsStub);
    users.read(req, res, {}, modelsStub);
    users.update(req, res, {}, modelsStub);
    users.delete(req, res, {}, modelsStub);
  });
});
