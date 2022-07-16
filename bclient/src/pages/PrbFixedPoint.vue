<template>
    <div class="q-pa-lg">
        <!-- /// 计算Log2 -->
    <div class="q-pt-xl">计算Log2    (合约计算结果)：{{log2_value}}</div>
    <div class="q-pt-xs">计算Log2    (JS 计算结果) {{log2_value_js}}</div>
    <div class="row">
      <div class="col-6">
        <q-input placeholder="Log2参数" v-model="log2_para"></q-input>
      </div>
      <div class="col-1"> <q-btn label="计算Log2" @click="cal_log2(log2_para)" no-caps></q-btn></div>
      <div class="col-2"> <q-btn label="计算Log2(Typed)" @click="cal_log2_typed(log2_para)" no-caps></q-btn></div>
    </div>
    <!-- /// signedMul -->
    <div class="q-pt-xl">计算signedMul    (合约计算结果)：{{signedMul_value}}</div>
    <div class="q-pt-xs">计算signedMul    (JS 计算结果) {{signedMul_value_js}}</div>
    <div class="row">
      <div class="col-6">
        <div class="row">
            <div class="col-6">
                <q-input placeholder="signedMul参数1" v-model="signedMul_para1"></q-input>
            </div>
            <div class="col-6">
                <q-input placeholder="signedMul参数2" v-model="signedMul_para2"></q-input>
            </div>
        </div>
      </div>
      <div class="col-1"> <q-btn label="计算signedMul" @click="cal_signedMul(signedMul_para1,signedMul_para2)" no-caps></q-btn></div>
      <div class="col-2"> <q-btn label="计算signedMul(Typed)" @click="cal_signedMul_typed(signedMul_para1,signedMul_para2)" no-caps> </q-btn></div>
    </div>
    <!-- ///  -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { app_state_store } from "store/app_state_vuex";
import { BigNumber, ethers } from "ethers";
import {fromBn,toBn} from "evm-bn"
import contract_address from "common/contract_address.json"

import {SignedConsumer} from "typechain/SignedConsumer"
import SignedConsumerAbi from 'artifacts/contracts/prb/SignedConsumer.sol/SignedConsumer.json'
import {SignedConsumerTyped} from "typechain/SignedConsumerTyped"
import SignedConsumerTypedAbi from 'artifacts/contracts/prb/SignedConsumerTyped.sol/SignedConsumerTyped.json'

 
import {UnsignedConsumer} from "typechain/UnsignedConsumer"
import UnsignedConsumerAbi from 'artifacts/contracts/prb/UnsignedConsumer.sol/UnsignedConsumer.json'
import {UnsignedConsumerTyped} from "typechain/UnsignedConsumerTyped"
import UnsignedConsumerTypedAbi from 'artifacts/contracts/prb/UnsignedConsumerTyped.sol/UnsignedConsumerTyped.json'


//install evm-bn lib by  npm install evm-bn
export default defineComponent({
    name: "",
    components: {},
    setup() {
        let contract_inst1:SignedConsumer=new ethers.Contract(contract_address.SignedConsumer, SignedConsumerAbi.abi, window.web3_provider.getSigner()) as SignedConsumer
        let contract_inst2:SignedConsumerTyped=new ethers.Contract(contract_address.SignedConsumerTyped, SignedConsumerTypedAbi.abi, window.web3_provider.getSigner()) as SignedConsumerTyped
        
        let contract_inst3:UnsignedConsumer=new ethers.Contract(contract_address.UnsignedConsumer, UnsignedConsumerAbi.abi, window.web3_provider.getSigner()) as UnsignedConsumer
        let contract_inst4:UnsignedConsumerTyped=new ethers.Contract(contract_address.UnsignedConsumerTyped, UnsignedConsumerTypedAbi.abi, window.web3_provider.getSigner()) as UnsignedConsumerTyped
        
        return {
            log2_value: ref(0),
            log2_value_js: ref(0),
            log2_para:ref(0),

            signedMul_value:ref(0),
            signedMul_value_js:ref(0),
            signedMul_para1:ref(0),
            signedMul_para2:ref(0),

            signedYield_value:ref(0),
            signedYield_value_js:ref(0),
            signedYield_para1:ref(0),
            signedYield_para2:ref(0),

            contract_inst1:contract_inst1,
            contract_inst2:contract_inst2,
            contract_inst3:contract_inst3,
            contract_inst4:contract_inst4,
        };
    },
    computed:{

    },
    methods: {
        async cal_log2(para:number)
        {
            this.log2_value_js=Math.log2(para)
            //let input_para=toBn(`${para}`,4) 4 是小数点位数
            // console.log("para ",input_para.toBigInt().toString())
            let log2=await this.contract_inst1.signedLog2(toBn(`${para}`))
            this.log2_value=+fromBn(log2)
        },
        async  cal_log2_typed(para:number) {
              this.log2_value_js=Math.log2(para)
            let log2=await this.contract_inst2.signedLog2(toBn(`${para}`))
            this.log2_value=+fromBn(log2)
        },
        async cal_signedMul(para1:number,para2:number)
        {
            this.signedMul_value_js=para1*para2
            let signedMul=await this.contract_inst1.signedMul(toBn(`${para1}`),toBn(`${para2}`))
            this.signedMul_value=+fromBn(signedMul)
        },
        async  cal_signedMul_typed(para1:number,para2:number) {
            this.signedMul_value_js=para1*para2
            let signedMul=await this.contract_inst2.signedMul(toBn(`${para1}`),toBn(`${para2}`))
            this.signedMul_value=+fromBn(signedMul)
        }
    },
});
</script>