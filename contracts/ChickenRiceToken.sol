// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract ChickenRiceToken is ERC20, ERC20Permit{
    address public admin;
    
    constructor() ERC20('ChickenRiceToken', 'CRT') ERC20Permit("ChickenRiceToken"){
        _mint(msg.sender, 10000 *10 **18);
        admin = msg.sender;
    }
    
    function mint(address to, uint amount) external{
        require(msg.sender == admin, "Only admin allowed");
        _mint(to, amount);
    }
    
    function burn(uint amount) external{
        _burn(msg.sender, amount);
    }
}