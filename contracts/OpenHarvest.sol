// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract OpenHarvest {
    IERC20 public token;
    address private owner;

    uint public count = 0;
    bool public isGreenLightOn = false;

    event Increment(uint value);
    event Decrement(uint value);

    event ToggleGreenLight(bool isGreenLightOn);

    constructor() {
        token = IERC20(0x5C7c905B505f0Cf40Ab6600d05e677F717916F6B);
        owner = msg.sender;
    }

    function getUserTokenBalance() public view returns(uint256){ 
       return token.balanceOf(msg.sender);
    }

    function getAllowance() public view returns(uint256){
       return token.allowance(msg.sender, address(this));
    }

    function getCount() public view returns (uint) {
        return count;
    }

    function getGreenLightSetting() public view returns (bool) {
        return isGreenLightOn;
    }

    function increment() public {
        count++;
        emit Increment(count);
    }

    function decrement() public {
        count--;
        emit Decrement(count);
    }

    function toggleGreenLight() public  {
        uint actionCost = 5 * 10 ** 18;
        require(getAllowance() >= actionCost, string(abi.encodePacked("Allowance: ", Strings.toString(getAllowance()))));
        token.transferFrom(msg.sender, address(this), actionCost);

        isGreenLightOn = !isGreenLightOn;
        emit ToggleGreenLight(isGreenLightOn);
    }
}