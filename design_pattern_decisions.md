# Design patterns

## Inter-Contract Execution

Qfunding contract calls Pool contract by import `./Pool.sol` and initialise Pool.sol owner,id and name by the constructor. Using `payoutpools` function as a pointer to call `calandPayoutMatch` function from Qfunding contract. Similarly Pool contract calls Project contract by import `./Project.sol` and initialise Project.sol image,description,owner and name by the constructor

## Inheritance and Interfaces

Both Pool and Qfunfing contract inherit Ownable contract module from @OpenZeppelin, and it makes available the modifier onlyOwner, which can be applied to functions to restrict their use to the owner who deployed the contract by default.
