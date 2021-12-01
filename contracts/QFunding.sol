// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

import "./Project.sol";
import "./Pool.sol";

contract QFunding{
   
    enum State {initialized, ongoing, completed}
    
   
    address owner;
    State currentState;
    uint256 public projectcount;
    //uint256 public currentBal;
    Project [] public projectsListed;
    Pool public sponsorPool;
    
    //modifier to allow access only to the owner.
    modifier isOwner() {
        require(msg.sender == owner, "Cannot allow access other than owner");
        _;
    }
    
    //modifier to allow the function to proceed only if contract is in intended state.
    modifier isState(State reqState) {
        require(currentState == reqState, "Contract not in required state");
        _;
    }
   
   //initializes the owner of the contract and the sponsor pool contract and currentState of the
   //contract to initialized.
   constructor () public {
       owner = msg.sender;
       sponsorPool = new Pool();
   }
   
   
   //function to change the currentState variable of the contract based on comparing block timestamp 
   //to constant raiseBy and startRaisingFrom to meet isState modifier requirements. Currently only
   //the owner can change the phase but chainlink keeper can be implemented later to automate the 
   //change state process.
   function changeState(uint state) public isOwner {
    require(state==0||state==1||state==2, "Invalid State");
        if(state == 1){
            currentState=State.ongoing;
        }
        else if(state==2){
        currentState=State.completed;
        }
        else
        currentState=State.initialized;
    }
   
   //here the project implementation is such that projects participating in the funding is controlled
   //by the Funding organizers. If we have to implement it such that anyone can create a project and
   //participate in the funding remove isOwner modifier, remove the address projectOwner variable then
   //instead pass msg.sender to the Project contract instance.
   function createProject(address payable projectOwner, string memory name, string memory imag, string memory des) public isState(State.initialized) {
       Project newProject = new Project(projectOwner, name, imag, des);
       projectcount++;
       projectsListed.push(newProject);
   }
   
   function listprojects() public view isState(State.initialized) returns (Project[] memory)
   {

       return projectsListed;
   }
   
   //this function recieves the square of sum of sqrt of contributions recieved by individual projects 
   //and sums it by iterating over the projectsListed array. It iterates the projectsListed array once 
   //again, calculates the match ratio and calls the payout function in pool contract with the required 
   //arguments. Since this computation requires very much gas this can be computed off chain using
   //chainlink external adapters which can be later implemented.
   function calandPayoutMatch() public isState(State.completed){
       uint sumSquaredSqrtFundsSum;
       uint[] memory matchRatio;
       
       for(uint i = 0; i < projectsListed.length; i++){
           //sumSquaredSqrtFundsSum.add(projectsListed[i].getSquaredSqrtFundsSum());
           sumSquaredSqrtFundsSum += projectsListed[i].getSquaredSqrtFundsSum();
       }
       
       for(uint i = 0; i < projectsListed.length; i++){
           // redundant variable array matchRatio
           matchRatio[i] = projectsListed[i].getSquaredSqrtFundsSum()/sumSquaredSqrtFundsSum;
           sponsorPool.payoutPoolMatch(matchRatio[i], projectsListed[i].owner());
       }
       
   }
}
