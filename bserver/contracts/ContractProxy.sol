// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ContractProxy {
    event Deploy(address);
    //使用create 动态发布合约
    //https://ethereum.stackexchange.com/questions/3285/how-to-get-return-values-when-a-non-view-function-is-called
   /*  It is not currently possible to return values from functions which modify the blockchain. 
    To receive a return value, you can mark functions as "pure" or "view".
    For state-changing functions, the only way to "return" information is by using Solidity Events, 
    which coalesce as LOG opcodes in the Ethereum Virtual Machine. */
    function deploy(bytes memory _code) external payable {
        address addr;
        assembly {
            addr := create(callvalue(),add(_code,0x20),mload(_code))
            if iszero(extcodesize(addr))
            {
                revert(0,0)
            }
        }
        emit Deploy(addr);
    }
    //create2 版本
    function deploy2(bytes memory _code,bytes32 _salt) external payable
    {
        address addr;
        assembly {
            addr := create2(callvalue(),add(_code,0x20),mload(_code),_salt)
            if iszero(extcodesize(addr))
            {
                revert(0,0)
            }
        }
        emit Deploy(addr);
    }
}