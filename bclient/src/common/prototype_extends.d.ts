 declare interface String {
    replaceAll:(exp:string, newStr:string)=>string;
    format:(...args:any)=>string;
}

declare interface Math {
    rad:(degree:number)=>number;
    deg:(radians:number)=>number;
}

declare interface Number {
    pad:(size:number)=>string;
} 

declare interface Array<T> {
    clear:()=>void;
    extend:(new_array:Array<T>)=>Array<T>;
}
declare function assert(cond:boolean, message:string):void;
declare function handler(target:any, func:Function):(arg:any)=>any;