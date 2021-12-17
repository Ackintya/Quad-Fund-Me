    // SPDX-License-Identifier: GPL-3.0
    pragma solidity >=0.4.22 <0.9.0;

    import "./Project.sol";
    import "./Pool.sol";

    contract QFunding{

    event Create(address creator,string name);
    address owner;
    uint poolcount;
    Pool sponsorPool;
    Pool[] listedpools;

    //modifier to allow access only to the owner.
    modifier isOwner() {
        require(msg.sender == owner, "Cannot allow access other than owner");
        _;
    }
   
   //initializes the owner of the contract and the sponsor pool contract and currentState of the
   //contract to initialized.
   constructor () public {
       owner = msg.sender; 
   }
   
   //here the pool implementation is such that pools participating in the funding is controlled
   //by the Funding organizers
   function createPool(string memory name,address creator) public payable  {
       //Project newProject = new Project(projectOwner, name, imag, des);
       poolcount++;
       sponsorPool = new Pool(poolcount,name,creator);
       listedpools.push(sponsorPool);
       sponsorPool.recieveToPool{value:msg.value}();

       emit Create(creator,name);
   }
   
    function listPools() public view returns(Pool[] memory){
    return listedpools;
    }

    function payoutpools(uint poolsID) public
    {   
        require(poolsID<=poolcount);
        listedpools[poolsID].calandPayoutMatch();
        listedpools[poolsID]=listedpools[poolcount];
        listedpools.pop();
    }
}