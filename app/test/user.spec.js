const assert = require('assert');

const models = require('../models/index');

describe('User', () => {
  it('it should create, update and delete a user with all datas', (done) => {
    const data = {
      name: 'Name',
      surname: 'Surname',
      email: 'test@example.com',
      password: '12345678',
      passwordConfirmation: '12345678',
      // confirmed: true,
      role: 'user',
    };
    models.User.create(data).then((user) => {
      assert.equal(user.name, data.name);
      assert.equal(user.surname, data.surname);
      assert.equal(user.email, data.email);
      assert.equal(user.password, data.password);
      // assert.equal(user.confirmed, data.confirmed);
      assert.equal(user.role, data.role);

      const data2 = {
        name: 'Name2',
        surname: 'Surname2',
        email: 'test2@example.com',
        password: 'test',
        passwordConfirmation: 'test',
        // confirmed: false,
        role: 'user',
      };
      models.User.update(data2, { where: { id: user.id } }).then((affected) => {
        assert.equal(affected, 1);

        models.User.destroy({ where: { id: user.id } }).then((affected2) => {
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

  // it('it should create a user with all datas', (done) => {
  //   const data = {
  //     name: 'Name',
  //     surname: 'Surname',
  //     email: 'test@example.com',
  //     password: '12345678',
  //     passwordConfirmation: '12345678',
  //     confirmed: true,
  //     role: 'user',
  //   };
  //   models.User.create(data).then((user) => {
  //     assert.equal(user.name, data.name);
  //     assert.equal(user.surname, data.surname);
  //     assert.equal(user.email, data.email);
  //     assert.equal(user.password, data.password);
  //     assert.equal(user.confirmed, data.confirmed);
  //     assert.equal(user.role, data.role);
  //   }).catch(() => {
  //     assert.ok(false);
  //   }).then(done, done);
  // });

  it('it should not create a user with missing data', (done) => {
    models.User.create({}).then((user) => {
      assert.ok(false, user);
    }).catch((error) => {
      assert.equal(error.errors[0].path, 'name');
      assert.equal(error.errors[0].type, 'notNull Violation');

      assert.equal(error.errors[1].path, 'surname');
      assert.equal(error.errors[1].type, 'notNull Violation');

      assert.equal(error.errors[2].path, 'email');
      assert.equal(error.errors[2].type, 'notNull Violation');

      assert.equal(error.errors[3].path, 'password');
      assert.equal(error.errors[3].type, 'notNull Violation');

      assert.equal(error.errors[4].path, 'passwordConfirmation');
      assert.equal(error.errors[4].type, 'notNull Violation');

      assert.equal(error.errors[5].path, 'role');
      assert.equal(error.errors[5].type, 'notNull Violation');
    }).then(done, done);
  });

  it('it should not create a user with wrong passwordConfirmation', (done) => {
    models.User.create({
      name: 'Name',
      surname: 'Surname',
      email: 'test2@example.com',
      password: '12345678',
      passwordConfirmation: '123456789',
      // confirmed: true,
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
      // confirmed: true,
      role: 'user',
    }).then((user) => {
      assert.ok(true, user);

      return models.User.create({
        name: 'Name2',
        surname: 'Surname2',
        email: 'test3@example.com',
        password: '123456789',
        passwordConfirmation: '123456789',
        // confirmed: true,
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
      assert.ok((users.length >= 1));
    }).catch(() => {
      assert.ok(false);
    }).then(done, done);
  });

  it('it should read a user', (done) => {
    models.User.findById(1).then((user) => {
      assert.equal(user.id, 1);
    }).catch(() => {
      assert.ok(false);
    }).then(done, done);
  });

  // it('it should update a user with all datas', (done) => {
  //   models.User.update({ name: 'Name2'}, { where: { id: 4 } }).then((affected) => {
  //     assert.equal(affected, 1);
  //   }).catch((error) => {
  //     assert.ok(false, error);
  //   }).then(done, done);
  // });

  // it('it should delete a user with all datas', (done) => {
  //   models.User.destroy({ where: { id: 4 } }).then((affected) => {
  //     assert.equal(affected, 1);
  //   }).catch(() => {
  //     assert.ok(false);
  //   }).then(done, done);
  // });
});
