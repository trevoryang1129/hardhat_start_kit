<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Hardhat 测试项目 &nbsp;&nbsp;&nbsp;Hardhat 账号:
          <q-btn label="打开" color="green" round @click="popup_hardhat_account()"></q-btn>
        </q-toolbar-title>

        <div class="q-pr-lg" v-if="!show_login_btn">当前账号:{{ current_user }}</div>

         <q-btn
          class="q-pl-lg"
          label="连接Metamask"
          unelevated rounded
          color="secondary" icon="login"
          v-show="show_login_btn"
          @click="requestAccount"
          />
          <q-btn
          flat
          icon="content_copy"
          v-show="!show_login_btn"
          @click="copy_current_user"
          />
          <q-btn
          flat
          icon="logout"
          v-show="!show_login_btn"
          @click="logout_current_user"
          />
      </q-toolbar>
    </q-header>

   <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          功能模块
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

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
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'


import { defineComponent, ref } from 'vue'
import { app_state_store } from "store/app_state_vuex";
import { BigNumber, ethers } from 'ethers'
import { copyToClipboard } from 'quasar'
import {ProviderRpcError} from "common/type_defs"
import linksList from "common/menu_item.json"
import hardhat_account_list from "common/hardhat_accont.json"
export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      hardhat_account_dlg:ref(false),hardhat_account_list:hardhat_account_list
    }
  },
  computed:
  {
    show_login_btn()
    {
      return app_state_store.current_user.length==0
    },
    current_user()
    {
      return app_state_store.current_user
    }
  },
  methods:
  {
    async  requestAccount() 
    {
        let accs=await window.ethereum.request({ method: 'eth_requestAccounts' });
        if(accs.length>0)
        {
          app_state_store.set_current_user(accs[0])
          let q_inst=this.$q
          window.ethereum.on('accountsChanged', function (accounts) {
              app_state_store.set_current_user(accounts[0])
               q_inst.notify({
                message: '账号切换为'+accounts[0],
              })
          })
        window.ethereum.on('disconnect', function (error: ProviderRpcError) {
              app_state_store.set_current_user("")
              q_inst.notify({
                message: '连接已经断开'
              })
          })
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          window.web3_provider=provider
        }
    },
    copy_current_user()
    {
      copyToClipboard(app_state_store.current_user)
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
    popup_hardhat_account()
    {
      this.hardhat_account_dlg=true
    },
    close_popup_dlg()
    {
        this.hardhat_account_dlg=false
        // this.$emit("hide")
    },
    logout_current_user()
    {
      //@ts-ignore
      window.ethereum.emit("disconnect")
    }
  }
})
</script>
