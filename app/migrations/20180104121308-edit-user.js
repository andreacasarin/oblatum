module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'confirmed', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'confirmed'),
};
