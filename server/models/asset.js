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

  Asset.associate = (models) => {
    Asset.Wallet = Asset.belongsTo(models.Wallet);
    // The upper association has to be 'Wallets' with the second one enabled
    // something like:
    // Asset.belongsTo(models.Wallet, { as: 'Wallet' });
    // will almost do the trick.
    // Asset.User = Asset.belongsToMany(models.User, {
    //   through: models.Wallet,
    // });
  };

  return Asset;
};
