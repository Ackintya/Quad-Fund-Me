// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;


contract Pool {

    enum State {initialized, ongoing, completed}
    
   
    State currentState;
    uint poolValue;
    address owner;
    mapping(address => uint) sponsorFunds;
    
    //modifier to allow access only to the owner
    modifier isOwner() {
        require(msg.sender == owner, "Cannot allow access other than owner");
        _;
    }
    
    //modifier to allow the function to proceed only if contract is in intended state
    modifier isState(State reqState) {
        require(currentState == reqState, "Contract not in required state");
        _;
    }
    
    //initializes the owner of the contract and currentState of the contract to initialized.
    constructor () public {
        owner = msg.sender;
        currentState = State.initialized;
    }
    
    //function to change the currentState variable of the contract based on comparing block timestamp 
    //to constant raiseBy and startRaisingFrom to meet isState modifier requirements. Currently only
    //the owner can change the phase but chainlink keeper can be implemented later to automate the 
    //change state process.
    //TODO check the access specifier
   function changeState() public isOwner {
        currentState=State.completed;
    }
 
    //function to recieve funds from sponsors to make up the pool
    function recieveToPool () public payable {
        uint amountRecieved = msg.value;
        
            sponsorFunds[msg.sender] = sponsorFunds[msg.sender] + amountRecieved;
        
        //poolValue redundatn as same can be achieved by this.balance
        poolValue += amountRecieved;
    }
    
    //function to pay the project owner his match by multiplying the match ratio with the total poolValue
    function payoutPoolMatch(uint matchRatio, address payable projectOwner) public payable isOwner {
        projectOwner.transfer(matchRatio*poolValue);
    }
 
 
}