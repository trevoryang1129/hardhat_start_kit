/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LJM, LJMInterface } from "../LJM";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526040518060400160405280600981526020017f4c4a4d20546f6b656e000000000000000000000000000000000000000000000081525060009080519060200190620000519291906200015d565b506040518060400160405280600381526020017f4c4a4d0000000000000000000000000000000000000000000000000000000000815250600190805190602001906200009f9291906200015d565b506012600260006101000a81548160ff021916908360ff160217905550348015620000c957600080fd5b5060405162001117380380620011178339818101604052810190620000ef91906200023b565b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160038190555080600260006101000a81548160ff021916908360ff16021790555050506200032c565b8280546200016b9062000293565b90600052602060002090601f0160209004810192826200018f5760008555620001db565b82601f10620001aa57805160ff1916838001178555620001db565b82800160010185558215620001db579182015b82811115620001da578251825591602001919060010190620001bd565b5b509050620001ea9190620001ee565b5090565b5b8082111562000209576000816000905550600101620001ef565b5090565b6000815190506200021e81620002f8565b92915050565b600081519050620002358162000312565b92915050565b600080604083850312156200024f57600080fd5b60006200025f858286016200020d565b9250506020620002728582860162000224565b9150509250929050565b6000819050919050565b600060ff82169050919050565b60006002820490506001821680620002ac57607f821691505b60208210811415620002c357620002c2620002c9565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b62000303816200027c565b81146200030f57600080fd5b50565b6200031d8162000286565b81146200032957600080fd5b50565b610ddb806200033c6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad9190610b10565b60405180910390f35b6100d060048036038101906100cb91906109d3565b61028e565b6040516100dd9190610af5565b60405180910390f35b6100ee610402565b6040516100fb9190610b72565b60405180910390f35b61011e60048036038101906101199190610984565b610408565b60405161012b9190610af5565b60405180910390f35b61013c610678565b6040516101499190610b8d565b60405180910390f35b61016c6004803603810190610167919061091f565b61068b565b6040516101799190610b72565b60405180910390f35b61018a6106a3565b6040516101979190610b10565b60405180910390f35b6101ba60048036038101906101b591906109d3565b610731565b6040516101c79190610af5565b60405180910390f35b6101ea60048036038101906101e59190610948565b6108d0565b6040516101f79190610b72565b60405180910390f35b6000805461020d90610cd6565b80601f016020809104026020016040519081016040528092919081815260200182805461023990610cd6565b80156102865780601f1061025b57610100808354040283529160200191610286565b820191906000526020600020905b81548152906001019060200180831161026957829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610312576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161030990610b32565b60405180910390fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103f09190610b72565b60405180910390a36001905092915050565b60035481565b600081600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156104c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c090610b52565b60405180910390fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105559190610c1a565b9250508190555081600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105ab9190610c1a565b9250508190555081600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106019190610bc4565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106659190610b72565b60405180910390a3600190509392505050565b600260009054906101000a900460ff1681565b60056020528060005260406000206000915090505481565b600180546106b090610cd6565b80601f01602080910402602001604051908101604052809291908181526020018280546106dc90610cd6565b80156107295780601f106106fe57610100808354040283529160200191610729565b820191906000526020600020905b81548152906001019060200180831161070c57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156107b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ac90610b32565b60405180910390fd5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108049190610c1a565b9250508190555081600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461085a9190610bc4565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516108be9190610b72565b60405180910390a36001905092915050565b6004602052816000526040600020602052806000526040600020600091509150505481565b60008135905061090481610d77565b92915050565b60008135905061091981610d8e565b92915050565b60006020828403121561093157600080fd5b600061093f848285016108f5565b91505092915050565b6000806040838503121561095b57600080fd5b6000610969858286016108f5565b925050602061097a858286016108f5565b9150509250929050565b60008060006060848603121561099957600080fd5b60006109a7868287016108f5565b93505060206109b8868287016108f5565b92505060406109c98682870161090a565b9150509250925092565b600080604083850312156109e657600080fd5b60006109f4858286016108f5565b9250506020610a058582860161090a565b9150509250929050565b610a1881610c60565b82525050565b6000610a2982610ba8565b610a338185610bb3565b9350610a43818560208601610ca3565b610a4c81610d66565b840191505092915050565b6000610a64601583610bb3565b91507f62616c616e636520696e7375636966666963656e7400000000000000000000006000830152602082019050919050565b6000610aa4601783610bb3565b91507f616c6c6f77616e636520696e7375636966666963656e740000000000000000006000830152602082019050919050565b610ae081610c8c565b82525050565b610aef81610c96565b82525050565b6000602082019050610b0a6000830184610a0f565b92915050565b60006020820190508181036000830152610b2a8184610a1e565b905092915050565b60006020820190508181036000830152610b4b81610a57565b9050919050565b60006020820190508181036000830152610b6b81610a97565b9050919050565b6000602082019050610b876000830184610ad7565b92915050565b6000602082019050610ba26000830184610ae6565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610bcf82610c8c565b9150610bda83610c8c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610c0f57610c0e610d08565b5b828201905092915050565b6000610c2582610c8c565b9150610c3083610c8c565b925082821015610c4357610c42610d08565b5b828203905092915050565b6000610c5982610c6c565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015610cc1578082015181840152602081019050610ca6565b83811115610cd0576000848401525b50505050565b60006002820490506001821680610cee57607f821691505b60208210811415610d0257610d01610d37565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b610d8081610c4e565b8114610d8b57600080fd5b50565b610d9781610c8c565b8114610da257600080fd5b5056fea26469706673582212205eea5c9e938b55945b2fef40dbd183c2ada4981a787799ace2940c04fc3eae4264736f6c63430008000033";

export class LJM__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _totalSupply: BigNumberish,
    _decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LJM> {
    return super.deploy(
      _totalSupply,
      _decimals,
      overrides || {}
    ) as Promise<LJM>;
  }
  getDeployTransaction(
    _totalSupply: BigNumberish,
    _decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_totalSupply, _decimals, overrides || {});
  }
  attach(address: string): LJM {
    return super.attach(address) as LJM;
  }
  connect(signer: Signer): LJM__factory {
    return super.connect(signer) as LJM__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LJMInterface {
    return new utils.Interface(_abi) as LJMInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): LJM {
    return new Contract(address, _abi, signerOrProvider) as LJM;
  }
}