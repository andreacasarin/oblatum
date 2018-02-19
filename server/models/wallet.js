const orm = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    'Wallet', {
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {},
  );

  Wallet.prototype.belongsTo(orm.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });

  return Wallet;
};
