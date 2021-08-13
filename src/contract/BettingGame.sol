pragma solidity 0.6.6;

import "hardhat/console.sol";

contract BettingGame {
    
  /** !UPDATE
   * 
   * assign an aggregator contract to the variable.
   */
    
  uint256 internal fee;
  uint256 public randomResult;
  
  // //keyHash - one of the component from which will be generated final random value by Chainlink VFRC.
  // bytes32 constant internal keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
  
  uint256 public gameId;
  uint256 public lastGameId;
  address payable public admin;
  mapping(address => uint256) pool; 

  struct Game{
    uint256 id;
    uint256 bet;
    uint256 amount;
    address payable player;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, 'caller is not the admin');
    _;
  }
  
  event Withdraw(address admin, uint256 amount);
  event Received(address indexed sender, uint256 amount);
  event Result(uint256 id, uint256 bet,  uint256 amount, address player, uint256 winAmount, uint256 randomResult, uint256 time);
  
  // /**
  //  * Constructor
  //  */
  constructor() public {
    fee = 0.1 * 10 ** 18; // 0.1 ONE
    admin = payable(msg.sender);
  }

    /* Allows this contract to receive payments */
  receive() external payable {
    emit Received(msg.sender, msg.value);
  }
  
  function minBet() public pure returns (uint){
    return 10 ** 17;
  }
  /**
   * Taking bets function.
   * By winning, user 2x his betAmount.
   * Chances to win and lose are the same.
   */
  function play(uint256 bet) public payable returns (bool) {

    /** !UPDATE
     * 
     * Checking if msg.value is higher or equal than 0.1 ONE.
    */
    require(msg.value>= minBet(), 'Bet must be at least 0.1 ONE');
      
    //bet=0 is low, refers to 1-3  dice values
    //bet=1 is high, refers to 4-6 dice values
    require(bet<=1, 'Betting values can be only 0 or 1');

    //Vault balance must be greater than 2 times the sent amount.
    require(address(this).balance>=msg.value*2, 'Insufficent vault balance');
    
    //each bet has unique id
    Game memory game = Game(gameId, bet, msg.value, payable(msg.sender));
    
    //increase gameId for the next bet
    gameId = gameId+1;

    //Play a game
    uint256 random = rollDice();
    bool win = ((random>=4 && bet==1) || (random<4&& bet==0));
    uint winAmount = (win)? 2* game.amount : 0;
        
    game.player.transfer(winAmount);

    emit Result(game.id, game.bet, game.amount, game.player, winAmount, random, block.timestamp);

    return true;
  }  

  
  /**
    Simulates a dice roll with the Harmony VRF function.
    Returns a value between 1 and 6 (both inclusive).
   */
  function rollDice() internal view returns (uint256){
    return (uint256(vrf()) % 6 ) +1;
  }

  /**
  * Harmony's VRF function.
 */
  function vrf() internal view returns (bytes32 result) {
  	bytes32 input;
  	assembly {
  		let memPtr := mload(0x40)
        if iszero(staticcall(not(0), 0xff, input, 32, memPtr, 32)) {
        	invalid()
        }
        result := mload(memPtr)
    }
  }
  
  /**
   * Withdraw ONE from this contract (admin option).
   */
  function withdrawONE(uint256 amount) external payable onlyAdmin {
    require(address(this).balance>=amount, 'Contract has insufficent balance');
    admin.transfer(amount);
    emit Withdraw(admin, amount);
  }
}