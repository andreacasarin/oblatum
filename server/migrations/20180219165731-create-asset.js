module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'Assets',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      manufacturer: {
        type: Sequelize.STRING,
      },
      model: {
        type: Sequelize.STRING,
      },
      serial: {
        type: Sequelize.STRING,
      },
      walletId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Wallets',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      charset: 'utf8',
    },
  ),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Assets'),
};
