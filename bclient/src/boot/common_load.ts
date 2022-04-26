//https://vuejs.org/v2/guide/typescript.html
// https://v3.vuejs.org/guide/typescript-support.html
import Vue from 'vue'
import { boot } from 'quasar/wrappers'
import "common/prototype_extends"
import { LocalStorage } from 'quasar'
// import {ExternalProvider} from "@ethersproject/providers"
import {Web3Provider} from "@ethersproject/providers"
export interface JsonRpcPayload {
  jsonrpc: string;
  method: string;
  params: any[];
  id?: string | number;
}
export interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: string;
}
//ExternalProvider2 与 ExternalProvider payload 类型不一样 JsonRpcPayload 是从web3.js 中copy 过来的
type ExternalProvider2 = {
  isConnected():boolean,
  request(args: { method: string;params?: unknown[] | object;}): Promise<any>,
  on(event:string, handler: (para: any) => void):void,
  sendAsync(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => void): void;
  send?(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => void): void;
  connected?: boolean;
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
}
export type ExternalProvider = {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
  send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
  request?: (request: { method: string, params?: Array<any> }) => Promise<any>
  on(event:string, handler: (para: any) => void):void
}
declare global {
interface Window {
  Colyseus: any;
  ethereum:ExternalProvider;
  web3_provider:Web3Provider;
}
}
export default boot(({app}) => 
{
  console.log("Load  common_load ")
})

/**
 https://ionicframework.com/docs/v3/native/fingerprint-aio/
https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio
https://www.npmjs.com/package/@ionic-native/fingerprint-aio
在bn_client 目录下安装 ,在访目录下安装是为了能在ts 编译的时候不出错
 npm install @ionic-native/fingerprint-aio
 npm install --save @ionic-native/core

在src-cordova 目录下执行
cordova plugin add cordova-plugin-fingerprint-aio --save

*/

// Vue.prototype.$update_toolbar_title=function(new_title:string)
// {
//   document.getElementById("toolbar_title").innerHTML=new_title
// }
//install type declare file
//npm install --save-dev @types/cordova-plugin-qrscanner
//npm install --save @ionic-native/qr-scanner