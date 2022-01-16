// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Qfund = await ethers.getContractFactory("Qfunding");
  const Pool= await ethers.getContractFactory("Pool");
  const Project= await ethers.getContractFactory("Project");

  const market = await Qfund.deploy();
  await market.deployed();
  //await market.createPool("water",'0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',{value:ethers.utils.parseEther("10")});
  await market.createPool("Healthcare",'0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',{value:ethers.utils.parseEther("5")});
  await market.createPool("Metaverse",'0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',{value:ethers.utils.parseEther("0.6")});
  const pools=await market.listPools();
  console.log(pools[0]);

  const pool=Pool.attach(pools[0]);

  /*
const transactionHash = await owner.sendTransaction({
  to: pools[0],
  value: ethers.utils.parseEther("100.0"), // Sends exactly 1.0 ether
});
*/

 //await pool.createProject("Google Images",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');
  await pool.createProject("Waterlife",'https://www.svgrepo.com/show/80481/water-drop.svg','Save life using Water therapy. This therapy is carefully designed to enhance blood circulation and improve muscle fluidity, We are currently looking for funding upwards of 1000$');
  await pool.createProject("VaccineCart",'https://www.svgrepo.com/show/76152/vaccine.svg','VaccineCart is an online accessible Vaccine On wheels modeled project that aims to provide accessibility to vaccines and general medicine without having to go to hospitals. The Vaccine will be delivered near home with proper monitoring and relevant procedures shall be followed');
  const prjects=await pool.listprojects();
  const project=Project.attach(prjects[0]);
  await project.contribute({value:ethers.utils.parseEther("0.2")});
  const Pool2= await ethers.getContractFactory("Pool");
  const pool2=Pool2.attach(pools[1]);
  await pool2.createProject("MetaFarm",'https://www.svgrepo.com/show/86053/farm.svg','Metafarm is a metaverse all about farms, countryside and farming. It is built for people who want to relax after their daily hectic schedule in a serene, countryside environment');
/*
  await pools[0].createProject('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',"Google's best chrome logo",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');
  await market.createProject('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',"Water in the house",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');
*/
  console.log("Qfunding deployed to:", market.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
