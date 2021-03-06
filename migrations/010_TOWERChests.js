const {chests} = require('../src/constants/TOWERChests');

const {skipIfChainIdIs, multiSkip} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');

module.exports = async (hre) => {
  const {deploy, log} = hre.deployments;
  const {TOWERChests_deployer, TOWERChests_holder} = await hre.getNamedAccounts();
  const {toDeploy} = hre.skipData;

  for (const chest of toDeploy) {
    log(
      `TOWERChests: deploying (name=${chest.name}, symbol=${chest.symbol}, decimals=${chest.decimals}, version=${chest.version}, tokenURI=${
        chest.tokenURI
      }, holder=${TOWERChests_holder}, supply=${chest.supply.toString()})...`
    );

    await deploy(chest.deployment, {
      contract: 'TOWERChest',
      args: [chest.name, chest.symbol, chest.decimals, chest.version, chest.tokenURI, TOWERChests_holder, chest.supply],
      from: TOWERChests_deployer,
      log: true,
    });
  }
};
module.exports.skip = multiSkip([
  // async () => true,
  skipIfChainIdIs(['1']), // migration completed
  skipIfChainIdIs(['4']), // migration completed
  async (hre) => {
    const {getOrNull, log} = hre.deployments;

    const toDeploy = [];

    for (const chest of chests) {
      const deployment = await getOrNull(chest.deployment);

      if (deployment) {
        continue;
      }

      toDeploy.push(chest);
    }

    if (toDeploy.length == 0) {
      log('TOWERChests: all TOWER Chests deployed, skipping...');
      return true;
    }

    hre.skipData = {toDeploy};
    return false;
  },
]);
module.exports.tags = ['TOWERChests'];
