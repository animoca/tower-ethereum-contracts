const {multiSkip, skipIfChainIdIs} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');

module.exports = async (hre) => {
  const {execute, log} = hre.deployments;
  const {TOWERChestSale_deployer} = await hre.getNamedAccounts();

  log('TOWERChestSale: starting contract...');

  await execute(
    'TOWERChestSale',
    {
      from: TOWERChestSale_deployer,
      log: true,
    },
    'start'
  );
};

module.exports.skip = multiSkip([
  // async () => true,
  skipIfChainIdIs(['1']), // migration to be planned
  skipIfChainIdIs(['4']), // migration completed
  async (hre) => {
    const {read, log} = hre.deployments;

    const startedAt = await read('TOWERChestSale', {}, 'startedAt');

    if (!startedAt.isZero()) {
      log('TOWERChestSale: contract already started, skipping...');
      return true;
    }

    return false;
  },
]);
module.exports.tags = ['TOWERChestSale_start'];
module.exports.dependencies = ['TOWERChestSale'];
