import "@nomiclabs/hardhat-waffle";
require('dotenv').config
import fs from 'fs';

const privateKey = process.env.private_key|| "01234567890123456789"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://ropsten.infura.io/v3/"+ process.env.infura_key,
      accounts: [privateKey]
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