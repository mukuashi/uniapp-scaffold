/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 扩展相关配置
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date:   2019-07-08 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-13 20:08:02
 */
import { env } from "./env";

let path = env === "production" ? "" : `${env}.`;

export default {
  key: "muxlab",
  api: "http://api.kquanr.com", // 自定义测试环境开关
  sinaimg: "https://lz.sinaimg.cn", // 新浪微博、绿洲
  mepai: "https://api.mepai.me",
  _500px: "https://500px.me"
};
