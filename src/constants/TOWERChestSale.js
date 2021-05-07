const {BigNumber, constants} = require('ethers');
const {AddressZero} = constants;
const {formatBytes32String, parseEther} = require('ethers').utils;
const {chests} = require('./TOWERChests');

const skuInfos = [
  {
    deployment: 'TOWERChest-BRNZ',
    sku: formatBytes32String('TWR.BRNZ'),
    supply: BigNumber.from('3500'),
    price: parseEther('1800'),
  },
  {
    deployment: 'TOWERChest-SLVR',
    sku: formatBytes32String('TWR.SLVR'),
    supply: BigNumber.from('2500'),
    price: parseEther('4800'),
  },
  {
    deployment: 'TOWERChest-GOLD',
    sku: formatBytes32String('TWR.GOLD'),
    supply: BigNumber.from('500'),
    price: parseEther('12800'),
  },
];

const skusCapacity = chests.length;
const tokensPerSkuCapacity = BigNumber.from('1'); // TOWER token only
const maxQuantityPerPurchase = BigNumber.from('3');
const notificationReceiver = AddressZero;

module.exports = {
  skuInfos,
  skusCapacity,
  tokensPerSkuCapacity,
  maxQuantityPerPurchase,
  notificationReceiver,
};
