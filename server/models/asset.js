const Web3 = require('web3');
const deedAuthorityJson = require('../config/DeedAuthority.json');
const deedJson = require('../config/Deed.json');

const web3 = new Web3(new Web3.providers.WebsocketProvider(`${process.env.ETH_HOST}:${process.env.ETH_PORT}`));
const deedAuthority = new web3.eth.Contract(deedAuthorityJson.abi, deedAuthorityJson.networks['1'].address);
const deed = new web3.eth.Contract(deedJson.abi);


module.exports = (
  sequelize,
  DataTypes,
  parentContract = deedAuthority,
  childContract = deed,
  provider = web3,
) => {
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
      transaction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contract: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      previousWalletId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      scopes: {
        authorized: (id) => {
          return {
            include: [
              { model: sequelize.models.Wallet.scope({ method: ['authorized', id ] }) },
            ],
          };
        },
      },
      hooks: {
        beforeValidate: (asset) => {
          asset.setDataValue('confirmed', false);
          asset.setDataValue('PreviousWalletId', asset.previous('WalletId'));
        },
        beforeUpdate: (asset) => {
          // FIXME WORKAROUND: https://github.com/sequelize/sequelize/issues/3534
          asset.setDataValue('PreviousWalletId', asset.previous('WalletId'));
          asset.save({ hooks: false });
        },
        afterCreate: (asset) => {
          asset.getWallet().then((wallet) => {
            const transfer = parentContract.methods.issue(
              wallet.address,
              provider.utils.asciiToHex(asset.manufacturer),
              provider.utils.asciiToHex(asset.model),
              provider.utils.asciiToHex(asset.serial),
            ).encodeABI();

            const tx = {
              from: process.env.ETH_ADDRESS,
              to: parentContract.options.address,
              gas: 2000000,
              data: transfer,
            };

            return provider.eth.accounts.signTransaction(tx, process.env.ETH_KEY)
              .then((signed) => {
                parentContract.once(
                  'DeedIssued',
                  {
                    filter: {
                      to: wallet.address,
                    },
                  },
                  (error, event) => {
                    if (!error) {
                      asset.setDataValue('confirmed', true);
                      asset.setDataValue('contract', event.returnValues.deed);
                      asset.save({ hooks: false });
                    }
                  },
                );
                provider.eth.sendSignedTransaction(signed.rawTransaction)
                  .then((receipt) => {
                    asset.setDataValue('transaction', receipt.transactionHash);
                    asset.save({ hooks: false });
                  })
                  .catch(error => error);
              })
              .catch(error => error);
          });
        },
        afterUpdate: (asset) => {
          asset.getWallet().then((wallet) => {
            asset.getPreviousWallet().then((previousWallet) => {
              childContract.options.address = asset.contract;
              const transfer = childContract.methods.transferOwnership(wallet.address).encodeABI();

              // FIXME: here the sender doesn't have enough funds to send tx
              // therefore this transaction will fail until he has availble balance.
              const tx = {
                from: previousWallet.address,
                to: asset.contract,
                gas: 2000000,
                data: transfer,
              };

              return provider.eth.accounts.signTransaction(tx, previousWallet.key)
                .then((signed) => {
                  childContract.once(
                    'OwnershipTransferred',
                    {
                      filter: {
                        previousOwner: previousWallet.address,
                        newOwner: wallet.address,
                      },
                    },
                    (error) => {
                      if (!error) {
                        asset.setDataValue('confirmed', true);
                        asset.save({ hooks: false });
                      }
                    },
                  );
                  provider.eth.sendSignedTransaction(signed.rawTransaction)
                    .then((receipt) => {
                      asset.setDataValue('transaction', receipt.transactionHash);
                      asset.save({ hooks: false });
                    })
                    .catch(error => error);
                })
                .catch(error => error);
            }).catch(error => error);
          });
        },
      },
    },
  );

  Asset.associate = (models) => {
    Asset.Wallet = Asset.belongsTo(models.Wallet);
    Asset.PreviousWallet = Asset.belongsTo(models.Wallet, { as: 'PreviousWallet' });
  };

  return Asset;
};
