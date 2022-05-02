// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract LJM 
{
    string public name="LJM Token";
    string public symbol="LJM";
    uint8 public decimals=18;
    uint256 public totalSupply;
    mapping(address=>mapping(address => uint256)) public allowance;
    mapping(address => uint) public balanceOf;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    constructor(uint256 _totalSupply,uint8 _decimals)
    {
        balanceOf[msg.sender]=_totalSupply;
        totalSupply=_totalSupply;
        decimals=_decimals;
    }
    function transfer(address _to, uint256 _value) public returns (bool success)
    {
        require(balanceOf[msg.sender]>=_value,"balance insucifficent");
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }
    function approve(address _spender, uint256 _value) public returns (bool success)
    {
        require(balanceOf[msg.sender]>=_value,"balance insucifficent"); 
        allowance[msg.sender][_spender]=_value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    {
        require(allowance[_from][msg.sender]>=_value,"allowance insucifficent");
        allowance[_from][msg.sender]-=_value;
        balanceOf[_from]-=_value;
        balanceOf[_to]+=_value;
        emit Transfer(_from,_to,_value);
        return true;
    }
}