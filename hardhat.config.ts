import "@nomiclabs/hardhat-waffle";
require('dotenv').config
import fs from 'fs';

const privateKey = 'ca55c3449680f66adf0eb35080a4cd3f292f858251cc4bbd5ab72671a93bd374'

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 3
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/930bd58ef1d0469dbf105654e921eacb",//+ process.env.infura_key,
      accounts: [privateKey],
      gas: 2100000,
        gasPrice: 8000000000,
        saveDeployments: true,
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}