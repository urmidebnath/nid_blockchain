const NID = artifacts.require("NID");

module.exports = function(deployer) {
  deployer.deploy(NID);
};
