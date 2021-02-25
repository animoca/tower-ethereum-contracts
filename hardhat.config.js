require('@animoca/ethereum-migrations-core_library/hardhat-plugins');

const {namedAccounts: commonNamedAccounts, namedGroups: commonNamedGroups} = require('@animocabrands/ethereum-migrations-common/config/accounts');
const {namedAccounts: projectNamedAccounts, namedGroups: projectNamedGroups} = require('./config/accounts');

module.exports = {
  namedAccounts: {
    ...commonNamedAccounts,
    ...projectNamedAccounts,
  },
  namedGroups: {
    ...commonNamedGroups,
    ...projectNamedGroups,
  },
  paths: {
    deploy: 'migrations',
  },
  external: {
    contracts: [
      {
        artifacts: 'node_modules/@animoca/tower-ethereum-contracts/artifacts',
      },
    ],
  },
  toExport: {
    deployments: ['TOWER'],
    // namedAccounts: [],
    // namedGroups: [],
  },
  duplicateNetworksWithTags: ['qa'],
  providers: {
    default: 'infura',
    alchemy: {
      mainnet: 'https://eth-mainnet.alchemyapi.io/v2/NhbCXLMPmFkzxgG2N_-4EyADg8cZzA7E',
      rinkeby: 'https://eth-rinkeby.alchemyapi.io/v2/4i9m7s89IBIFQ7QRNoQdnV7ckZE6G22_',
      ropsten: 'https://ropsten.infura.io/v3/6a13df7c49464ff4b4a5a8d7f481e2c0',
      kovan: 'https://kovan.infura.io/v3/6a13df7c49464ff4b4a5a8d7f481e2c0',
    },
    infura: {
      mainnet: 'https://mainnet.infura.io/v3/6c799310a0ee4eae8358a5437abc44b3',
      rinkeby: 'https://eth-rinkeby.alchemyapi.io/v2/4i9m7s89IBIFQ7QRNoQdnV7ckZE6G22_',
      ropsten: 'https://ropsten.infura.io/v3/6a13df7c49464ff4b4a5a8d7f481e2c0',
      kovan: 'https://kovan.infura.io/v3/6a13df7c49464ff4b4a5a8d7f481e2c0',
    },
  },
};
