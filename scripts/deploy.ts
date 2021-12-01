// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Qfund = await ethers.getContractFactory("QFunding");
  const market = await Qfund.deploy();
  await market.deployed();

  
  await market.createProject('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',"Google Images",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');
  await market.createProject('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',"Google's best chrome logo",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');
  await market.createProject('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',"Water in the house",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');

  console.log("Qfunding deployed to:", market.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
