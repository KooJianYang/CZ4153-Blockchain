// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract TokenTransfer{
    
  ERC20Permit public token;

  constructor(address _token) {
    token = ERC20Permit(_token);    
  }
      

  function metaTransfer(
      address senderAddress, 
      address recipientAddress, 
      uint256 tokenValue, 
      uint256 tokenReward
    ) public returns (bool) {
        
        
        //make sure signer doesn't come back as 0x0
        require(senderAddress != address(0), "invalid-address-0");
        
        //requires user to have permitted this contract to transfer token on users' behalf
        token.transferFrom(senderAddress, recipientAddress, tokenValue);
        
        if(tokenReward>0){
          token.transferFrom(senderAddress, msg.sender, tokenReward);
        }
  }

}