const Web3 = require('web3');

// We need WS to get web3js 1.0 subscriptions
// const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.ETH_NODE}:${process.env.ETH_PORT}`));
const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${process.env.ETH_NODE}:${process.env.ETH_PORT}`));

const deedAuthorityAbi = [
  {
    constant: true,
    inputs: [],
    name: 'contactInformation',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'claimOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'info',
        type: 'string',
      },
    ],
    name: 'setContactInformation',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'pendingOwner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'deed',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'DeedIssued',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_chassis',
        type: 'bytes32',
      },
      {
        name: '_photo',
        type: 'bytes32',
      },
    ],
    name: 'issue',
    outputs: [
      {
        name: 'deed',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_deed',
        type: 'address',
      },
    ],
    name: 'isGenuine',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const deedAbi = [
  {
    constant: true,
    inputs: [],
    name: 'chassis',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'claimOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'timestamp',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'photo',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'pendingOwner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_chassis',
        type: 'bytes32',
      },
      {
        name: '_photo',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
];

const deedAuthority = new web3.eth.Contract(deedAuthorityAbi);
const deed = new web3.eth.Contract(deedAbi);

const confirmationBlocksCount = 8;

module.exports = (
  sequelize,
  DataTypes,
  confirmationBlocks = confirmationBlocksCount,
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
      hooks: {
        beforeUpdate: (asset) => {
          console.log('beforeUpdate');
          asset.setDataValue('previousWalletId', asset.previous('WalletId'));
          asset.save({ hooks: false });
        },
        beforeValidate: (asset) => {
          asset.setDataValue('confirmed', false);
        },
        afterCreate: (asset) => {
          asset.getWallet().then((wallet) => {
            parentContract.options.address = process.env.ETH_CONTRACT;

            const transfer = parentContract.methods.issue(
              wallet.address,
              provider.utils.asciiToHex(`${asset.manufacturer}-${asset.model}-${asset.serial}`),
            ).encodeABI();

            const tx = {
              from: process.env.ETH_ADDRESS,
              to: process.env.ETH_CONTRACT,
              gas: 2000000,
              data: transfer,
            };

            return provider.eth.accounts.signTransaction(tx, process.env.ETH_KEY)
              .then(signed => provider.eth.sendSignedTransaction(signed.rawTransaction)
                .then((receipt) => {
                  console.log(receipt);
                  asset.setDataValue('transaction', receipt.transactionHash);
                  asset.setDataValue('contract', receipt.contractAddress);
                  asset.save({ hooks: false });

                  parentContract.once(
                    'DeedIssued',
                    {
                      filter: {
                        deed: asset.contract,
                      },
                      fromBlock: receipt.blockNumber - (confirmationBlocks + 1),
                      toBlock: receipt.blockNumber - confirmationBlocks,
                    },
                    (error, event) => {
                      if (!error) {
                        console.log(event);
                        asset.setDataValue('confirmed', true);
                        asset.save({ hooks: false });
                      }
                    },
                  );
                })
                .catch(error => error))
              .catch(error => error);
          });
        },
        afterUpdate: (asset) => {
          asset.getWallet().then((wallet) => {
            asset.getPreviousWallet().then((previousWallet) => {
              console.log(previousWallet);
              childContract.options.address = asset.contract;

              const transfer = childContract.methods.transferOwnership(
                wallet.address,
                provider.utils.asciiToHex(`${asset.manufacturer}-${asset.model}-${asset.serial}`),
              ).encodeABI();

              const tx = {
                from: previousWallet.address,
                to: wallet.address,
                gas: 2000000,
                data: transfer,
              };

              return provider.eth.accounts.signTransaction(tx, previousWallet.address)
                .then(signed => provider.eth.sendSignedTransaction(signed.rawTransaction)
                  .then((receipt) => {
                    console.log(receipt);
                    asset.setDataValue('transaction', receipt.transactionHash);
                    asset.save({ hooks: false });

                    childContract.once(
                      'DeedTransferred',
                      {
                        filter: {
                          asset: provider.utils.asciiToHex(`${asset.manufacturer}-${asset.model}-${asset.serial}`),
                        },
                        fromBlock: receipt.blockNumber - (confirmationBlocks + 1),
                        toBlock: receipt.blockNumber - confirmationBlocks,
                      },
                      (error, event) => {
                        if (!error) {
                          console.log(event);
                          asset.setDataValue('confirmed', true);
                          asset.save({ hooks: false });
                        }
                      },
                    );
                  })
                  .catch(error => error))
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
