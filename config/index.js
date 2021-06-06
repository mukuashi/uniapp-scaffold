/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 扩展相关配置
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date:   2019-07-08 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:58:59
 */
import data from './data';

const env = process.env.NODE_ENV;
console.log(`当前运行环境：${env}`);

const isProd = env === 'production';

export default {
  env,
  prefix: 'ad',
  key: "asako-design",
  hosts: {
    ...data.domain
  },
  theme: {
    default: '#623bff',
    miniprogram: '#6367ef',
    wechat: '#07C160',
    warning: '#ff9900',
    info: '#2db7f5',
    success: '#24c789',
    error: '#e53a37',
    disable: '#dee2e6',
    colors: ['#24c789', '#6367ef', '#23A0FA', '#9beb23', '#e1eb21', '#09d9e0'],
  },
  // 核心数据，如 appid、key等
  core: {
    appId: 'wx8106d3961f485f43', // 小程序appid
    // lbs
    lbs: {
      key: '',
    }
  },
  ...data
};
