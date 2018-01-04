module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Oblatum',
        surname: 'Admin',
        email: 'support@oblatum.it',
        password: 'ug6l1hm4rycxfzvb',
        confirmed: true,
        role: 'admin',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
      {
        name: 'Foo',
        surname: 'Mc Kinnon',
        email: 'foo@example.com',
        password: '12345',
        confirmed: true,
        role: 'user',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
      {
        name: 'Bar',
        surname: 'Neistat',
        email: 'bar@example.com',
        password: 'password',
        confirmed: false,
        role: 'user',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
