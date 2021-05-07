const TOWER_deployer = {
  default: 0,
  1: '0x09d3a896D834c5DbdD8ad236eae9c910E0273E6E',
  4: '0xB553C4B21966123d7f8c02Ca6909c110260052E8',
};

const TOWER_holder = {
  default: 0,
  1: '0xE82896A9497335a0575dd66E8Cc7103bAfCc8841',
  4: '0xE82896A9497335a0575dd66E8Cc7103bAfCc8841',
};

const TOWERChests_holder = {
  default: 1, // mainnet: 0x861C2F7a406CCb81B49501f5559D9F77b0bd3b9A
};

const TOWERChestSale_payoutWallet = {
  default: '0x64eD31bFCeF24226B4997a5849D2AD9E5751d4D7',
};

module.exports = {
  namedAccounts: {
    TOWER_deployer,

    // TOWER
    TOWER_owner: TOWER_deployer,
    TOWER_holder,

    // TOWER Chests
    TOWERChests_deployer: TOWER_deployer,
    TOWERChests_holder,

    // TOWER Chest Sale
    TOWERChestSale_deployer: TOWER_deployer,
    TOWERChestSale_payoutWallet,
  },
  namedGroups: {},
};
