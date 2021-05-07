const {
  multiSkip,
  skipIfChainIdIs,
  batchDo,
} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');
const {skuInfos} = require('../src/constants/TOWERChestSale');

module.exports = async (hre) => {
  const {get, execute, log} = hre.deployments;
  const {TOWERChestSale_deployer} = await hre.getNamedAccounts();
  const {toSet} = hre.skipData;

  const paymentToken = await get('TOWER');

  await batchDo(
    execute,
    toSet.map((skuInfo) => {
      log(`TOWERChestSale: setting SKU pricing (sku=${skuInfo.sku}, price=${skuInfo.price.toString()})`);
      return ['TOWERChestSale', {from: TOWERChestSale_deployer}, 'updateSkuPricing', skuInfo.sku, [paymentToken.address], [skuInfo.price]];
    }),
    `TOWERChestSale: setting SKU pricing`
  );
};
module.exports.skip = multiSkip([
  // async () => true,
  // skipIfChainIdIs(['1']), // migration to be planned
  skipIfChainIdIs(['4']), // migration completed
  async (hre) => {
    const {read, log} = hre.deployments;

    const curSkuInfos = await batchDo(
      read,
      skuInfos.map((skuInfo) => ['TOWERChestSale', {}, 'getSkuInfo', skuInfo.sku]),
      `TOWERChestSale: checking SKU pricing statuses`
    );

    const toSet = skuInfos
      .map((skuInfo, index) => {
        const curSkuInfo = curSkuInfos[index];
        const curSkuInfoTokens = curSkuInfo.tokens.map((address) => address.toLowerCase());

        if (curSkuInfoTokens.length != 0) {
          const curSkuInfoPrice = curSkuInfo.prices[0];

          if (curSkuInfoPrice.eq(skuInfo.price)) {
            return null;
          }
        }

        return {sku: skuInfo.sku, price: skuInfo.price};
      })
      .filter((skuInfo) => skuInfo != null);

    if (toSet.length == 0) {
      log(`TOWERChestSale: SKU token prices already set, skipping...`);
      return true;
    }

    hre.skipData = {toSet};
    return false;
  },
]);
module.exports.tags = ['TOWERChestSale_setSkuTokenPrice'];
module.exports.dependencies = ['TOWER', 'TOWERChestSale_createSku'];
