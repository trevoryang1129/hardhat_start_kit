export type In_n = Record<number, number>
export type Sn_n = Record<string, number>
export interface Ikv
{
    k:number,
    v:number
}

type kv_arr = Ikv[]
export type kv_arr_arr = kv_arr[]

export interface Ik_T<T>
{
    [i:string]:T
}

export interface  chain_list_config {
    name:           string;
    chain:          string;
    icon:           string;
    rpc:            string[];
    faucets:        any[];
    nativeCurrency: {
        name:     string;
        symbol:   string;
        decimals: number;
        };
    infoURL:        string;
    shortName:      string;
    chainId:        number;
    networkId:      number;
    slip44:         number;
    ens:            {registry: string;};
    explorers:      {
        name:     string;
        url:      string;
        standard: string;
    }[];
}

export interface ConnectInfo {
    chainId: string;
}
export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
  }


//物品的品质
export enum color
{
    all = 0,    //全部颜色
    red = 5,    //红色
    purple = 4, //紫色
    green = 2,  //绿色
    blue = 3,   //蓝色
    yellow = 1  //金色
}

 
//平台类型 1=ios、2=android、3=win,4=mac 100=unknow
export enum platform_type
{
    ios = 1,
    android = 2,
    win = 3,
    mac = 4,
    unknow = 100
}

export class sys_kv
{
    public k:number; //k
    public v:number; //v
}
export class sys_vip
{
    public id:number; //VIP等级
    public upgrade_exp:number; //升级经验
    public shop_buy_times:Array<sys_kv> ; //增加商店购买次数
    public vip_des:string; //贵族特权说明
}
export class sys_word
{
    public id:number; //ID
    public word:string; //关键字
}
export const direction=
{
    buy:"buy",
    sell:"sell"
}
export const candlestick_interval=
{
    MIN1 :"1m",
    MIN5 :"5m",
    MIN15 :"15m",
    MIN30 :"30m",
    MIN60 :"1h",
    HOUR4 :"4h",
    DAY1 :"1d",
    MON1 :"1M",
    WEEK1 :"1w",
    INVALID :null
}
export const candlestick_interval_chn=
{
    "1m":"1分钟",
    "5m":"5分钟",
    "15m":"15分钟",
    "30m":"30分钟",
    "1h":"60分钟",
    "4h":"4小时",
    "1d":"24小时",
    "1M":"1个月",
    "1w":"1周",
    INVALID :null
} 
export class sys_ticker
{
    public symbol_id:string
     //use candlestick_interval
    public period:string 
    public amount:number
    public open:number
    public close:number
    public high:number
    public low:number
     //涨跌幅 rate=(close-open)/open
    public rate:number
    public order_id:number
    public symbol_type?: (number|null);
}