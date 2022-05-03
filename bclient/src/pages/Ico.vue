<template>
  <div class="q-pa-lg">
    <div>众筹基本信息 -- 地址:{{contract_address}}</div>
    <div class="row items-center ">
      <div>众筹目标(ETH):</div>
      <div class="q-px-lg">{{funding_goal}}</div>
      <div>已筹集金额数量(ETH):</div>
      <div class="q-px-lg">{{amount_raised}}</div>
      <div>截止时间:</div>
      <div class="q-px-lg">{{deadline}}</div>
      <div>代币价格(ETH):</div>
      <div class="q-px-lg">{{token_price}}</div>
    </div>
    <div class="q-pt-lg row items-center" v-if="is_owner">
      <div>转入LJM 代币到众筹合约账号中:</div>
      <div class="col-4 q-px-lg"><q-input placeholder="购买量" v-model="transfer_amount" suffix="LJM"></q-input> </div>
      <div class="q-px-lg"> <q-btn label="转账" @click="transfer_LJM"></q-btn> </div>
    </div>
    <div class="q-pt-lg">购买LJM 代币</div>
    <div class="row items-center">
        <div class="col-6"> <q-input placeholder="购买量" v-model="buy_amount" suffix="ETH"></q-input> </div>
        <div class="q-px-lg"><q-btn label="购买" @click="buy_token"></q-btn> </div>
    </div>
    <div class="row q-pt-lg">
       <div class="q-px-lg"> <q-btn label="检测众筹目标" @click="check_goal_reached" color="primary" rounded></q-btn> </div>
       <div class="col-3">{{funding_goal_reached?'众筹完成':'众筹未完成'}} {{crowdsale_closed?'众筹已经关闭':''}}</div>
    </div>
    
    <div  class="row q-pt-lg items-center">
      <div>撤资(若众筹目标完成，无法回撤资，项目进继续推进)</div>
      <div class="q-px-lg"><q-btn @click="safe_withdrawal" :label="funding_goal_reached?'推进':'撤资'" color="primary" round></q-btn></div>
      
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
import {SimpleCrowdsale} from "typechain/SimpleCrowdsale"
import SimpleCrowdsaleAbi from 'artifacts/contracts/SimpleCrowdsale.sol/SimpleCrowdsale.json'

// https://chainlist.org/
//http://htmlencode.net/
// https://github.com/highlightjs/highlight.js
export default defineComponent({
  name: 'ICO',
  components: {},
  setup()
  {
    let contract_inst:SimpleCrowdsale=new ethers.Contract(contract_address.SimpleCrowdsale, SimpleCrowdsaleAbi.abi, window.web3_provider.getSigner()) as SimpleCrowdsale
    return {
        contract_address:contract_address.SimpleCrowdsale,
        contract_inst:contract_inst,
        funding_goal:ref(0),
        amount_raised:ref(0),
        deadline:ref(""),
        token_price:ref(0),
        buy_amount:ref(0),
        funding_goal_reached:ref(false),
        crowdsale_closed:ref(false),
        beneficiary:ref(""),
        transfer_amount:ref(0),
        token_decimals:ref(0),

        };
  },
  mounted()
  {
      this.query_crowdsale_basic_info()
      this.add_event_filter()
  },
  computed:
  {
    is_owner():boolean
    {
      return this.beneficiary.toLowerCase()==app_state_store.current_user.toLowerCase()
    }
  },
  methods:
  {
      async query_crowdsale_basic_info()
      { 
        try 
        {
            let funding_goal_wei=await this.contract_inst.fundingGoal()
            let amount_raised_wei=await this.contract_inst.amountRaised()
            let token_price_wei=await this.contract_inst.price()
            let deadline_secs=await this.contract_inst.deadline()
            let end_date=new Date(deadline_secs.toNumber()*1000)
            
            this.beneficiary=await this.contract_inst.beneficiary()
            this.token_decimals=await this.contract_inst.decimals()
            this.funding_goal=+ethers.utils.formatUnits(funding_goal_wei,18)
            this.amount_raised=+ethers.utils.formatUnits(amount_raised_wei,18)
            this.token_price=+ethers.utils.formatUnits(token_price_wei,18)
            this.deadline=end_date.getFullYear()+"-"+(end_date.getMonth()+1)+"-"+end_date.getDate()+" "+end_date.getHours()+":"+end_date.getMinutes()+":"+end_date.getSeconds()
            this.funding_goal_reached=await this.contract_inst.fundingGoalReached()
            this.crowdsale_closed=await this.contract_inst.crowdsaleClosed()
        } catch (error) 
        {
            console.log("query_token_basic_info error ",error)
        }
      },
      async check_goal_reached()
      {
          try {
            await this.contract_inst.checkGoalReached()
            this.funding_goal_reached=await this.contract_inst.fundingGoalReached()
            this.crowdsale_closed=await this.contract_inst.crowdsaleClosed()
          } catch (error) {
            console.log("check_goal_reached error ",error)
          }
      },
      async buy_token() 
      {
          try{
            // let res=await this.contract_inst.buyToken({value:ethers.utils.parseUnits(`${this.buy_amount}`,18)})
            let res=await this.contract_inst.buyToken({value:ethers.utils.parseEther(`${this.buy_amount}`)})
            await res.wait()
          } catch (error) {
              console.log("buy_token error ",error)
          }
     
      },
      async safe_withdrawal()
      {
          try {
            let tx=await this.contract_inst.safeWithdrawal()
            tx.wait()
          } catch (error) {
            console.log("safe_withdrawal error ",error)
          }
      },
      async add_event_filter()
      {

        let filter=this.contract_inst.filters.FundTransfer()
        this.contract_inst.on(filter,async (_backer:string,_amount:number, _isContribution:boolean,other:any)=>
        {
            console.log("FundTransfer Happen")
            let amount_raised_wei=await this.contract_inst.amountRaised()
            this.amount_raised=+ethers.utils.formatUnits(amount_raised_wei,18)
        })
      },
      async transfer_LJM()
      {
        let ljm_inst:LJM=new ethers.Contract(contract_address.LJM, LJMAbi.abi, window.web3_provider.getSigner()) as LJM
        try {
          let tx=await ljm_inst.transfer(contract_address.SimpleCrowdsale,ethers.utils.parseUnits(`${this.transfer_amount}`,this.token_decimals))
          await tx.wait()
        } catch (error) {
           console.log("transfer_LJM error ==>",error) 
        }
      }

  }
});
</script>