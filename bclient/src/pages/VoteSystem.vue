<template>
  <div class="q-pa-lg">
    <div>
        <div>
          开启新的投票：
        </div>
        <div>
          <q-input type="text" v-model="title" label="投票标题" />
        </div>
        <div>
          <q-input type="text" v-model="proposal1" label="候选1" />
        </div>
        <div>
          <q-input type="text" v-model="proposal2" label="候选2" />
        </div>
        <div>
          <q-input type="text" v-model="proposal3" label="候选3" />
        </div>
        <div>
          <q-btn no-caps label="开启新投票" @click="create_new_ballot" />
        </div>
    </div>
    <div v-if="has_new_vote">
        <div>投票标题：</div>
        <div class="column">
            {{vote_title}}
        </div>
        <div>当前投票人：</div>
        <div class="column">
            <div v-for="voter in voter_list" :key="voter">
                {{voter}}
            </div>
        </div>
        <div class="row items-center">
          <div class="col-6">
            <q-input v-model="voter_address" label="加入投票人地址：" class=""></q-input>
          </div>
          <div>
            <q-btn label="增加投票人" @click="add_voter"></q-btn>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-6">
              <q-input v-model="delegate_address" label="委派人地址：" class=""></q-input>
          </div>
          <div>
            <q-btn label="转让投票权" @click="delegate_to"></q-btn>
          </div>
        </div>
        <div class="row items-center">
          <div>
            投票给：
          </div>
          <div>
            <q-option-group
              v-model="vote_index"
              :options="proposals"
              color="primary"
              inline
              dense
            />
          </div>
          <div class="q-pl-lg">
            <q-btn label="投票" @click="vote" ></q-btn>
          </div>
        </div>
        <div>
          <div class="row items-center">
            <div>当前投票计数:</div>
            <div class="q-px-lg"><q-btn no-caps label="手动刷新" @click="display_current_vote_counter"/> </div>
          </div>
          <div v-for="propsal in voter_counter" :key="propsal.name">
            <div>候选人:&nbsp;&nbsp;&nbsp;{{propsal.name}} &nbsp;&nbsp;&nbsp;&nbsp;计数:&nbsp;&nbsp; {{propsal.voteCount}}</div> 
          </div>
        </div>
        <div class="row items-center q-pt-lg">
            <div>
                <q-btn label="计算投票结果" @click="get_winer_index"></q-btn>
            </div>
            <div class="q-pl-xl">
                胜出：{{winer}}
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { app_state_store } from "store/app_state_vuex";
import { BigNumber, ethers } from 'ethers'
import contract_address from "common/contract_address.json"
import {Ballot} from "typechain/Ballot"
import BallotAbi from 'artifacts/contracts/Ballot.sol/Ballot.json'

import {ContractProxy} from "typechain/ContractProxy"
import ContractProxyAbi from 'artifacts/contracts/ContractProxy.sol/ContractProxy.json'

import {CodePool} from "typechain/CodePool"
import CodePoolAbi from 'artifacts/contracts/CodePool.sol/CodePool.json'

export default defineComponent({
  name: 'VoteSystem',
  components: {},
  setup() {
        let contract_inst:Ballot=undefined
        let contract_proxy_inst:ContractProxy=new ethers.Contract(contract_address.ContractProxy, ContractProxyAbi.abi, window.web3_provider.getSigner()) as ContractProxy
        let codepool_inst:CodePool=new ethers.Contract(contract_address.CodePool, CodePoolAbi.abi, window.web3_provider.getSigner()) as CodePool
  return{
        contract_inst:contract_inst,
        contract_proxy_inst:contract_proxy_inst,
        codepool_inst:codepool_inst,
        title:ref(""),
        proposal1:ref(""),
        proposal2:ref(""),
        proposal3:ref(""),

        has_new_vote:ref(false),
        vote_title:ref(""),
        voter_list:ref([]),
        voter_address:ref(""),
        delegate_address:ref(""),
        vote_index:ref(0),
        proposals:ref([]),
        voter_counter:ref([]),
        winer:ref(""),
    };
  },
  methods:
  {
      async create_new_ballot()
      {
          try {
            this.has_new_vote=false
            let proposals=[
                ethers.utils.formatBytes32String(this.proposal1),
                ethers.utils.formatBytes32String(this.proposal2),
                ethers.utils.formatBytes32String(this.proposal3)
                ]
            let code=await this.codepool_inst.getBallotCode(proposals,app_state_store.current_user,this.title)
            let tx=await this.contract_proxy_inst.deploy(code)
            let receipt=await tx.wait()
            console.log("receipt ",receipt)
            let event=receipt.events[0]
            let ballot_address=event.decode(event.data)[0]
            console.log("ballot_address ",ballot_address)
            this.contract_inst=new ethers.Contract(ballot_address, BallotAbi.abi, window.web3_provider.getSigner()) as Ballot
            await this.get_voter_list()
            await this.get_avaliable_proposals()
            await this.add_event_filter()
            this.has_new_vote=true
          } catch (error) {
             console.error("create_new_ballot error ",error) 
          }
      },
      async get_voter_list()
      {
            this.vote_title=await this.contract_inst.title()
            let res=await this.contract_inst.getVotersList()
            res.forEach(v=>
            {
                this.voter_list.push(v);
            })
      },
      async get_avaliable_proposals()
      {
            this.vote_title=await this.contract_inst.title()
            let res=await this.contract_inst.getProposal()
            res.forEach((proposal,idx) => 
            {
                this.proposals.push({label:ethers.utils.parseBytes32String(proposal.name),value:idx}) 
            });
      },
      async add_voter()
      {
            console.log("add_voter ",this.voter_address)
            let is_validate=ethers.utils.isAddress(this.voter_address)
            if(is_validate)
            {
                try 
                {
                    let tx=await this.contract_inst.giveRightToVote(this.voter_address)
                    let receipt=await tx.wait()
                    console.log("receipt",receipt)
                } catch (error) 
                {
                    console.log("add_voter erro ",error)    
                }
            }
            else
            {
                this.$q.notify({message:"invalidate address"})
            }
      },
      async delegate_to()
      {
        let is_validate=ethers.utils.isAddress(this.delegate_address)
        if(is_validate)
        {
            try 
            {
                let tx=await this.contract_inst.delegate(this.delegate_address)
                let receipt=await tx.wait()
                console.log("receipt",receipt)
            } catch (error) 
            {
                console.log("delegate_to error ",error)    
            } 
        }
        else
        {
            this.$q.notify({message:"invalidate address"})
        }
      },
      async vote()
      {
        if(this.vote_index>=0 && this.vote_index<this.proposals.length)
        {
            try 
            {
                let tx=await this.contract_inst.vote(this.vote_index)
                let receipt=await tx.wait()
                console.log("receipt",receipt)
            } catch (error) 
            {
                console.log("vote error ",error)    
            }
        }
        else
        {
            this.$q.notify({message:"invalidate proposals"})
        }  
      },
      async display_current_vote_counter()
      {
        this.voter_counter=[]
        let res=await this.contract_inst.getProposal()
        res.forEach((proposal,idx) => 
        {
            this.voter_counter.push({name:ethers.utils.parseBytes32String(proposal.name),index:idx,voteCount:proposal.voteCount.toNumber()}) 
        });
      },
      async get_winer_index()
      {
        let win_idx=await this.contract_inst.winningProposal()
        this.winer=this.proposals[win_idx.toNumber()].label
      },
       async add_event_filter()
       {
            let chairperson=await this.contract_inst.chairperson()
            let filter=this.contract_inst.filters.VoterJoin(chairperson)
            window.web3_provider.once("block",()=>{
            this.contract_inst.on(filter,(chainperson:string,voter:string,other:any)=>
            {
                console.log("VoterJoin event_filter=>",voter,other)
                if(this.voter_list.indexOf(voter)==-1)
                this.voter_list.push(voter)
            })
            this.contract_inst.on(this.contract_inst.filters.Voted(),(voter_address:string,other:any)=>{
              console.log("Voted event =>",voter_address)
              this.display_current_vote_counter()
            })
            }) 
        },
      
    
  }
});
</script>