<template>
<div>
    <div class="q-pl-lg q-pt-lg text-h4">Ethereum 测试网络 与 测试币获取</div>

    <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="bg-secondary text-white"  v-for="chain_item in chain_list" :key="chain_item.name">
      <q-card-section class="q-py-sm">
        <div class="text-h6">{{chain_item.name}}</div>
      </q-card-section>
      <q-card-section class="q-py-xs">
        <div class="text-subtitle2">ChainId: {{chain_item.chainId}}</div>
      </q-card-section>
      <q-separator dark />

      <q-card-actions align="center">
        <q-btn flat @click="open_facult_url(chain_item)">获取测试ETH</q-btn>
      </q-card-actions>
    </q-card> 
  <q-card class="bg-primary text-white">
    <q-card-section class="q-py-sm">
        <div class="text-h6">Remix</div>
      </q-card-section>
    <q-card-section class="q-py-xs">
        <div class="text-subtitle2">Remix IDE </div>
      </q-card-section>

      <q-separator dark />
      <q-card-actions align="center">
        <q-btn flat @click="open_remix()">打开Remix</q-btn>
      </q-card-actions>
    </q-card>

  </div>
  <div  class="q-pl-lg q-pt-lg text-h4 row">
    <div>Hardhat 测试账号与私匙</div>
    <q-btn label="打开" color="primary" round @click="popup_hardhat_account"></q-btn>
  </div>

  <div  class="q-pl-lg q-pt-lg  row">
    <div> Metamask 请求eth_accounts 方法</div>
    <q-btn label="请求" color="primary" round @click="req_eth_accounts"></q-btn>
  </div>

   <q-dialog v-model="hardhat_account_dlg"  persistent >
        <q-card style="max-width:1024px;">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close"  round  color="primary" @click="close_popup_dlg"/>
        </q-card-section>

        <q-card-section style="max-height: 70vh;max-wdith: 90vh" >
            <div>
                <div   v-for="hardhat_account in hardhat_account_list" :key="hardhat_account.account_name" class="column">
                    <div>账号地址:{{hardhat_account.account_name}}<q-btn  icon="content_copy" @click="copy_content_val(hardhat_account.account_name)"></q-btn>
                    </div>
                    <div>
                        私匙:{{hardhat_account.private_key}} <q-btn  icon="content_copy" @click="copy_content_val(hardhat_account.private_key)"></q-btn>
                    </div>
                    <div> <hr> </div>
                </div>
            </div>  
        </q-card-section>
      </q-card>
    </q-dialog>

</div>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import HardhatAccount from 'components/common/HardhatAccount.vue';
import { defineComponent, ref } from 'vue';
import chain_list from "common/test_net_config.json"
import {chain_list_config } from "common/type_defs"
import { copyToClipboard } from 'quasar'
import hardhat_account_list from "common/hardhat_accont.json"

export default defineComponent({
  name: 'PageIndex',
  components: { HardhatAccount },
  setup() {
    return { chain_list:chain_list ,hardhat_account_dlg:ref(false),hardhat_account_list:hardhat_account_list};
  },
  methods:
  {
    open_facult_url(row:chain_list_config)
    {
      if(row.faucets && row.faucets.length>0)
      {
        window.open(row.faucets[0], '_blank').focus();
      }
    },
    open_remix()
    {
      window.open("https://remix.ethereum.org/", '_blank').focus();
    },
    popup_hardhat_account()
    {
      this.hardhat_account_dlg=true
    },
    close_popup_dlg()
    {
        this.hardhat_account_dlg=false
        // this.$emit("hide")
    },
    copy_content_val(private_key:string)
    {
        copyToClipboard(private_key)
        .then(() => {
            this.$q.notify({
            message: '拷贝成功',
            })
        })
        .catch(() => {
            this.$q.notify({
            message: '拷贝失败',
            })
        })
    },
    async req_eth_accounts()
    {
      try 
      {
        let accounts=await window.ethereum.request({method:"eth_accounts"})  
        console.log("accounts ",accounts)
      } catch (error) {
        console.error("req_eth_accounts ",error)
      }
    }
  }
});
</script>
