// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import href from "hardhat"
import {Signer,BigNumber} from "ethers"
import fs from "fs"
let all_contract_address:{[i:string]:string}={}
let all_deploy_contract:{[k:string]:any[]}={
  "Greeter":["Hello, world!"],
  "BusFactory":[],
  "CodePool":[],
  "ContractProxy":[]
}
let all_deployed_contract_inst:{[k:string]:any}={}
//这就不需要每次发布都重新写一个新的方法
async function deploy_all_contract()
{
  let owner:Signer,addr1:Signer,addr2:Signer
  [owner, addr1, addr2] = await ethers.getSigners();
  let contract_deployer_address=await owner.getAddress()
  console.log("Deploy Contract by ",contract_deployer_address)
  let contract_names=[]
  for(let k in all_deploy_contract)
  {
    contract_names.push(k)
  }
  for await (const k of contract_names) 
  {
    const contract_fact = await ethers.getContractFactory(k);
    let contract_inst = await contract_fact.deploy(...all_deploy_contract[k]);
    all_contract_address[k]= contract_inst.address
    all_deployed_contract_inst[k]=contract_inst
    console.log("contract:",k,'deploy to :',contract_inst.address);
  }
}
async function main() 
{

  await deploy_all_contract()
  fs.writeFile("../bclient/src/common/contract_address.json",JSON.stringify(all_contract_address),(error)=>{
    if(error)
    {
      console.log("contract_address write error ",error)
    }
    else
    {
      console.log("contract_address write success")
    }
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
