const { assert } = require('chai');
const { describe, it } = require('mocha');
const users = require('../../controllers/users');

describe('Users', () => {
  it('it should call model with right parameters to create a user', (done) => {
    const req = {
      body: {
        name: 'Name',
        surname: 'Surname',
        email: 'test@example.com',
        password: '12345678',
        passwordConfirmation: '12345678',
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
          assert.equal('Name', data.name);
          assert.equal('Surname', data.surname);
          assert.equal('test@example.com', data.email);
          assert.equal('12345678', data.password);
          assert.equal('12345678', data.passwordConfirmation);
          return Promise.resolve({ id: 1 });
        },
      },
    };
    users.create(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to read all users', (done) => {
    const req = { params: {}, user: { id: 1 } };
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
        scope: (scope1) => {
          assert.equal('authorized', scope1.method[0]);
          assert.equal(req.user.id, scope1.method[1]);
          return modelsStub.User;
        },
        findAll: (data) => {
          assert.equal(null, data);
          return Promise.resolve([{ id: 1 }, { id: 2 }]);
        },
      },
    };
    users.read(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to read a user', (done) => {
    const req = { params: { id: 1 }, user: { id: 1 } };
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
        scope: (scope1) => {
          assert.equal('authorized', scope1.method[0]);
          assert.equal(req.user.id, scope1.method[1]);
          return modelsStub.User;
        },
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
      user: { id: 1 },
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
        scope: (scope1) => {
          assert.equal('authorized', scope1.method[0]);
          assert.equal(req.user.id, scope1.method[1]);
          return modelsStub.User;
        },
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
      user: { id: 1 },
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
        scope: (scope1) => {
          assert.equal('authorized', scope1.method[0]);
          assert.equal(req.user.id, scope1.method[1]);
          return modelsStub.User;
        },
        destroy: (options) => {
          assert.equal(options.where.id, req.params.id);
          return Promise.resolve(1);
        },
      },
    };
    users.delete(req, res, {}, modelsStub);
  });
});
