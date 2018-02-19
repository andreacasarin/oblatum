const orm = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    'Asset',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      serial: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {},
  );

  Asset.prototype.belongsTo(orm.Wallet, {
    foreignKey: 'walletId',
    onDelete: 'CASCADE',
  });

  return Asset;
};
