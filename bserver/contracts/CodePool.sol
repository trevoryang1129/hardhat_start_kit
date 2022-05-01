// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Bus.sol";
import "./Ballot.sol";
contract CodePool {
    function getBusCode(address _owner,string memory _model) public pure returns (bytes memory code)
    {
        bytes memory code_data=abi.encodePacked(type(Bus).creationCode,abi.encode(_owner,_model));
        return code_data;
    }
    function getBallotCode(bytes32[] memory proposalNames,address _chairperson,string memory _title) external pure returns (bytes memory) {
        bytes memory bytecode = type(Ballot).creationCode;
        return abi.encodePacked(bytecode,abi.encode(proposalNames,_chairperson,_title));
    }

}