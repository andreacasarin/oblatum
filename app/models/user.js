module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    passwordConfirmation: { type: DataTypes.STRING, allowNull: false, field: 'password' },
    confirmed: DataTypes.BOOLEAN,
    role: { type: DataTypes.STRING, allowNull: false },
  }, {
    classMethods: {
      // associate: (models) => {
      //   // associations can be defined here
      // },
    },
    validate: {
      passwordConfirmationEqualsPassword() {
        if (this.password !== this.passwordConfirmation) {
          throw new Error('Require password and passwordConfirmation to be equals');
        }
      },
    },
  });
  return User;
};
