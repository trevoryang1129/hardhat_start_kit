// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./Bus.sol";
contract BusFactory {
    event Log(string,address);
    Bus[] public busList;
    function createBus(address _owner, string memory _model) public {
        Bus bus = new Bus(_owner, _model);
        busList.push(bus);
    }
    function createBus2(address _owner,string memory _model,bytes32 _salt) public 
    {
        Bus bus = (new Bus){salt: _salt}(_owner, _model);
        busList.push(bus);
    }
    function createAndSendEther(address _owner, string memory _model) public payable {
        Bus bus = (new Bus){value: msg.value}(_owner, _model);
        busList.push(bus);
    }
    function create2AndSendEther(address _owner,string memory _model,bytes32 _salt) public payable {
        Bus bus = (new Bus){value: msg.value, salt: _salt}(_owner, _model);
        busList.push(bus);
    }
    function getBus(uint _index) public view returns (address owner,string memory model,address bus_addr,uint balance)
    {
        Bus bus = busList[_index];
        return (bus.owner(), bus.model(), bus.busAddr(), address(bus).balance);
    }
    function calcualteAddressAsm(address _owner, string memory _model) public payable
    {
        bytes memory code_data=abi.encodePacked(type(Bus).creationCode,abi.encode(_owner,_model));
        address addr;
        assembly {
            addr := create(callvalue(),add(code_data,0x20),mload(code_data))
            if iszero(extcodesize(addr))
            {
                revert(0,0)
            }
        }
        emit Log("calcualteAddressAsm",addr);
    }
    function calcualteSaltAddress(address _owner,string memory _model,bytes32 _salt) public payable
    {
        bytes memory code_data=abi.encodePacked(type(Bus).creationCode,abi.encode(_owner,_model));
        bytes32 _hash=keccak256(abi.encodePacked(bytes1(0xff),address(this),_salt,keccak256(code_data)));
        address predictedAddress=address(uint160(uint(_hash)));
        emit Log("predictedAddress ",predictedAddress);
        Bus d=new Bus{salt:_salt,value:msg.value}(_owner,_model);
        emit Log("new address with salt ",address(d));
        require(address(d)==predictedAddress);
    }
    function calcualteSaltAddressAsm(address _owner,string memory _model,bytes32 _salt) public payable
    {
        bytes memory code_data=abi.encodePacked(type(Bus).creationCode,abi.encode(_owner,_model));
        address addr;
        assembly {
            addr := create2(callvalue(),add(code_data,0x20),mload(code_data),_salt)
            if iszero(extcodesize(addr))
            {
                revert(0,0)
            }
        }
        emit Log("calcualteSaltAddressAsm",addr);
        selfdestruct(payable(addr));
        Bus d=new Bus{salt:_salt,value:msg.value}(_owner,_model);
        emit Log("new address with salt ",address(d));
        require(address(d)==addr);
    }
}