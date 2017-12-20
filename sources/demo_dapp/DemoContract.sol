pragma solidity ^0.4.0;

/*
Author: Robert Lie (mobilefish.com)
More information:
https://www.mobilefish.com/developer/blockchain/blockchain_quickguide_ethereum_tools.html

To interact with this contract use the demonstration Ethereum Dapp:
https://www.mobilefish.com/download/ethereum/DemoDapp.html
*/

contract Mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function Mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }

    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }
}

contract DemoContract is Mortal{
    uint storedVal;
    string storedText;
    mapping(address => uint) public balances;

    event LogDeposit(address indexed accountAddress, uint amount, uint balance);
    event LogWithdraw(address indexed accountAddress, uint amount, uint balance);

    function DemoContract(uint _storedVal, string _storedText) payable {
      storedVal = _storedVal;
      storedText = _storedText;
      balances[msg.sender] += msg.value;
    }

    function deposit() payable {
      balances[msg.sender] += msg.value;
      LogDeposit(msg.sender, msg.value, balances[msg.sender]);
    }

    function withdraw(uint withdrawAmount) {
      if(balances[msg.sender] >= withdrawAmount) {
        balances[msg.sender] -= withdrawAmount;
        msg.sender.transfer(withdrawAmount);
      }
      LogWithdraw(msg.sender, withdrawAmount, balances[msg.sender]);
    }

    function showHello() constant returns (string) {
        return "你好";
    }

    function setStoredVal(uint _storedVal) {
        storedVal = _storedVal;
    }

    function increaseStoredVal(uint _addedVal) onlyOwner {
        storedVal += _addedVal;
    }

    function setStoredText(string _storedText) {
        storedText = _storedText;
    }

    function getStoredText() constant returns (string) {
        return storedText;
    }

    function getStoredVal() constant returns (uint) {
        return storedVal;
    }
}
