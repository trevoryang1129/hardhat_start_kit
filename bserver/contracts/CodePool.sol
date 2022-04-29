// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Bus.sol";
contract CodePool {
    function getBusCode(address _owner,string memory _model) public pure returns (bytes memory code)
    {
        bytes memory code_data=abi.encodePacked(type(Bus).creationCode,abi.encode(_owner,_model));
        return code_data;
    }
}