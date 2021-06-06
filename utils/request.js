/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 基于uni-request的二次扩展，Promise 对象实现的request使用方式，支持请求和响应拦截
 * @api https://uniapp.dcloud.io/api/request/request
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date:   2020-07-13 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-02-25 16:14:17
 */
import app from '@/config';
import storage from './storage';
import queryString from 'query-string';
import { getCommonReqParam, safeJsonStringInBrowser } from './index';

export default {
  request(options) {
    // 默认request配置
    const config = {
      data: {},
      method: 'GET',
      dataType: 'json' /* 如设为json，会对返回的数据做一次 JSON.parse */,
      responseType: 'text',
      timeout: 6000, // 超时时间
      success() {},
      fail() {},
      complete() {},
    };
    // 拦截器相关
    const interceptor = {
      request: null,
      response: null,
    };
    if (!options) options = {};
    if (!options?.header) options.header = {};
    // 自定义小程序请求auth info
    const openid = storage.get('openid', true);
    const unionid = storage.get('unionid', true);
    if (openid) options.header.openid = openid;
    if (unionid) options.header.unionid = unionid;
    // #ifdef MP
    options.header['x-app-platform'] = 'wechatapp';
    // #endif
    options = {
      ...config,
      ...options,
      url: options.baseUrl
        ? options.baseUrl + (options.url || '')
        : app.hosts[options.hostKey || 'api'] + (options.url || ''),
    };
    // md5(景区部门默认)
    if (options.md5) {
      const encrypt = queryString.stringify({
        ...getCommonReqParam(),
      }, {
        skipNull: true,
      });
      if (options.method.toLowerCase() === 'post') {
        options.url = `${options.url}&${encrypt}`;
      } else {
        options = {
          ...options,
          data: {
            ...options.data,
            ...getCommonReqParam(),
          },
        };
      }
    }
    return new Promise((resolve, reject) => {
      // 响应相关
      options.complete = (res) => {
        // 特殊返回结果出处理
        if (typeof res === 'object') {
          res = JSON.stringify(res);
          res = JSON.parse(safeJsonStringInBrowser(res, true));
        }
        res.config = options;
        // data || status
        const errToast = (info = {}) => {
          uni.showToast({
            title: (info?.data && (info.data.error || info.data.message || info.data.errMsg || info.data.text)) || '服务器开小差了 ～',
            icon: 'none',
          });
        };
        if (/20\d$/.test(String(res.statusCode))) {
          // 兼容部分接口返回data为空的情况
          resolve({ ...res.data, ok: true });
        } else {
          // 未登录或未签约等情况
          if (!options.hideToast) errToast(res.data);
          reject(res.data);
        }
        // 拦截response
        if (interceptor.response) {
          const newResponse = interceptor.response(res);
          if (newResponse) {
            res = newResponse;
          }
        }
        // 统一的响应日志记录
        _reslog(res);
      };
      options.fail = () => {};
      options.requestId = new Date().getTime();
      if (interceptor.request) {
        interceptor.request(options);
      }
      // 统一的请求日志记录
      _reqlog(options);
      //
      uni.request(options);
    }).catch((err) => {
      console.log(err);
    });
  },
};
/**
 * 请求接口日志记录
 */
function _reqlog(req) {
  console.log('💧请求信息：', req);
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
  console.log('🛢响应结果：', res.config.url, res.data);
}
