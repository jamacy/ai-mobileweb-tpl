import Big from 'big.js'

export const FORMAT = 'yyyy-MM-dd' 
export const getViewportSize = () => {
  return {
    width:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    height:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  };
};
export const queryParam=(url, name)=> {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
  const r = url.match(reg);
  return r != null && r.length >= 2 ? decodeURIComponent(r[2]) : "";
};

export const percentum = (text) =>{
    let num = new Big(text)
    return num.times(100) + '%'
}
export const max = (arr, n) => arr.sort((a, b) => a < b).slice(0, n);

export const isArrayNull = data => {
  let count = 0;
  data.map((item, index) => {
    if (item.percent === 0) {
      count++;
    }
  });
  return count === data.length;
};
export const dateFormat = (time, format) => {
  var o = {
    "M+": time.getMonth() + 1, //month
    "d+": time.getDate(), //day
    "h+": time.getHours(), //hour
    "m+": time.getMinutes(), //minute
    "s+": time.getSeconds(), //second
    "q+": Math.floor((time.getMonth() + 3) / 3), //quarter
    S: time.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (time.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};
/**
 * 格式化日期
 *
 */
export const formatDateTime = d => {
  var date = new Date(d);
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + "-" + month + "-" + strDate;
  return currentdate;
};

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time)
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}


export const userAgent=(version)=>{
  let str = window.navigator.userAgent.toLowerCase(); 
  let ver = str.match(/cpu iphone os (.*?) like mac os/);
  if(ver){
    let s = ver[1].replace(/_/g,".");
    return s.indexOf(version)
  }
  
}
export const isIOS =()=>{
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true
  }
  return false
}

export const androidVersion=()=>{
  let ua = navigator.userAgent;
  if( ua.indexOf("Android") >= 0 ) {
    let version = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
    return version;
  }
}

export const getUrlParams = () => {
  var url = window.location.search;
  var params = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      params[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  return params;
};

export const addClass = (obj, cls) => {
  if (!hasClass(obj, cls)) obj.className += " " + cls;
}
const hasClass = (obj, cls) => {
  return obj.className ? obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) : false;
}

/**
 * @m 二维数组的长度
 * @n 每个子数组元素的个数
 */
export const createArray = (m,n) => {
  return Array.from(new Array(m),() => new Array(n).fill(null));
}
