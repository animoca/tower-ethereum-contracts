const {parseEther} = require('ethers').utils;

const chests = [
  {
    deployment: 'TOWERChest-BRNZ',
    name: 'Bronze TOWER Chest',
    symbol: 'TWR.BRNZ',
    decimals: 18,
    version: '1',
    tokenURI: 'https://assets.crazydefenseheroes.com/opensea/metadata/bronze_chest_metadata.json',
    supply: parseEther('3500'),
  },
  {
    deployment: 'TOWERChest-SLVR',
    name: 'Silver TOWER Chest',
    symbol: 'TWR.SLVR',
    decimals: 18,
    version: '1',
    tokenURI: 'https://assets.crazydefenseheroes.com/opensea/metadata/silver_chest_metadata.json',
    supply: parseEther('2500'),
  },
  {
    deployment: 'TOWERChest-GOLD',
    name: 'Gold TOWER Chest',
    symbol: 'TWR.GOLD',
    decimals: 18,
    version: '1',
    tokenURI: 'https://assets.crazydefenseheroes.com/opensea/metadata/gold_chest_metadata.json',
    supply: parseEther('500'),
  },
];

module.exports = {
  chests,
};
