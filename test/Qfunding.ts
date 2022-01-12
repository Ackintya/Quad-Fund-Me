import { expect } from "chai";
import { ethers } from "hardhat";

  
describe("Market",async function(){
  let Qfund, qfund,owner

  it("Should return the owner of contract", async function () {  
  //const [owner] = await ethers.getSigners();
  Qfund = await ethers.getContractFactory("QFunding");
  qfund = await Qfund.deploy();
 await qfund.deployed();
 //const Pool= await ethers.getContractFactory("Pool");
 //const Project= await ethers.getContractFactory("Project");
 [owner] = await ethers.getSigners()
  expect(await qfund.getOwner()).to.equal(owner.address);
  //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
  //wait until the transaction is mined
  //await setGreetingTx.wait();
  //expect(await greeter.greet()).to.equal("Hola, mundo!");
})
it("Should return the initial balance of contract", async function () {  
  //const [owner] = await ethers.getSigners();
  Qfund = await ethers.getContractFactory("QFunding");
  qfund = await Qfund.deploy();
  await qfund.deployed();
 [owner] = await ethers.getSigners()
 await qfund.createPool("water",owner.address,{value:ethers.utils.parseEther("10")});
 const pools=await qfund.listPools();
 const Pool= await ethers.getContractFactory("Pool");
  const pool=Pool.attach(pools[0]);
expect(ethers.utils.formatEther( await pool.getContractBalance())).to.equal("10.0");
})

it("Should add the pool to listed pools", async function () {  
  //const [owner] = await ethers.getSigners();
  Qfund = await ethers.getContractFactory("QFunding");
  qfund = await Qfund.deploy();
  await qfund.deployed();
 [owner] = await ethers.getSigners()
 await qfund.createPool("water",owner.address,{value:ethers.utils.parseEther("10")});
 await qfund.createPool("water",owner.address,{value:ethers.utils.parseEther("10")});
 await qfund.createPool("water",owner.address,{value:ethers.utils.parseEther("10")});
 const pools=await qfund.listPools();
expect(pools.length).to.equal(3);
})
})

