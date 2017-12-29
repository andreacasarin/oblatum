module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        email: 'foo@example.com',
        password: '12345',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
      {
        email: 'bar@example.com',
        password: 'password',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
