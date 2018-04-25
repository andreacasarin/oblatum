var DeedAuthority = artifacts.require("./DeedAuthority.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(DeedAuthority, { from: process.env.ETH_ADDRESS });
};
