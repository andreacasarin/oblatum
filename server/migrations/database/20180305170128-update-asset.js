module.exports = {
  up: (queryInterface, Sequelize) =>
    [
      queryInterface.addColumn(
        'Assets',
        'previousWalletId',
        {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'Wallets',
            key: 'id',
          },
        },
      ),
      queryInterface.addColumn(
        'Assets',
        'transaction',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Assets',
        'contract',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Assets',
        'confirmed',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      ),
    ],

  down: (queryInterface, Sequelize) =>
    [
      queryInterface.removeColumn('Assets', 'previousWalletId'),
      queryInterface.removeColumn('Assets', 'transaction'),
      queryInterface.removeColumn('Assets', 'contract'),
      queryInterface.removeColumn('Assets', 'confirmed'),
    ],
};
