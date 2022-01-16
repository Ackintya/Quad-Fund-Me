import { expect } from "chai";
import { ethers } from "hardhat";

  
describe("Pool",async function(){
  let Qfund, qfund,Pool,pool

it("Should return the initial balance of project", async function () {  
  const [owner] = await ethers.getSigners();
  Pool = await ethers.getContractFactory("Pool");
  pool = await Pool.deploy(1,'Water',owner.address);
  await pool.deployed();
  await pool.createProject("Waterfront lighthouse",'https://ap-21.com/wp-content/plugins/elementor/assets/images/placeholder.png','Lighthouse.com');
 const projs=await pool.listprojects();
 //const Pool= await ethers.getContractFactory("Pool");
  //const pool=Pool.attach(pools[0]);
  const Project= await ethers.getContractFactory("Project");
  const project=Project.attach(projs[0]);
expect(ethers.utils.formatEther(await project.getProjectBalance())).to.equal("0.0");
})

it("Should payout to all the projects", async function () {  

 const Qfund = await ethers.getContractFactory("Qfunding");
  const Pool= await ethers.getContractFactory("Pool");
  const Project= await ethers.getContractFactory("Project");
  let [owner,add1,add2] = await ethers.getSigners()

  const market = await Qfund.deploy();
  await market.deployed();
  await market.createPool("water",owner.address,{value:ethers.utils.parseEther("1000")});
  await market.createPool("water",owner.address,{value:ethers.utils.parseEther("1000")});
  const pools=await market.listPools();

  const pool=Pool.attach(pools[0]);

  /*
const transactionHash = await owner.sendTransaction({
  to: pools[0],
  value: ethers.utils.parseEther("100.0"), // Sends exactly 1.0 ether
});
*/

  await pool.createProject("Google Images",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');
  await pool.createProject("Google Images",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');
  await pool.createProject("Google Images",'https://imgr.search.brave.com/eBzLoRzDLEXJMGknWlnYhamybou0fCiY07KP6PLKu3U/fit/1200/1080/ce/1/aHR0cDovL3d3dy5w/aXhlbHN0YWxrLm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC9Hb29nbGUt/V2FsbHBhcGVyLUlt/YWdlcy1IRC1kb3du/bG9hZC5qcGc','Google Images');
  const prjects=await pool.listprojects();
  let project=Project.attach(prjects[0]);
  await project.contribute({value:ethers.utils.parseEther("100")});
  project=Project.attach(prjects[1]);
  await project.contribute({value:ethers.utils.parseEther("100")});
  project=Project.attach(prjects[2]);
  await project.contribute({value:ethers.utils.parseEther("100")});
  const balBefore=Math.round(parseFloat(ethers.utils.formatEther(await owner.getBalance())));
  await market.payoutpools(0);
  expect(Math.round(parseFloat(ethers.utils.formatEther(await owner.getBalance())))-balBefore).to.equal(1000);
})
})
