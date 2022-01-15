    // SPDX-License-Identifier: GPL-3.0
    pragma solidity >=0.4.22 <0.9.0;

    import "./Project.sol";
    import "./Pool.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";

    contract Qfunding  is Ownable {

    event Create(address creator,string name);
    address public Owner;
    uint public poolcount;
    Pool sponsorPool;
    Pool[] listedpools;

   //initializes the owner of the contract and the sponsor pool contract and currentState of the
   //contract to initialized.
   constructor () public {
    Owner = msg.sender; 
   }
   
   //helper function for fetching owner
   function getOwner() public view returns(address )
   {
       return Owner;
   }

   //here the pool implementation is such that pools participating in the funding is controlled
   //by the Funding organizers
   function createPool(string memory name,address creator) public payable returns (Pool) {
       //Project newProject = new Project(projectOwner, name, imag, des);
       poolcount++;
       sponsorPool = new Pool(poolcount,name,creator);
       listedpools.push(sponsorPool);
       sponsorPool.recieveToPool{value:msg.value}();
       emit Create(creator,name);
       return sponsorPool;
   }

   //helper function for listing pools
    function listPools() public view returns(Pool[] memory){
    return listedpools;
    }

//initating payout for the pools from the market
    function payoutpools(uint poolsID) public onlyOwner
    {   
        require(poolsID<poolcount,"Pool does not exist");
        listedpools[poolsID].calandPayoutMatch();
        listedpools[poolsID]=listedpools[poolcount-1]; //removing the pool from the list
        listedpools.pop();
    }
}