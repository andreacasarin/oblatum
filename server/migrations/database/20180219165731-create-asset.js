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
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      walletId: {
        type: Sequelize.UUID,
        allowNull: false,
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
