const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [8, 16], notEmpty: true },
      },
      passwordConfirmation: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
        validate: { len: [8, 16], notEmpty: true },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { equals: 'user', notEmpty: true },
      },
    },
    {
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
    },
  );

  User.prototype.checkPassword = function checkPassword(value) {
    return bcrypt.compareSync(value, this.getDataValue('password'));
  };

  User.associate = (models) => {
    User.Wallets = User.hasMany(models.Wallet);
    // User.Assets = User.belongsToMany(models.Asset, {
    //   through: models.Wallet,
    // });
  };

  return User;
};
