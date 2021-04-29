const {
  skipIfContractExists,
  skipIfChainIdIs,
  multiSkip,
} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');
const {skusCapacity, tokensPerSkuCapacity} = require('../src/constants/TOWERChestSale');

module.exports = async (hre) => {
  const {deploy, log} = hre.deployments;
  const {TOWERChestSale_deployer, TOWERChests_holder, TOWERChestSale_payoutWallet} = await hre.getNamedAccounts();

  log(
    `TOWERChestSale: deploying (holder=${TOWERChests_holder} payoutWallet=${TOWERChestSale_payoutWallet} ` +
      `skusCapacity=${skusCapacity} tokensPerSkuCapacity=${tokensPerSkuCapacity})...`
  );

  await deploy('TOWERChestSale', {
    contract: 'TOWERChestSale',
    args: [TOWERChests_holder, TOWERChestSale_payoutWallet, skusCapacity, tokensPerSkuCapacity],
    from: TOWERChestSale_deployer,
    log: true,
  });
};
module.exports.skip = multiSkip([
  // async () => true,
  skipIfChainIdIs(['1']), // migration to be planned
  skipIfChainIdIs(['4']), // migration completed
  skipIfContractExists('TOWERChestSale'), // contract guard
]);
module.exports.tags = ['TOWERChestSale'];
