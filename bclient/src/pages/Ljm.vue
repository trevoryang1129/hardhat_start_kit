<template>
  <div class="q-pa-lg">
    <div>代币基本信息 -- 地址:{{contract_address}}</div>
    <div class="row items-center ">
      <div>名称:</div>
      <div class="q-px-lg">{{token_name}}</div>
      <div>符号:</div>
      <div class="q-px-lg">{{token_symbol}}</div>
      <div>精度:</div>
      <div class="q-px-lg">{{token_decimals}}</div>
      <div>总供应量:</div>
      <div class="q-px-lg">{{token_total_supply}}</div>
    </div>
    <div class="q-pt-xl">查询账号余额：{{balance}}</div>
    <div class="row">
      <div class="col-6">
        <q-input placeholder="钱包地址" v-model="query_address"></q-input>
      </div>
      <div> <q-btn label="查询" @click="get_balance"></q-btn></div>
    </div>
    <div class="q-pt-lg">转账：</div>
    <div class="row items-center">
        <div class="col-6"> <q-input placeholder="转入地址" v-model="transfer_address"></q-input> </div>
        <div class="col-1 q-px-lg" > <q-input placeholder="转入数量" v-model="transfer_amount" :suffix="token_symbol"></q-input> </div>
        <div><q-btn label="转账" @click="transfer_token"></q-btn> </div>
    </div>
    <div class="q-pt-lg">授权</div>
    <div class="row items-center">
        <div class="col-6"> <q-input placeholder="授权地址" v-model="approve_address"></q-input> </div>
        <div class="col-1 q-px-lg" > <q-input placeholder="授权数量" v-model="approve_amount" :suffix="token_symbol"></q-input> </div>
        <div><q-btn label="授权" @click="approve_token"></q-btn> </div>
    </div>
    <div class="q-pt-xl">查询授权额度：{{allowance_amount}}</div>
    <div class="row">
      <div class="col-6">
        <q-input placeholder="授权人地址" v-model="allowance_src_address"></q-input>
        <q-input placeholder="被授权人地址" v-model="allowance_dest_address"></q-input>
      </div>
      <div> <q-btn label="查询" @click="get_allowance_amount"></q-btn></div>
    </div>
    <div class="q-pt-lg">提取：</div>
    <div class="row items-center">
        <div class="col-4"> <q-input placeholder="提取源地址" v-model="withdraw_src_address"></q-input> </div>
        <div class="col-4"> <q-input placeholder="提取目的地址" v-model="withdraw_dest_address"></q-input> </div>
        <div class="col-1 q-px-lg" > <q-input placeholder="提取数量" v-model="withdraw_amount" :suffix="token_symbol"></q-input> </div>
        <div><q-btn label="提取" @click="widthdraw_token"></q-btn> </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { app_state_store } from "store/app_state_vuex";
import { BigNumber, ethers } from 'ethers'
import contract_address from "common/contract_address.json"
import {LJM} from "typechain/LJM"
import LJMAbi from 'artifacts/contracts/LJM.sol/LJM.json'

// https://chainlist.org/
//http://htmlencode.net/
// https://github.com/highlightjs/highlight.js
export default defineComponent({
  name: 'LJM',
  components: {},
  setup()
  {
    let contract_inst:LJM=new ethers.Contract(contract_address.LJM, LJMAbi.abi, window.web3_provider.getSigner()) as LJM
    return {
        contract_address:contract_address.LJM,
        contract_inst:contract_inst,
        token_name:ref("---"),
        token_symbol:ref("---"),
        token_decimals:ref(0),
        token_total_supply:ref(0),
        balance:ref(0),
        query_address:ref(""),
        transfer_address:ref(""),
        transfer_amount:ref(0),
        approve_address:ref(""),
        approve_amount:ref(0),
        allowance_amount:ref(0),
        allowance_src_address:ref(""),
        allowance_dest_address:ref(""),
        withdraw_src_address:ref(""),
        withdraw_dest_address:ref(""),
        withdraw_amount:ref(0),
        };
  },
  mounted()
  {
      this.query_token_basic_info()
  },
  methods:
  {
      async query_token_basic_info()
      { 
        try 
        {
            this.token_name=await this.contract_inst.name()
            this.token_symbol=await this.contract_inst.symbol()
            this.token_decimals=await this.contract_inst.decimals()
            let total_supply=await this.contract_inst.totalSupply()
            this.token_total_supply=+ethers.utils.formatUnits(total_supply,this.token_decimals)
        } catch (error) 
        {
            console.log("query_token_basic_info error ",error)
        }
      },
      async get_balance()
      {
          let is_validate=ethers.utils.isAddress(this.query_address)
          if(is_validate)
          {
            try {
                let bal=await this.contract_inst.balanceOf(this.query_address)
                this.balance=+ethers.utils.formatUnits(bal,this.token_decimals)
            } catch (error) 
            {
                console.log("get_balance error ",error)
            }
          }
          else
          {
              this.$q.notify({message:"invalidate address"})
          }
      },
      async transfer_token()
      {
          let is_validate=ethers.utils.isAddress(this.transfer_address)
          if(is_validate)
          {
              try {
                let res=await this.contract_inst.transfer(this.transfer_address,ethers.utils.parseUnits(`${this.transfer_amount}`,this.token_decimals))
                await res.wait()
              } catch (error) {
                  console.log("transfer_token error ",error)
              }
          }
          else
          {
              this.$q.notify({message:"invlidate address"})
          }
      },
      async approve_token() 
      {
          let is_validate=ethers.utils.isAddress(this.approve_address)
          if(is_validate)
          {
              try {
                let res=await this.contract_inst.approve(this.approve_address,ethers.utils.parseUnits(`${this.approve_amount}`,this.token_decimals))
                await res.wait()
              } catch (error) {
                  console.log("approve_token error ",error)
              }
          }
          else
          {
              this.$q.notify({message:"invlidate address"})
          }
      },
      async get_allowance_amount()
      {
           let is_validate=ethers.utils.isAddress(this.allowance_src_address) && ethers.utils.isAddress(this.allowance_dest_address)
          if(is_validate)
          {
              try {
                let res=await this.contract_inst.allowance(this.allowance_src_address,this.allowance_dest_address)
                this.allowance_amount=+ethers.utils.formatUnits(res,this.token_decimals)
              } catch (error) {
                  console.log("widthdraw_token error ",error)
              }
          }
          else
          {
              this.$q.notify({message:"invlidate address"})
          }
      },
      async widthdraw_token()
      {
          let is_validate=ethers.utils.isAddress(this.withdraw_src_address) && ethers.utils.isAddress(this.withdraw_dest_address)
          if(is_validate)
          {
              try {
                let res=await this.contract_inst.transferFrom(this.withdraw_src_address,this.withdraw_dest_address,ethers.utils.parseUnits(`${this.withdraw_amount}`,this.token_decimals))
                await res.wait()
              } catch (error) {
                  console.log("widthdraw_token error ",error)
              }
          }
          else
          {
              this.$q.notify({message:"invlidate address"})
          }
      }
  }
});
</script>