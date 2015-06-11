/**
 * @author Eric.zhu
 * @email  rushingpig@163.com
 * @date   2015/6/8 0008 18:07
 */
"use strict";

var IPError = require('../error/IPError');
var path = require('path'),
    fs = require('fs'),
    GBK = require('./GBKUtil'),
    inited = false,
    ipBuffer = null,
    IP_REGEXP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    defaultDataFilePath = path.resolve(__dirname,'../../data/ips.dat'),
    IP_RECORD_LENGTH = 7,
    REDIRECT_MODE_1 = 1,
    REDIRECT_MODE_2 = 2,
    destroyed = false;
var debug = false,
    ipStart = 0,
    ipEnd = 0,
    ipCount = 0,
    area = '未知地区',
    country = '未知国家',
    info = null;
/**
 * 将IP转换为整型
 * @param IP
 * @returns {*}
 */
IPResolve.prototype.ip2Int = function (IP) {
    var result = IP_REGEXP.exec(IP);
    var ip = null;
    if(result){
        var ip_Arr = result.slice(1);
        ip =(parseInt(ip_Arr[0]) << 24
            | parseInt(ip_Arr[1]) << 16
            | parseInt(ip_Arr[2]) << 8
            | parseInt(ip_Arr[3])) >>> 0;
    }else if(/^\d+$/.test(IP) && (ip=parseInt(IP))>=0 && ip <= 0xFFFFFFFF ){
        ip = +IP
    }else{
        throw new IPError("The IP address is not normal! >> " + IP);
    }
    return ip;
};
/**
 * 将整型转化为IP
 * @param intNum
 * @returns {string}
 */
IPResolve.prototype.int2Ip = function(intNum){
    if(intNum < 0 || intNum > 0xFFFFFFFF){
        throw new IPError("The number is not normal! >> " + intNum);
    };
    return (intNum>>>24) + "." + (intNum>>>16 & 0xFF) + "." + (intNum>>>8 & 0xFF) + "." + (intNum>>>0 & 0xFF);
};
/**
 * 采用二分法的方式查找出ip所对应的具体位置
 * @param IP
 * @returns {*}
 */
IPResolve.prototype.address = function(IP){
    var g,temp;
    for (var b=ipStart,e=ipEnd;b<e;){
        g = this.GetMiddleOffset(b,e,IP_RECORD_LENGTH);//获取中间位置
        temp = ipBuffer.readUInt32LE(g);
        if(ip>temp){
            b = g;
        }else if(ip<temp){
            if(g == e){
                g -= IP_RECORD_LENGTH;
                break;
            }
            e = g;
        }else{
            break;
        }
    }
    return g;
};

// 取得begin和end中间的偏移(用于2分法查询);
IPResolve.prototype.GetMiddleOffset = function (begin, end ,recordLength) {
    var records = ( (end - begin) / recordLength >> 1 ) * recordLength + begin;
    return records ^ begin ? records : records + recordLength;
};

//  静态方法

//  为了防止方法被污染或者篡改，以下均采用Object.defineProperty()方法定义对象属性


Object.defineProperty(IPResolve,'resolve',{
    writable:false,     //  禁止被复写
    configurable:false,  //  禁止重新初始化和被删除
    enumarable:true,    //  可被for...in循环获取
    value:resolve       //  对应赋值
});

Object.defineProperty(IPResolve,'validate',{
    writable:false,     //  禁止被复写
    configurable:false,  //  禁止重新初始化和被删除
    enumarable:true,    //  可被for...in循环获取
    value:validate       //  对应赋值
});
/**
 * <pre>
 * 通过ip解析对应的地址
 * 同时校验ip的有效性
 * </pre>
 * @param ip
 */
function resolve(ip) {
    inited || init();   //  采用默认的ip库创建解析器
    

}
/**
 * <pre>
 *     校验ip的有效性
 * </pre>
 * @param ip
 */
function validate(ip) {

}


function IPResolve(dataPath,cb) {
    if(!inited){
        throw new IPError('please init the resolver first : IPResolve.init()');
    }

}
/**
 * 初始化ip库到内存
 */
function init(dataPath) {
    if(!inited){
        if(arguments.length === 0){
            console.log('not specify the data path to be loaded,will use the default path...');
            ipBuffer = fs.readFileSync(defaultDataFilePath);
        }else{
            if(typeof dataPath === 'string'){
                ipBuffer = fs.readFileSync(dataPath);
            }else{
                throw new IPError('you should enter a string as the path param  [dataPath:]' + dataPath.toString());
            }
        }
        ipStart = ipFileBuffer.readUInt32LE(0,true); //索引的开始位置;
        ipEnd = ipFileBuffer.readUInt32LE(4,true); //索引的结束位置;
        ipCount = (ipEnd - ipStart)/7 + 1;
        inited = true;
    }
    return inited;
}

/**
 * 销毁所有的缓存和解析实例
 */
function destroy() {
    if(!destroyed){
        ipBuffer = null;

    }
    destroyed = true;
}


module.exports = IPResolve;


