const {
  multiSkip,
  skipIfChainIdIs,
  batchDo,
} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');
const {skuInfos, maxQuantityPerPurchase, notificationReceiver} = require('../src/constants/TOWERChestSale');

module.exports = async (hre) => {
  const {execute, log} = hre.deployments;
  const {TOWERChestSale_deployer} = await hre.getNamedAccounts();
  const {toCreate, tokenAddresses} = hre.skipData;

  await batchDo(
    execute,
    toCreate.map((skuInfo, index) => {
      log(
        `TOWERChestSale: creating SKU (sku=${skuInfo.sku} supply=${skuInfo.supply} maxQtyPerPurchase=${maxQuantityPerPurchase} ` +
          `notificationReceiver=${notificationReceiver} token=${tokenAddresses[skuInfo.deployment]})...`
      );
      return [
        'TOWERChestSale',
        {from: TOWERChestSale_deployer},
        'createSku',
        skuInfo.sku,
        skuInfo.supply,
        maxQuantityPerPurchase,
        notificationReceiver,
        tokenAddresses[skuInfo.deployment],
      ];
    }),
    `TOWERChestSale: creating SKUs`
  );
};
module.exports.skip = multiSkip([
  // async () => true,
  // skipIfChainIdIs(['1']), // migration to be planned
  skipIfChainIdIs(['4']), // migration completed
  async (hre) => {
    const {get, read, log} = hre.deployments;

    log(`TOWERChestSale: checking SKU creation statuses...`);

    const created = await read('TOWERChestSale', {}, 'getSkus');
    const toCreate = skuInfos.filter((skuInfo) => !created.includes(skuInfo.sku));

    if (toCreate.length == 0) {
      log(`TOWERChestSale: SKUs already created, skipping...`);
      return true;
    }

    const tokenAddresses = {};

    for (const skuInfo of toCreate) {
      const deployment = await get(skuInfo.deployment);
      tokenAddresses[skuInfo.deployment] = deployment.address;
    }

    hre.skipData = {toCreate, tokenAddresses};
    return false;
  },
]);
module.exports.tags = ['TOWERChestSale_createSku'];
module.exports.dependencies = ['TOWERChestSale'];
