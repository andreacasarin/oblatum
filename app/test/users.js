const assert = require('assert');

const usersController = require('../controllers/users');

describe('Users', () => {
  it('it should create a user #WIP', () => {
    const req = { params: { userId: 1 } };
    const res = {};
    res.json = (data) => {
      assert.notEqual(data, null);
    };
    const next = err => err;
    usersController.create(req, res, next);
  });

  it('it should return some user #WIP', () => {
    const req = { params: {} };
    const res = {};
    res.json = (data) => {
      assert.notEqual(data, null);
    };
    const next = err => err;
    usersController.read(req, res, next);
  });

  it('it should return one user #WIP', () => {
    const req = { params: { userId: 1 } };
    const res = {};
    res.json = (data) => {
      assert.notEqual(data, null);
    };
    const next = err => err;
    usersController.read(req, res, next);
  });

  it('it should update a user #WIP', () => {
    const req = { params: { userId: 1 } };
    const res = {};
    res.json = (data) => {
      assert.notEqual(data, null);
    };
    const next = err => err;
    usersController.update(req, res, next);
  });

  it('it should delete a user #WIP', () => {
    const req = { params: { userId: 1 } };
    const res = {};
    res.json = (data) => {
      assert.notEqual(data, null);
    };
    const next = err => err;
    usersController.delete(req, res, next);
  });
});
