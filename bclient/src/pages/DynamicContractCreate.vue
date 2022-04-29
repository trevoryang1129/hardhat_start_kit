<template>
    <div class="q-pa-lg">
        <div>使用create 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner1"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model1"></q-input>
            </div>
            <div>
                <q-btn no-caps label="Create" @click="invoke_create1"></q-btn>
            </div>
        </div>

        <div>使用create2 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner2"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model2"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="Salt" v-model="salt2"></q-input>
            </div>
            <div>
                <q-btn no-caps label="Create2" @click="invoke_create2"></q-btn>
            </div>
        </div>

        
        <div>使用 createAndSendEther 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner3"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model3"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="发送的ETH" v-model="ether_value3"></q-input>
            </div>
            <div>
                <q-btn no-caps label="createAndSendEther" @click="invoke_create3"></q-btn>
            </div>
        </div>
         <div>使用 create2AndSendEther 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner4"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model4"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="Salt" v-model="salt4"></q-input>
            </div>
             <div class="q-px-lg">
                <q-input label="发送的ETH" v-model="ether_value4"></q-input>
            </div>
            <div>
                <q-btn no-caps label="create2AndSendEther" @click="invoke_create4"></q-btn>
            </div>
        </div>

        <div>使用 calcualteAddressAsm 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner5"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model5"></q-input>
            </div>
            <div>
                <q-btn no-caps label="calcualteAddressAsm" @click="invoke_create5"></q-btn>
            </div>
        </div>
        
        <div>使用 calcualteSaltAddress 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner6"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model6"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="Salt" v-model="salt6"></q-input>
            </div>
            <div>
                <q-btn no-caps label="calcualteSaltAddress" @click="invoke_create6"></q-btn>
            </div>
        </div>
        
        <div>使用 calcualteSaltAddressAsm 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner7"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model7"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="Salt" v-model="salt7"></q-input>
            </div>
            <div>
                <q-btn no-caps label="calcualteSaltAddressAsm" @click="invoke_create7"></q-btn>
            </div>
        </div>

        <div>使用 deploy 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner8"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model8"></q-input>
            </div>
            <div>
                <q-btn no-caps label="deploy" @click="invoke_create8"></q-btn>
            </div>
        </div>

        <div>使用 deploy2 方法</div>
        <div class="row items-center">
            <div>
                <q-input label="拥有者" v-model="owner9"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="型号" v-model="model9"></q-input>
            </div>
            <div class="q-px-lg">
                <q-input label="Salt" v-model="salt9"></q-input>
            </div>
            <div>
                <q-btn no-caps label="deploy2" @click="invoke_create9"></q-btn>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { app_state_store } from "store/app_state_vuex";
import { BigNumber, ethers } from "ethers";
import contract_address from "common/contract_address.json"
import { BusFactory } from "typechain/BusFactory";
import BusFactoryAbi from "artifacts/contracts/BusFactory.sol/BusFactory.json";
import { ContractProxy } from "typechain/ContractProxy";
import ContractProxyAbi from "artifacts/contracts/ContractProxy.sol/ContractProxy.json";
import { CodePool } from "typechain/CodePool";
import CodePoolAbi from "artifacts/contracts/CodePool.sol/CodePool.json";


export default defineComponent({
    name: "DynamicContractCreate",
    components: {},
    setup() {
        //Codepilot 自动生成的代码，非常牛逼
        let contract_inst:BusFactory=new ethers.Contract(contract_address.BusFactory,
            BusFactoryAbi.abi,window.web3_provider.getSigner()) as BusFactory;
        let contract_proxy_inst:ContractProxy=new ethers.Contract(contract_address.ContractProxy,
            ContractProxyAbi.abi,window.web3_provider.getSigner()) as ContractProxy;
        let code_pool_inst:CodePool=new ethers.Contract(contract_address.CodePool,
            CodePoolAbi.abi,window.web3_provider.getSigner()) as CodePool;

        return {
            contract_inst:contract_inst,
            contract_proxy_inst:contract_proxy_inst,
            code_pool_inst:code_pool_inst,
            owner1:ref(""),
            model1:ref(""),
            owner2:ref(""),
            model2:ref(""),
            salt2:ref(""),
            owner3:ref(""),
            model3:ref(""),
            ether_value3:ref(""),
            owner4:ref(""),
            model4:ref(""),
            salt4:ref(""),
            ether_value4:ref(""),
            owner5:ref(""),
            model5:ref(""),
            owner6:ref(""),
            model6:ref(""),
            salt6:ref(""),
            owner7:ref(""),
            model7:ref(""),
            salt7:ref(""),
            owner8:ref(""),
            model8:ref(""),
            owner9:ref(""),
            model9:ref(""),
            salt9:ref(""),
        };
    },
    computed:{},
    methods: {
        async invoke_create1()
        {
            try {
                let tx=await this.contract_inst.createBus(this.owner1,this.model1);
                let receipt=await tx.wait()
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create1 error",error);
            }
        },
        async invoke_create2()
        {
            try {
                //当成字符处理
                let salt2_bytes32=ethers.utils.formatBytes32String(this.salt2);
                //如果当成数字来处理
                let salt2_bytes32_num=ethers.utils.hexZeroPad(ethers.utils.hexlify(+this.salt2),32);
                let tx=await this.contract_inst.createBus2(this.owner2,this.model2,salt2_bytes32);
                // let tx=await this.contract_inst.create2(this.owner2,this.model2,salt2_bytes32_num);
                let receipt=await tx.wait()
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create2 error",error);
            }
        },
        async invoke_create3()
        {
            try {
                let tx=await this.contract_inst.createAndSendEther(this.owner3,this.model3,{value:ethers.utils.parseEther(`${this.ether_value3}`)});
                let receipt=await tx.wait()
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create3 error",error);
            }
        },
        async invoke_create4()
        {
            try {
                let salt4_bytes32=ethers.utils.formatBytes32String(this.salt4);
                let tx=await this.contract_inst.create2AndSendEther(this.owner4,this.model4,salt4_bytes32,{value:ethers.utils.parseEther(`${this.ether_value4}`)});
                let receipt=await tx.wait()
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create4 error",error);
            }
        },
        async invoke_create5()
        {
            try {
                let tx=await this.contract_inst.calcualteAddressAsm(this.owner5,this.model5);
                let receipt=await tx.wait()
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create5 error",error);
            }
        },
        async  invoke_create6()
        {
            try {
                let salt6_bytes32=ethers.utils.formatBytes32String(this.salt6);
                let tx=await this.contract_inst.calcualteSaltAddress(this.owner6,this.model6,salt6_bytes32);
                let receipt=await tx.wait()
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create6 error",error);
            }
        },
        async invoke_create7()
        {
            let is_validate_addr=ethers.utils.isAddress(this.owner7);
            if(!is_validate_addr)
            {
                console.error("owner7 is not a valid address");
                this.$q.notify({message:"owner7 is not a valid address"});
                return;
            }
            try {
                let salt7_bytes32=ethers.utils.formatBytes32String(this.salt7);
                let tx=await this.contract_inst.calcualteSaltAddressAsm(this.owner7,this.model7,salt7_bytes32);
                let receipt=await tx.wait()
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create7 error",error);
            }
        },
        async  invoke_create8()
        {
            let is_validate_addr=ethers.utils.isAddress(this.owner8);
            if(!is_validate_addr)
            {
                console.error("owner7 is not a valid address");
                this.$q.notify({message:"owner7 is not a valid address"});
                return;
            }
            try {
                let code=await this.code_pool_inst.getBusCode(this.owner8,this.model8);
                let tx=await this.contract_proxy_inst.deploy(code);
                let receipt=await tx.wait()
                let event=receipt.events[0]
                let address=event.decode(event.data)[0]
                console.log("address",address);
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create8 error",error);
            }
        },
         async  invoke_create9()
        {
            let is_validate_addr=ethers.utils.isAddress(this.owner9);
            if(!is_validate_addr)
            {
                console.error("owner9 is not a valid address");
                this.$q.notify({message:"owner9 is not a valid address"});
                return;
            }
            try {
                let salt9_bytes32=ethers.utils.formatBytes32String(this.salt9);
                let code=await this.code_pool_inst.getBusCode(this.owner9,this.model9);
                let tx=await this.contract_proxy_inst.deploy2(code,salt9_bytes32);
                let receipt=await tx.wait()
                let address=receipt.events[0].args[0]
                console.log("address",address);
                console.log("receipt",receipt);
            } catch (error) {
                console.error("invoke_create8 error",error);
            }
        },
    },
});
</script>