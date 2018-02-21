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
        validate: { equals: 'default', notEmpty: true },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      hooks: {
        beforeValidate: (wallet) => {
          wallet.setDataValue('name', 'default');

          function guid() {
            function s4() {
              return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
          }

          wallet.setDataValue('address', guid());
          wallet.setDataValue('key', guid());
        },
      },
    },
  );

  Wallet.associate = (models) => {
    Wallet.User = Wallet.belongsTo(models.User);
    Wallet.Assets = Wallet.hasMany(models.Asset);
  };

  return Wallet;
};
