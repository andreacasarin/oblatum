const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    passwordConfirmation: { type: DataTypes.STRING, allowNull: false, field: 'password' },
    role: { type: DataTypes.STRING, allowNull: false },
  }, {
    validate: {
      passwordConfirmationEqualsPassword() {
        if (this.getDataValue('password') !== this.getDataValue('passwordConfirmation')) {
          throw new Error('Require password and passwordConfirmation to be equals');
        }
      },
    },
    hooks: {
      beforeValidate: (user) => {
        user.setDataValue('role', 'user');
      },
      afterValidate: (user) => {
        user.setDataValue('password', bcrypt.hashSync(user.getDataValue('password'), 10));
        user.setDataValue('passwordConfirmation', bcrypt.hashSync(user.getDataValue('passwordConfirmation'), 10));
      },
    },
  });

  User.prototype.checkPassword = function checkPassword(value) {
    return bcrypt.compareSync(value, this.getDataValue('password'));
  };

  return User;
};
