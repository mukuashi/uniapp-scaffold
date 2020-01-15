/*
 * Copyright (c) 2014-Now MUX Lab, All rights reseved.
 * @fileoverview | 常用工具函数 utils
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date:   2019-07-08 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-01-13 12:43:37
*/
//匹配所有表情 表情格式:［xxxx］
function findCommentEmoticon(comment) {
  let re = new RegExp('[\u4e00-\u9fa5|\w]+(?=\])', 'g')
  let emojiMatch = comment.match(re); //只取中括号中的内容
  let emoji = []; //去重后的表情 array
  if (emojiMatch) {
    for (let i in emojiMatch) { //表情去重
      if (!emoji.includes(emojiMatch[i])) {
        emoji.push(emojiMatch[i])
      }
    }
  }
  return emoji;
}

export function handleDateFactory(date) {
  if (!date) return
  let today = new Date();
  let mdate = new Date(date);
  let intervalTime = today.getTime() - mdate.getTime();
  let hours = parseInt(intervalTime / parseInt(1000 * 60 * 60));
  if (hours > 24) {
    return date.split('T')[0].replace(/\-/g, "/");
  } else {
    intervalTime = intervalTime % parseInt(1000 * 60 * 60);
    let minutes = parseInt(intervalTime / parseInt(1000 * 60));
    if (hours < 1) {
      return `${ minutes }分钟前`
    } else {
      return `${ hours }小时前`
    }
  }
}
export function handleToString(val) {
  if (val) {
    return val.toString();
  } else {
    return ''
  }
}
export function handlePlaceFactory(province, city, district, place) {
  if (province !== '' && city !== '' && province === city) {
    return city + district + place;
  }
  return province + city + district + place;
}
export function safeJsonStringInBrowser(str, removed) {
  //四个特殊换行符会导致浏览器json解析出错，需要处理。see this: http://timelessrepo.com/json-isnt-a-javascript-subset
  //如果 removed 为true，则将特殊字符删掉
  return str.replace(/\u2028/g, removed ? '' : '\\u2028')
    .replace(/\u2029/g, removed ? '' : '\\u2029')
    .replace(/\u000A/ig, removed ? '' : '\\n')
    .replace(/\u000D/ig, removed ? '' : '\\r');
}