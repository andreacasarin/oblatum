module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  migrations_directory: './migrations/blockchain',
  networks: {
    development: {
      host: process.env.ETH_HOST,
      port: process.env.ETH_PORT,
      network_id: '*', // Match any network id
    },
  },
};
