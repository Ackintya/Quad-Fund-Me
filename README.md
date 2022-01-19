# QuadFundme
Live Url: https://ackintya-blockchain-developer-bootcamp-final-project.vercel.app/

## Description
Quadratic Funding is the mathematically optimal way to fund public goods in a democratic community.
This work aims to give a platform for projects to get funding from common people as well as sponsor pool 

This is implemented by system of three contracts, Qfunding.sol, Pool.sol and Project.sol

Qfunding.sol: It is the market for all the pools and projects you see, it has access to create and payout pools 

Pool.sol: It is the implementation of pool structure, which can have any number of projects. It has access to create and calculate payout for projects.

Project.sol: It is the implementation of project structure. It has name,owner,image and description of the project 

## Directory structure

    .
    ├── contracts
    ├── artifacts
    ├── public
    ├── scripts
    ├── src
    ├── test
    ├── package-lock.json
    ├── package.json
    ├── deployed_address.txt
    ├── avoiding_common_attacks.md
    ├── design_pattern_decisions.md
    ├── LICENSE
    └── README.md


## Deploy project locally:

### Environmnet

- Node.js v16.9.1
- npm 7.21.1
- Hardhat
- React

### Dependencies

- @nomiclabs/hardhat-ethers
- @nomiclabs/hardhat-waffle
- chai
- dotenv
- ethereum-waffle
- ethers
- hardhat
- react
- react-dom
- react-scripts
- web-vitals

### Instructions

1. Clone from `https://github.com/ackintya/blockchain-developer-bootcamp-final-project.git`
2. `npm install` to install all dependencies
3. `npx hardhat test` to perform unit tests
   NOTE: please comment out Ropsten network block in `hardhat.config.js` before test.
4. `npx hardhat node` to start the local test node
5. `npx hardhat run scripts/deploy.ts --network localhost` to deploy the contract to the test network
6. `npm start` to start React server populated at http://localhost:3000/

## Final

Thank you Consensys Team. Appreciate the quality content and teaching i experienced these few months, very much enjoyed it!