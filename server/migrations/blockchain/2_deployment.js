var DeedAuthority = artifacts.require("DeedAuthority");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(DeedAuthority, { from: process.env.ETH_ADDRESS });
};
