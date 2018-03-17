module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
};
