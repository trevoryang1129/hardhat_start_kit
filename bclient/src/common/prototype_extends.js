//https://blog.csdn.net/dszgf5717/article/details/51314952
//https://javascript.info/closure search find so-called “immediately-invoked function expressions” (abbreviated as IIFE) 
(
    function ()
    {
        /**
         * 替换所有匹配exp的字符串为指定字符串
         * @param exp 被替换部分的正则
         * @param newStr 替换成的字符串
         */
        String.prototype.replaceAll = function (exp, newStr) {
            return this.replace(new RegExp(exp, "gm"), newStr);
        };
        /**
         * 原型：字符串格式化
         * @param args 格式化参数值
         */
        String.prototype.format = function(args) {
            let result = this;
            if (arguments.length < 1) {
                return result;
            }
        
            let data = arguments; // 如果模板参数是数组
            if (arguments.length == 1 && typeof (args) == "object") {
                // 如果模板参数是对象
                data = args;
            }
            for ( let key in data) {
                let value = data[key];
                if (undefined != value) {
                    result = result.replaceAll("\\{" + key + "\\}", value);
                }
            }
            return result;
        }
        Math.rad = function(degrees) {
            return degrees * Math.PI / 180;
        }
        Math.deg = function(radians) {
            return radians * 180 / Math.PI;
        }
        Number.prototype.pad = function(size) {
            var s = String(this);
            while (s.length < (size || 2)) {s = "0" + s;}
            return s;
        }
        Array.prototype.clear=function()
        {
            this.splice(0,this.length)
        }
        Array.prototype.extend=function(new_array)
        {
            // this.splice(0,this.length)
            if(new_array.length>0)
            {
                new_array.forEach(v=>{
                    this.push(v)
                })
            }
        }
        window.assert=function(cond,message)
        {
            if (!cond) 
            {
                message = message || "Assertion failed"
                if (typeof Error !== "undefined") 
                {
                    throw new Error(message)
                }
                throw message
            }
        }
        window.handler=function(target,func)
        {
            //https://javascript.info/rest-parameters-spread-operator
            //https://javascript.info/call-apply-decorators
            return function(...args)
            {
                func.apply(target,args)
            }
        }
        // cc.Node.prototype.clone=function()
        // {
        //     return cc.instantiate(this)
        // }
    }
)()

//两种调用方式
// var template1="我是{0}，今年{1}了";
// var result1=template1.format("loogn",22);
 
// var template2="我是{name}，今年{age}了";
// var result2=template2.format({name:"loogn",age:22});
// var template1="我是{0}，今年{1}了, lucy今年也{1}了";
// var result1=template1.format("loogn",22);
//结果是"我是loogn，今年22了, lucy今年也22了"
////////////////////////////log for windows varable 
//window.global_event_system=this -- global_event_system
//window.game_controller=this -- game_controller
//windows.web_socket_inst --current use the web socket, home/game both use this variable

    /// JS官方文档地址：https://wangdoc.com/javascript/stdlib/date.html
    // /// 以下为JS中常用的时间函数，cocos creator 中使用的是JS中的时间
    // /*
    // 测试时间：2018年7月9日   星期一
    //     */
    // var date = new Date();
    // // 年
    // console.log("date.getYear : " + date.getYear()); // out : 118; 获取当前年份距离1900年的年数：2018 - 1900 = 118(年)
    // console.log("date.getFullYear : " + date.getFullYear()); // out : 2018; 获取当前年份的4位数值
    // // 月
    // console.log("date.getMonth : " + date.getMonth()); // out : 6; 获取月份（0~11）,0代表1月
    // // 星期
    // console.log("date.getDay : " + date.getDay()); // out : 1; 获取星期（0~6）,0代表星期天
    // // 日期
    // console.log("date.getDate : " + date.getDate()); // out : 9; 获取日期（1~30/31）
    // // 时
    // console.log("date.getHours : " + date.getHours()); // out : 14; 获取当前时刻（0~23）
    // // 分
    // console.log("date.getMinutes : " + date.getMinutes()); // out : 40; 获取当前时分（0~59）
    // // 秒
    // console.log("date.getSeconds : " + date.getSeconds()); // out : 45; 获取当前秒（0~59）
    // // 毫秒
    // console.log("date.getTime : " + date.getTime()); // out : 1531118652199; 获取当前时间距离1970年1月1日 00:00:00的毫秒数 
    //Date.now()
 
    // /// 以上方法皆为获取某一类型时间的具体数值
    // /// 以下为输出带格式的时间

    // // 输出完整的时间
    // console.log("date : " + date); // out : Mon Jul 09 2018 14:48:13 GMT+0800 (中国标准时间)
    // ////////////////////////////////////// 星期 月份 日期 年份 时:分:秒 时区
 
    // // 输出 日期
    // console.log("date.toDateString : " + date.toDateString()); // out : Mon Jul 09 2018
    // ////////////////////////////////////////////////////// 星期 月份 日期 年份
    // console.log("date.toLocaleDateString : " + date.toLocaleDateString()); // out : 2018/7/9(与官方文档不太一致) *注意，在模拟器上是不会输出的，必须使用浏览器才能看到输出
    // //////////////////////////////////////////////////////////// 年/月/日
 
    // // 输出 时间
    // console.log("date.toTimeString : " + date.toTimeString()); // out : 14:54:10 GMT+0800 (中国标准时间)
    // ////////////////////////////////////////////////////// 时:分:秒  时区
    // console.log("date.toLocaleTimeString : " + date.toLocaleTimeString()); // out : 下午3:01:10 *注意，在模拟器上是不会输出的，必须使用浏览器才能看到输出
    // /////////////////////////////////////////////////////////////////////////////// 上/下午 时:分:秒
