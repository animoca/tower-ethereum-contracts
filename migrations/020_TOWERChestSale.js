const {
  skipIfContractExists,
  skipIfChainIdIs,
  multiSkip,
} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');
const {skusCapacity, tokensPerSkuCapacity} = require('../src/constants/TOWERChestSale');

module.exports = async (hre) => {
  const {deploy, log} = hre.deployments;
  const {TOWERChestSale_deployer, TOWERChestSale_holder, TOWERChestSale_payoutWallet} = await hre.getNamedAccounts();

  log(
    `TOWERChestSale: deploying (holder=${TOWERChestSale_holder} payoutWallet=${TOWERChestSale_payoutWallet} ` +
      `skusCapacity=${skusCapacity} tokensPerSkuCapacity=${tokensPerSkuCapacity})...`
  );

  await deploy('TOWERChestSale', {
    contract: 'TOWERChestSale',
    args: [TOWERChestSale_holder, TOWERChestSale_payoutWallet, skusCapacity, tokensPerSkuCapacity],
    from: TOWERChestSale_deployer,
    log: true,
  });
};
module.exports.skip = multiSkip([
  // async () => true,
  skipIfChainIdIs(['1']), // migration to be planned
  skipIfChainIdIs(['4']), // migration to be planned
  skipIfContractExists('TOWERChestSale'), // contract guard
]);
module.exports.tags = ['TOWERChestSale'];
