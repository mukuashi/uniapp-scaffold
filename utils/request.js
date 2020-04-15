/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 基于uni-request的二次扩展，Promise 对象实现的request使用方式，支持请求和响应拦截
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date:   2019-07-08 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-29 18:33:34
*/
import globalConfig from '@/config';
import { safeJsonStringInBrowser } from "./index";
// 拦截器，interceptor.request或response可以单独封装http处理
export default {
	request(options) {
		// 默认request配置
		const config = {
			baseUrl: options.baseUrl || globalConfig.api,
			header: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {},
			method: "GET",
			dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
			responseType: "text",
			success() { },
			fail() { },
			complete() { }
		}
		// 拦截器相关
		const interceptor = {
			request: null,
			response: null
		}

		if (!options) options = {}
		options = {
			...options,
			baseUrl: options.baseUrl || config.baseUrl,
			dataType: options.dataType || config.dataType,
			url: options.url.includes('com') && options.url.includes('http') ? options.url : config.baseUrl + options.url,
			data: options.data || {},
			method: options.method || config.method
		}
		// token及自定义header
		options.header = Object.assign({}, options.header)

		return new Promise((resolve, reject) => {
			let _config = null
			// 响应相关
			options.complete = (res) => {
				if (typeof (res) === 'object') {
					res = JSON.stringify(res)
					res = JSON.parse(safeJsonStringInBrowser(res, true))
				}
				res.config = _config
				// data || status
				const errToast = () => {
					uni.showToast({
						title: res.data && (res.data.text || res.data.message || res.data.error || res.data.errMsg) || '服务器开小差了 ～',
						icon: 'none'
					})
				}
				const redirectTo = () => {
					// 500ms后重定向到登录页
					setTimeout(_ => {

					}, 1000)
				}
				if (/20\d$/.test(String(res.statusCode))) {
					// 兼容su部分接口返回data为空的情况
					resolve({ ...res.data, ok: true })
				} else if (res.statusCode === 401 || res.statusCode === 400) {
					// 未登录情况或密码修改重定向登录
					errToast()
					redirectTo()
				} else {
					errToast()
					reject(res.data)
				}
				// 拦截response
				if (interceptor.response) {
					let newResponse = interceptor.response(res)
					if (newResponse) {
						res = newResponse
					}
				}
				// 统一的响应日志记录
				_reslog(res)
			}
			options.fail = (res) => {

			}
			// 请求相关
			_config = Object.assign({}, config, options)
			_config.requestId = new Date().getTime()
			if (interceptor.request) {
				interceptor.request(_config)
			}
			// 统一的请求日志记录
			_reqlog(_config)
			uni.request(_config)
		})
	},
	// 一些快捷操作function
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}
/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("请求【" + req.requestId + "】 地址：" + req.url)
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		console.log("返回【" + res.config.requestId + "】 地址：" + res.config.url)
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch (_statusCode) {
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}