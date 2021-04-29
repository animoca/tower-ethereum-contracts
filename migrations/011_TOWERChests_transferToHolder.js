const {chests} = require('../src/constants/TOWERChests');

const {
  skipIfChainIdIs,
  multiSkip,
  batchDo,
} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');

module.exports = async (hre) => {
  const {execute, log} = hre.deployments;
  const {TOWERChests_deployer, TOWERChests_holder} = await hre.getNamedAccounts();
  const {toTransfer} = hre.skipData;

  await batchDo(
    execute,
    toTransfer.map((item) => {
      log(`TOWERChests: transfering chests (from=${TOWERChests_deployer}, to=${TOWERChests_holder}, amount=${item.amount.toString()})...`);
      return [
        item.deployment,
        {
          from: TOWERChests_deployer,
          log: false,
        },
        'transfer',
        TOWERChests_holder,
        item.amount,
      ];
    }),
    `TOWERChests: transfering chests`
  );
};
module.exports.skip = multiSkip([
  // async () => true,
  skipIfChainIdIs(['1']), // migration to be planned
  skipIfChainIdIs(['4']), // migration to be planned
  async (hre) => {
    const {read, log} = hre.deployments;
    const {TOWERChests_deployer} = await hre.getNamedAccounts();

    const toTransfer = [];

    for (const chest of chests) {
      const balanceOf = await read(chest.deployment, {log: false}, 'balanceOf', TOWERChests_deployer);

      if (balanceOf.isZero()) {
        continue;
      }

      toTransfer.push({
        deployment: chest.deployment,
        amount: balanceOf,
      });
    }

    if (toTransfer.length == 0) {
      log('TOWERChests: deployer TOWER Chest balances are empty, skipping...');
      return true;
    }

    hre.skipData = {toTransfer};
    return false;
  },
]);
module.exports.tags = ['TOWERChests_transferToHolder'];
module.exports.dependencies = [...chests.map((chest) => chest.deployment)];
