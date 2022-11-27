import "@nomiclabs/hardhat-waffle";

const privateKey = 'cbdee3085303b7bfd1b98d13685a8bd8ef877048a7c0c2df6f01e07c1ca4c21e'

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 11155111
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/cdb43937d50545f8a929fca4f496bfd3",
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