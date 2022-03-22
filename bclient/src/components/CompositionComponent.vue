<template>
  <div>
    <p> greeting 值为: {{ greeting }}</p>
    <q-btn @click="read_greeting" label="读取greeting"></q-btn> <br>
    <q-input v-model="new_greeting"></q-input>
    <q-btn @click="write_greeting" label="写入greeting"></q-btn>
  </div>
</template>

<script lang="ts">
import {defineComponent,PropType,computed,ref,toRef,Ref,} from 'vue';
import { Todo, Meta } from './models';
import { ethers } from 'ethers'
import {Greeter} from "src/typechain/Greeter"
import GreeterAbi from 'src/artifacts/contracts/Greeter.sol/Greeter.json'
declare global {
  interface Window {
    ethereum:{
    isConnected():boolean,
    request(args: { method: string;params?: unknown[] | object;}): Promise<unknown>,
    on(event:string, handler: (para: any) => void):void,
    }
  }
}
export default defineComponent({
  name: 'CompositionComponent',
  setup(props) {
    return {greeting:ref(""),new_greeting:ref(""),contractAddress:"0x5FbDB2315678afecb367f032d93F642f64180aa3"};
  },
  mounted()
  {
    this.requestAccount()
  },
  methods:
  {
     async  read_greeting()
      {
         if (typeof window.ethereum !== 'undefined') 
        {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract:Greeter = new ethers.Contract(this.contractAddress, GreeterAbi.abi, provider) as Greeter
            try {
                const greet_str = await contract.greet()
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
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract:Greeter = new ethers.Contract(this.contractAddress, GreeterAbi.abi, signer) as Greeter
            try {
                const transaction = await contract.setGreeting(this.new_greeting)
                const res=transaction.wait()
                console.log('transaction return: ', res)
            } catch (err) {
                console.log("Error: ", err)
            }
        }
      },
      async  requestAccount() 
      {
        let accs=await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("requestAccount ",accs)
      },
  }
});
</script>