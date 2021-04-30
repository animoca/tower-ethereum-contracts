const {parseEther} = require('ethers').utils;

const chests = [
  {
    deployment: 'TOWERChest-BRNZ',
    name: 'Bronze TOWER Chest',
    symbol: 'TWR.BRNZ',
    decimals: 18,
    version: '1',
    tokenURI: 'https://TOWERChest-BRNZ.json', // TODO to be confirmed
    supply: parseEther('3500'),
  },
  {
    deployment: 'TOWERChest-SLVR',
    name: 'Silver TOWER Chest',
    symbol: 'TWR.SLVR',
    decimals: 18,
    version: '1',
    tokenURI: 'https://TOWERChest-SLVR.json', // TODO to be confirmed
    supply: parseEther('2500'),
  },
  {
    deployment: 'TOWERChest-GOLD',
    name: 'Gold TOWER Chest',
    symbol: 'TWR.GOLD',
    decimals: 18,
    version: '1',
    tokenURI: 'https://TOWERChest-GOLD.json', // TODO to be confirmed
    supply: parseEther('500'),
  },
];

module.exports = {
  chests,
};
