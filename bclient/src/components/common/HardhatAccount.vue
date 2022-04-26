<template>
    <q-dialog v-model="show_help" @input ="$emit('hide',$event)" persistent>
        <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense @click="close_popup_dlg"/>
        </q-card-section>

        <q-card-section  style="max-width: 80vh">
            <div>
                <div   v-for="hardhat_account in hardhat_account_list" :key="hardhat_account.account_name">
                    <div>账号地址:{{hardhat_account.account_name}} <br>
                        私匙:{{hardhat_account.private_key}} <q-btn  icon="content_copy" @click="copy_private_key(hardhat_account.private_key)"></q-btn>
                        <br>
                    </div>
                </div>
                <div v-if="!show_help_c"></div>
            </div>  
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import hardhat_account_list from "common/hardhat_accont.json"
//全局逻辑处理组件，比如 1098 全局错误处理
import {defineComponent,PropType,computed,ref,toRef,Ref,} from 'vue';
import { copyToClipboard } from 'quasar'

export default defineComponent({
  name: 'HardhatAccount',
  props:{
    _show_help:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  setup(props)
  {
    return {show_help:ref(false),hardhat_account_list:hardhat_account_list}
  },
  computed:
  {
    show_help_c():boolean
    {
      this.show_help=this.$props._show_help
      console.log("show_help_c ",this.show_help)
      return this.$props._show_help
    }
  },
  mounted()
  {
    console.log("HardhatAccount mounted",this.show_help)
  },
  methods:
  {
    close_popup_dlg()
    {
        this.show_help=false
        this.$emit("hide")
    },
    copy_private_key(private_key:string)
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
    }
  }
})
</script>
