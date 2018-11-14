const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${process.env.ETH_HOST}:${process.env.ETH_PORT}`));

module.exports = (sequelize, DataTypes, provider = web3) => {
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
        validate: { equals: 'Ethereum', notEmpty: true },
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
      scopes: {
        defaultScope: {
          attributes: ['name', 'address', 'userId', 'createdAt', 'updatedAt'],
        },
        authorized: ((id) => { return { where: { userId: id } }; }),
      },
      hooks: {
        beforeValidate: (wallet) => {
          const account = provider.eth.accounts.create();
          wallet.setDataValue('name', 'Ethereum');
          wallet.setDataValue('address', account.address);
          wallet.setDataValue('key', account.privateKey);
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
