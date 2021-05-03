/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 常用工具函数 utils
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @version 0.2 | 2021-03-15 // 添加hexToRgba等.
 * @Date:   2020-07-13 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-24 20:02:03
 */
import md5 from 'md5';
import { isNumber } from './regexp';

export function safeJsonStringInBrowser(str, removed) {
  // 四个特殊换行符会导致浏览器json解析出错，需要处理。see this: http://timelessrepo.com/json-isnt-a-javascript-subset
  // 如果 removed 为true，则将特殊字符删掉
  return str
    .replace(/\u2028/g, removed ? '' : '\\u2028')
    .replace(/\u2029/g, removed ? '' : '\\u2029')
    .replace(/\u000A/gi, removed ? '' : '\\n')
    .replace(/\u000D/gi, removed ? '' : '\\r');
}
/**
 * @date 2020-07-13
 * @desc 节流函数
 * @param {Function} callBack
 * @return {Function} fn
 * @author   mukuashi | mukuashi@icloud.com
 */
export function throttle(fn, delay = 500) {
  let prev = new Date();
  return function (...args) {
    const now = new Date();
    if (prev && now < prev + delay) {
      clearTimeout(timer);
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(() => {
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
 * @date 2020-07-13
 * @desc 防抖函数
 * @param {Function} callBack
 * @return {Function} fn
 * @author   mukuashi | mukuashi@icloud.com
 */
export function debounce(fn, delay = 500) {
  // 定时器，用来 setTimeout
  let timer;
  return function (...args) {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this;
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer);
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
/**
 * @date 2020-07-13
 * @desc deeply copy object or arrays with nested attributes
 * @param  {any} obj
 * @return {any} a depply copied replica of arguement passed
 * @author   mukuashi | mukuashi@icloud.com
 */
export function deepClone(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  // 根据obj的类型判断是新建一个数组还是对象
  const newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}

// number单位数转换两位数
export function getTransformNumber(value, type = 'string') {
  const newVal = value < 10 ? `0${value}` : value;
  return !type || type === 'string' ? String(newVal) : Number(newVal);
}
/**
 * @date     2020-07-13
 * @time     时间戳毫秒数
 * @desc     获取日期，如20180705或指定格式间隔符
 * @returns  String
 * @author   mukuashi | mukuashi@icloud.com
 */
export function getCurrentDate(time, insert = '') {
  const date = time ? new Date(time) : new Date();
    const year = date.getFullYear();
    const month = getTransformNumber(date.getMonth() + 1);
    const day = getTransformNumber(date.getDate());
    const week = ['末', '一', '二', '三', '四', '五', '六'][date.getDay()];
  return insert
    ? [year, month, day, week].join(insert)
    : [year, month, day, week];
}
/**
 * @date 2020-11-24
 * @desc   自定义加密参数
 * @param  { key,time,md5 }
 * @return { Object }
 * @author mukuashi@icloud.com
 */
export function getCommonReqParam() {
  const key = '3JFslgL6ZYMmU8Ye';
  const time = new Date().getTime();
  let md5OriginStr = `${key + time}`;
  md5OriginStr = md5OriginStr.slice(3, md5OriginStr.length - 1);
  return {
    time,
    md5: md5(md5OriginStr),
  };
}
/**
 * @date 2020-08-14
 * @desc   全面展开树结构
 * @param  { [] }
 * @return { [] }
 * @author mukuashi@icloud.com
 */
export function getTreeServiceKey(data, serviceKey = null) {
  if (!data || !Array.isArray(data)) return;
  for (const row of data) {
    if (row.region_tree) {
      serviceKey = row.service_key;
    }
    if (row.region_tree || row.children) {
      row.service_key = serviceKey;
      for (const item of row.region_tree || row.children) {
        item.service_key = item.service_key || serviceKey;
        if (item.children) {
          getTreeServiceKey(item.children, serviceKey);
        }
      }
    }
  }
}
/**
 * @date 2020-11-14
 * @desc   选中树
 * @param  { array,index }
 * @return { array }
 * @author mukuashi@icloud.com
 */
export function getTreeSelected(data, payload) {
  if (!data || !Array.isArray(data)) return;
  for (const row of data) {
    if (!payload.sid && !payload.adcode) {
      row.selected = true;
      return;
    }
    const scenicRegionCheck = () => {
      if (payload.sid) {
        if (payload.sid === row.sid) {
          row.selected = true;
          return;
        }
      } else if (payload.adcode === row.adcode) {
        row.selected = true;
        return;
      }
    };
    if (row.children && Array.isArray(row.children)) {
      scenicRegionCheck();
      for (const item of row.children) {
        if (payload.sid) {
          if (payload.sid === item.sid) {
            item.selected = true;
            return;
          }
        } else if (payload.adcode === item.adcode) {
          item.selected = true;
          return;
        }
        if (item.children) getTreeSelected(item.children, payload);
      }
    } else scenicRegionCheck();
  }
}
/**
 * @date 2020-08-14
 * @desc   重置树激活状态结构
 * @param  { data [], current(选中项) }
 * @return { [] }
 * @author mukuashi@icloud.com
 */
export function getResetTree(data, current) {
  if (!data || !Array.isArray(data)) return;
  for (const row of data) {
    if (row.selected) {
      delete row.selected;
    }
    if (row.children) {
      getResetTree(row.children, current);
    }
  }
}
/**
 * @date 2020-08-14
 * @desc   拍平树结构，取出所有含有子树的结构（children）
 * @param  { [] }
 * @return { [] }
 * @author mukuashi@icloud.com
 */
export function getTreeChilds(data, result = []) {
  if (!data || !Array.isArray(data)) return;
  for (const row of data) {
    result.push(row);
    if (row.children) {
      for (const item of row.children) {
        result.push(item);
        if (item.children) {
          getTreeChilds(item.children, result);
        }
      }
    }
  }
  return result;
}
/**
 * @date 2020-08-03
 * @desc   对行政区/自治区/自治州/自治县等地区的缩略
 * @param  {any} （string，length = 2 截取字符长度）
 * @return {any}  new string
 * @author mukuashi@icloud.com
 */
export function getCityDistrictFactory(str, length = 2) {
  return str.includes('行政区') || str.includes('自治区') || str.includes('自治州') || str.includes('自治县')
    ? str.substring(0, length)
    : str;
}
/**
 * @date 2020-08-26
 * @desc   全国城市聚合成省份
 * @param  { [] } 城市列表
 * @return { [] } 省份列表
 * @author mukuashi@icloud.com
 */
export function getProvincesFactory(origin = []) {
  const provinces = [];
  if (origin && origin.length) {
    for (const item of origin) {
      if (!provinces.includes(item.province)) {
        provinces.push(item.province);
      }
    }
  }
  return provinces.map((row) => {
    const proList = origin.filter(item => item.province === row);
    return {
      name: !row.includes('省') ? row.substring(0, 2) : row,
      value: proList.reduce((prev, curr) => prev + curr.percent, 0),
    };
  }).sort((a, b) => b.value - a.value);
}

/**
 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
 * v-for的时候,推荐使用后端返回的id而不是循环的index
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
export function getUid(len = 32, firstU = true, radix = null) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	const uuid = [];
	radix = radix || chars.length;

	if (len) {
		// 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
		for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		let r;
		// rfc4122标准要求返回的uuid中,某些位为固定的字符
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		for (let i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
	if (firstU) {
		uuid.shift();
		return `u${  uuid.join('')}`;
	}
		return uuid.join('');
}
/**
 * @date 2020-11-12
 * @desc   景区或区划开闭园时间整点格式化，时间格式统一化，比如 6:30=>06:30
 * @param  {Array}
 * @return {Array}  new array
 * @author mukuashi@icloud.com
 */
export function  getNowTimeFactory(list = []) {
  // 时间格式统一化，比如 6:30=>06:30
  const timeFactory = (time) => {
    const arr = time.split(':');
    return `${getTransformNumber(Number(arr[0]))}:${arr[1]}`;
  };
  // 非整点时间 => 整点
  const pointFactory = (time, type) => {
    const arr = time.split(':');
    let point;
    // 开园时间向前取整，闭园时间向后取整
    if (type === 'begin') {
      point = Number(arr[0]);
    }
    if (type === 'end') {
      point = Number(arr[1]) && Number(arr[0]) < 23 ? Number(arr[0]) + 1 : Number(arr[0]);
    }
    return `${getTransformNumber(point)}:00`;
  };
  return list.map((row) => {
    if (row.sid) return {
      ...row,
      open_time: timeFactory(row.open_time),
      close_time: timeFactory(row.close_time),
      begin_point: pointFactory(row.open_time, 'begin'),
      end_point: pointFactory(row.close_time, 'end'),
    };
    return row;
  });
}

/**
 * 去重
 * @param  {Array}
 * @return {Array} new array
 */
export function unique(list = [], key) {
  if (!key) return [...new Set(list)];
  const set = new Set();
  return list.filter((row) => {
    if (!row.hasOwnProperty(key)) return;
    if (!set.has(row[key])) {
      set.add(row[key]);
      return row;
    }
    return;
  });
}
/**
 * @date 2020-12-06
 * @desc   添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
 * @param  (value & unit)
 * @author mukuashi@icloud.com
 */
export function addUnit(value = 'auto', unit = 'rpx') {
  // 用内置验证规则中的number判断是否为数值
  return isNumber(value) ? `${value}${unit}` : value;
}
/**
 * @date  2020-12-06
 * @desc  判断点是否在单面内
 * @param {*} point 当前坐标
 * @param {*} polygonPoints 对应面多边形
 * @author mukuashi@icloud.com
 */
export function isInside(point, polygonPoints) {
  let inside = false;

  if (!point || !polygonPoints || !polygonPoints.length) {
    return inside;
  }

  const x = point.latitude;
  const y = point.longitude;

  for (let i = 0, j = polygonPoints.length - 1; i < polygonPoints.length; j = i++) {
    const xi = parseFloat(polygonPoints[i].latitude);
    const yi = parseFloat(polygonPoints[i].longitude);
    const xj = parseFloat(polygonPoints[j].latitude);
    const yj = parseFloat(polygonPoints[j].longitude);

    const intersect = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
/**
 * @date  2020-12-06
 * @desc  判断一个点是否在多边形内(多面)
 * @param {*} point 当前坐标
 * @param {*} aoi 对应面多边形
 * @author mukuashi@icloud.com
 */
export function isInPolygon(point, aoi) {
  if (!point || !aoi || !aoi.length) {
    return false;
  }
  for (const row of aoi) {
    if (isInside(point, row)) {
      return true;
    }
  }
  return false;
}
/**
 * 通过经纬度坐标获取墨卡托坐标
 * @param {Object}  包含经纬度的json
 */
export function toMercator(options) {
  const MAXEXTENT = 20037508.342789244;
  const A = 6378137.0;
  const D2R = Math.PI / 180;
  const latitude = options.latitude || options.lat;
  const longitude = options.longitude || options.lng;
  const xy = [A * longitude * D2R, A * Math.log(Math.tan(Math.PI * 0.25 + 0.5 * latitude * D2R))];
  // if xy value is beyond maxextent (e.g. poles), return maxextent.
  xy[0] > MAXEXTENT && (xy[0] = MAXEXTENT);
  xy[0] < -MAXEXTENT && (xy[0] = -MAXEXTENT);
  xy[1] > MAXEXTENT && (xy[1] = MAXEXTENT);
  xy[1] < -MAXEXTENT && (xy[1] = -MAXEXTENT);
  return {
    x: xy[0],
    y: xy[1],
  };
}

/**
 * 墨卡托转经纬度
 */
export function toLatLng(point) {
  if (point == null) {
    return null;
  }
  // EPSG:900913 正轴墨卡托投影坐
  const flonConver = (point.x * 180) / 20037508.34;
  let flatConver = (point.y * 180) / 20037508.34;

  flatConver = (180 / Math.PI) * (2 * Math.atan(Math.exp((flatConver * Math.PI) / 180)) - Math.PI / 2);

  return {
    lat: flatConver,
    lng: flonConver,
  };
}
/**
 * 距离单位换算
 * @param  Number
 */
export function distanceUnit (dis) {
  if (dis < 1000) return `${dis.toFixed(1) }米`;
  return `${(Math.round(dis / 100) / 10).toFixed(1)  }公里`;
}

/**
 * 计算两点距离
 * @param {Object}  包含经纬度坐标的json
 * {  x: xxx米 y: xxx米 }
 */

export function getDistance(p1, p2) {
  p1 = toMercator(p1);
  p2 = toMercator(p2);
  const a = Math.abs(p1.x - p2.x);
  const b = Math.abs(p1.y - p2.y);
  return Math.pow(a * a + b * b, 0.5);
}

/**
* @date  2020-12-07
* @desc  随机命中给定数组的一条作为结果返回
* @param {Array} 给定数组
* @author mukuashi@icloud.com
*/
export function getRandomItem(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}
/**
 * 2021-03-15
 * @desc 16进制颜色值转rgba值，支持透明度配置
 * @param {*} hex 
 * @param {*} opacity 
 * @returns rgba
 * @author mukuashi@icloud.com
 */
export function getHexToRgba(hex, opacity) {
  return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')'
}