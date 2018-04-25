const { assert } = require('chai');
const { describe, it } = require('mocha');
const models = require('../../models/index');

describe('User', () => {
  it('it should create, update and delete a user with all datas', (done) => {
    const data = {
      name: 'Name',
      surname: 'Surname',
      email: 'test@example.com',
      password: '12345678',
      passwordConfirmation: '12345678',
      role: 'user',
    };
    models.User.create(data).then((user) => {
      assert.equal(data.name, user.name);
      assert.equal(data.surname, user.surname);
      assert.equal(data.email, user.email);
      assert.ok(user.checkPassword(data.password));
      assert.equal(data.role, user.role);

      const data2 = {
        name: 'Name2',
        surname: 'Surname2',
        email: 'test2@example.com',
        password: 'test1234',
        passwordConfirmation: 'test1234',
        role: 'user',
      };
      return models.User.update(data2, { where: { id: user.id } }).then((affected) => {
        assert.equal(affected, 1);
        return models.User.destroy({ where: { id: user.id } }).then((affected2) => {
          assert.equal(affected2, 1);
        }).catch(() => {
          assert.ok(false);
        }).then(done, done);
      }).catch(() => {
        assert.ok(false);
      });
    }).catch(() => {
      assert.ok(false);
    });
  });

  it('it should not create a user with missing data', (done) => {
    models.User.create({}).then((user) => {
      assert.ok(false, user);
    }).catch((error) => {
      assert.equal(5, error.errors.length);
    }).then(done, done);
  });

  it('it should not create a user with wrong passwordConfirmation', (done) => {
    models.User.create({
      name: 'Name',
      surname: 'Surname',
      email: 'test2@example.com',
      password: '12345678',
      passwordConfirmation: '123456789',
      role: 'user',
    }).then((user) => {
      assert.ok(false, user);
    }).catch((error) => {
      assert.equal(error.errors[0].path, 'passwordConfirmationEqualsPassword');
      assert.equal(error.errors[0].type, 'Validation error');
    }).then(done, done);
  });

  it('it should not create a user twice (with the same email)', (done) => {
    models.User.create({
      name: 'Name',
      surname: 'Surname',
      email: 'test3@example.com',
      password: '12345678',
      passwordConfirmation: '12345678',
      role: 'user',
    }).then((user) => {
      assert.ok(true, user);

      return models.User.create({
        name: 'Name2',
        surname: 'Surname2',
        email: 'test3@example.com',
        password: '123456789',
        passwordConfirmation: '123456789',
        role: 'user',
      }).then((user) => {
        assert.ok(false, user);
      }).catch((error) => {
        assert.equal(error.errors[0].path, 'email');
        assert.equal(error.errors[0].type, 'unique violation');

        return models.User.destroy({ where: { email: 'test3@example.com' } }).then((affected) => {
          assert.equal(affected, 1);
        }).catch(() => {
          assert.ok(false);
        }).then(done, done);
      });
    }).catch((error) => {
      assert.ok(false, error);
    });
  });

  it('it should read all users', (done) => {
    models.User.findAll().then((users) => {
      assert.ok(true);
    }).catch(() => {
      assert.ok(false);
    }).then(done, done);
  });

  it('it should read a user', (done) => {
    models.User.findById(1).then((user) => {
      assert.ok(true);
    }).catch(() => {
      assert.ok(false);
    }).then(done, done);
  });
});
