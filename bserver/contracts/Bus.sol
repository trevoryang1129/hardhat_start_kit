// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bus {
    address public owner;
    string public model;
    address public busAddr;
    constructor(address _owner, string memory _model) payable {
        owner = _owner;
        model = _model;
        busAddr = address(this);
    }
    function setOwner(address _owner) public {
        owner = _owner;
    }
    //set model
    function setModel(string memory _model) public{
        model = _model;
    }
}