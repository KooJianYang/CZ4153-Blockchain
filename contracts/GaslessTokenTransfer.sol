// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract GaslessTokenTransfer{
    
  ERC20Permit public token;
  uint256 allowance;

  constructor(address _token) {
    token = ERC20Permit(_token);    
  }
      

  function metaTransfer(
      address senderAddress, 
      address recipientAddress, 
      uint256 tokenValue, 
      uint256 tokenReward,
      uint256 tokenTotal,
      uint256 deadline,
      uint8 v,
      bytes32 r,
      bytes32 s
    ) public returns (bool) {

        //make sure signer doesn't come back as 0x0
        require(senderAddress != address(0), "invalid-address-0");
        
        //permit this smart contract to transfer token on user behalf using user signature
        token.permit(senderAddress, address(this), tokenTotal, deadline, v, r, s);

        //check that allowance value is equal to Value plus Reward
        require( token.allowance(senderAddress, address(this)) == (tokenValue + tokenReward) , "allowance do not match" ); 

        //transfer token from sender to recipient
        token.transferFrom(senderAddress, recipientAddress, tokenValue);

        //transfer token reward specified from sender to relayer
        if (tokenReward>0) {
          token.transferFrom(senderAddress, msg.sender, tokenReward);
        }
  }

}