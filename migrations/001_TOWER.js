const {formatEther, parseEther} = require('ethers').utils;

const {
  skipIfContractExists,
  skipIfChainIdIs,
  multiSkip,
} = require('@animoca/ethereum-migrations-core_library/hardhat-plugins/hardhat-deploy-migrations/migrations');

const initialTokenSupply = parseEther('10000000000');

module.exports = async (hre) => {
  const {deploy, read, log} = hre.deployments;
  const {TOWER_owner, TOWER_holder} = await hre.getNamedAccounts();

  log(`TOWER: deploying (holder=${TOWER_holder}, amount=${initialTokenSupply})...`);

  const TOWER = await deploy('TOWER', {
    contract: 'TOWER',
    args: [[TOWER_holder], [initialTokenSupply]],
    from: TOWER_owner,
    log: true,
  });

  const totalSupply = await read('TOWER', {}, 'totalSupply');
  log(`TOWER total supply: ${formatEther(totalSupply)}`);
};
module.exports.skip = multiSkip([
  // async () => true,
  skipIfChainIdIs(['1']), // migration done
  skipIfChainIdIs(['4']), // migration done
  skipIfContractExists('TOWER'), // contract guard
]);
module.exports.tags = ['TOWER'];
