const {MaxUint256} = require('ethers').constants;
const {
  multiSkip,
  skipIfChainIdIs,
  batchDo,
} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');
const {chests} = require('../src/constants/TOWERChests');

module.exports = async (hre) => {
  const {execute, log} = hre.deployments;
  const {TOWERChestSale_holder} = await hre.getNamedAccounts();
  const {toApprove, saleAddress} = hre.skipData;

  await batchDo(
    execute,
    toApprove.map((deployment) => {
      log(`TOWERChests: approving sale contract by the holder (chest=${deployment} holder=${TOWERChestSale_holder} spender=${saleAddress})...`);
      return [deployment, {from: TOWERChestSale_holder}, 'approve', saleAddress, MaxUint256];
    }),
    `TOWERChests: approving sale contract by the holder`
  );
};

module.exports.skip = multiSkip([
  // async () => true,
  skipIfChainIdIs(['1']), // is run externally on mainnet
  async (hre) => {
    const {get, read, log} = hre.deployments;
    const {TOWERChestSale_holder} = await hre.getNamedAccounts();

    const sale = await get('TOWERChestSale');
    const saleAddress = sale.address;

    log('TOWERChests: checking sale contract approvals by the holder...');

    const toApprove = [];

    for (const chest of chests) {
      const allowance = await read(chest.deployment, {}, 'allowance', TOWERChestSale_holder, saleAddress);

      if (!allowance.eq(MaxUint256)) {
        toApprove.push(chest.deployment);
      }
    }

    if (toApprove.length == 0) {
      log('TOWERChests: sale contract is already approved by the holder, skipping...');
      return true;
    }

    hre.skipData = {toApprove, saleAddress};
    return false;
  },
]);
module.exports.tags = ['TOWERChests_TOWERChestSale_setApprovalForAll'];
module.exports.dependencies = ['TOWERChestSale'];
