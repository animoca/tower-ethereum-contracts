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

module.exports = {
  namedAccounts: {
    TOWER_deployer,

    // TOWER
    TOWER_owner: TOWER_deployer,
    TOWER_holder,
  },
  namedGroups: {},
};
