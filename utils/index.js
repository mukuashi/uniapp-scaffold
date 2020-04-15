/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 常用工具函数 utils
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date:   2019-07-08 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-03-26 22:53:00
 */
export function handleDateFactory(date) {
  if (!date) return;
  let today = new Date();
  let mdate = new Date(date);
  let intervalTime = today.getTime() - mdate.getTime();
  let hours = parseInt(intervalTime / parseInt(1000 * 60 * 60));
  if (hours > 24) {
    return date.split("T")[0].replace(/\-/g, "/");
  } else {
    intervalTime = intervalTime % parseInt(1000 * 60 * 60);
    let minutes = parseInt(intervalTime / parseInt(1000 * 60));
    if (hours < 1) {
      return `${minutes}分钟前`;
    } else {
      return `${hours}小时前`;
    }
  }
}
export function handleToString(val) {
  if (val) {
    return val.toString();
  } else {
    return "";
  }
}
export function safeJsonStringInBrowser(str, removed) {
  //四个特殊换行符会导致浏览器json解析出错，需要处理。see this: http://timelessrepo.com/json-isnt-a-javascript-subset
  //如果 removed 为true，则将特殊字符删掉
  return str
    .replace(/\u2028/g, removed ? "" : "\\u2028")
    .replace(/\u2029/g, removed ? "" : "\\u2029")
    .replace(/\u000A/gi, removed ? "" : "\\n")
    .replace(/\u000D/gi, removed ? "" : "\\r");
}
/**
 * @date 2019-09-17
 * @desc 节流函数
 * @param {Function} callBack
 * @return {Function} fn
 * @author   mukuashi | mukuashi@icloud.com
 */
export function throttle(fn, delay = 500) {
  let prev = new Date();
  return function(...args) {
    const now = new Date();
    if (prev && now < prev + delay) {
      clearTimeout(timer);
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function() {
        prev = now;
        fn.apply(context, args);
      }, delay);
    } else {
      prev = now;
      fn.apply(context, args);
    }
  };
}
/**
 * @date 2019-09-17
 * @desc 防抖函数
 * @param {Function} callBack
 * @return {Function} fn
 * @author   mukuashi | mukuashi@icloud.com
 */
export function debounce(fn, delay = 500) {
  // 定时器，用来 setTimeout
  let timer;
  return function(...args) {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this;
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer);
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
/**
 * @date 2019-04-19
 * @desc deeply copy object or arrays with nested attributes
 * @param  {any} obj
 * @return {any} a depply copied replica of arguement passed
 * @author   mukuashi | mukuashi@icloud.com
 */
export function deepClone(obj) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  // 根据obj的类型判断是新建一个数组还是对象
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}
/**
 * @date 2019-12-19
 * @desc 正则匹配一段url
 * @param  {any} string
 * @return {any} Boolean
 * @author   mukuashi | mukuashi@icloud.com
 */
export function isUrl(param) {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
  return reg.test(param);
}
/**
 * @date 2020-01-05
 * @desc 判断某字符是否为number类型
 * @param  {any} string、number
 * @return {any} Boolean
 * @author   mukuashi | mukuashi@icloud.com
 */
export function isNumber(param) {
  return typeof param === "number" && isFinite(param);
}
// number单位数转换两位数
export function getTransformNumber(value) {
  return value < 10 ? `0${value}` : value;
}
/**
 * @date     2019-05-15
 * @time     时间戳毫秒数
 * @desc     获取日期，如20180705或指定格式间隔符
 * @returns  String
 * @author   mukuashi | mukuashi@icloud.com
 */
export function getCurrentDate(time, insert = "") {
  let date = time ? new Date(time) : new Date(),
    year = date.getFullYear(),
    month = getTransformNumber(date.getMonth() + 1),
    day = getTransformNumber(date.getDate()),
    week = ["末", "一", "二", "三", "四", "五", "六"][date.getDay()];
  return insert
    ? [year, month, day, week].join(insert)
    : [year, month, day, week];
}
