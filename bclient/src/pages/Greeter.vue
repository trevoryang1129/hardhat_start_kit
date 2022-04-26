<template>
  <div>
    <p> greeting 值为: {{ greeting }}</p>
    <q-btn @click="read_greeting" label="读取greeting"></q-btn> <br>
    <q-input v-model="new_greeting"></q-input>
    <q-btn @click="write_greeting" label="写入greeting"></q-btn>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref,toRef,Ref} from 'vue';
import { ethers } from 'ethers'
import {Greeter} from "src/typechain/Greeter"
import GreeterAbi from 'src/artifacts/contracts/Greeter.sol/Greeter.json'
import contract_address from "common/contract_address.json"
export default defineComponent({
  name: 'CompositionComponent',
  setup(props) {
    let contract_inst:Greeter=new ethers.Contract(contract_address.Greeter, GreeterAbi.abi, window.web3_provider.getSigner()) as Greeter
    return {
      greeting:ref(""),
      new_greeting:ref(""),
      contract_address:contract_address.Greeter,
      contract_inst:contract_inst
    }
  },
  methods:
  {
     async  read_greeting()
      {
         if (typeof window.ethereum !== 'undefined') 
        {
            try {
                const greet_str = await this.contract_inst.greet()
                this.greeting=greet_str
                console.log('greet_str: ', greet_str)
            } catch (err) {
                console.log("Error: ", err)
            }
        }
      },
      async write_greeting()
      {
        if (typeof window.ethereum !== 'undefined') 
        {
            try {
                const transaction = await this.contract_inst.setGreeting(this.new_greeting)
                const res=await transaction.wait()
                console.log('transaction return: ', res)
            } catch (err) {
                console.log("Error: ", err)
            }
        }
      }
  }
});
</script>