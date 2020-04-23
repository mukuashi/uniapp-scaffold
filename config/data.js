/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 一些公共静态数据，减少server请求和业务模块里的重复定义，提高复用性
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-10 // Initial version.
 * @version 0.2 | 2020-03-26 // 添加海报配置.
 * @Date:   2019-07-10 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-23 15:08:29
 */
import verses from "./verses";
import wallpapers from "./wallpapers";
// 基本图片配置
let images = {
  loading:
    "https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la/static/loading_default.svg?sign=f0e6c72f6e2dc9314f5e6117acf258b7&t=1585201163",
  logo:
    "https://images.mepai.me/app/u/38224/avatar_0592e4e09e3051.jpg!170x170.jpg"
};
//
export default {
  // 优先级 appid > path > target > url
  // 优先打开其他小程序 > 当前小程序内页面 > 可在app内打开的h5 > 不可在app内打开的h5（action-sheet引导方式）
  products: [
    {
      name: "Asako Studio",
      info: "视觉影像与工程研究实验室、工作室",
      type: "miniprogram",
      image:
        "https://lz.sinaimg.cn/orj1080/967d9727ly3gcb9n1l134j20zk0zkq90.jpg",
      appid: "wx1014f2e01d1623f9"
    },
    {
      name: "浅子影报",
      info: "一页日历 · AI 精选全球视觉与摄影艺术",
      type: "miniprogram",
      //image: 'https://lz.sinaimg.cn/osj1080/967d9727ly3gdfbnn3nnhj21jk1jktcq.jpg',
      gradient: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%);", // 渐变色
      icon: "drop",
      appid: "wxd452b156d966e65d",
      path: "/pages/poster/index"
    },
    {
      name: "PhotoArtLife·跨世",
      info: "一个设计师、摄影师的全栈之路",
      type: "miniprogram",
      image:
        "https://tvax3.sinaimg.cn/crop.4.0.1116.1116.180/967d9727ly8fftw9b3jmmj20v90v0wgq.jpg",
      path: "/pages/creator/index"
    },
    {
      name: "OTCC",
      info: "B/C2C数字货币交易服务提供商",
      image:
        "https://images.mepai.me/app/works/38224/2020-02-28/w_5e58c2f4175bf/05e58c2f417730.jpg!300w.jpg",
      url: "https://www.otcc.io",
      contact: {
        qrcode:
          "https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la/static/wx-founder-2.jpeg?sign=04f5355296b6896f0506cc7eaf09ee9f&t=1587282884"
      }
    },
    {
      name: "云雀传媒",
      icon: "v1",
      color: "#3cba92",
      info: "平面广告、设计及讲师服务站",
      url: "http://kquanr.com/1.x"
    },
    {
      name: "MUX Lab",
      icon: "v2",
      color: "#9b23ea",
      info: "摄影、短视频等影像创作孵化器",
      url: "http://kquanr.com/2.x"
    },
    {
      name: "Asako Cloud",
      icon: "v3",
      color: "#ff5858",
      info: "创作者的品牌营销中台",
      url: "http://kquanr.com"
    }
  ],
  attention: [
    {
      name: "Asako Studio",
      info: "分享一些沉淀技术和打磨产品的姿势",
      type: "wechat",
      image:
        "https://lz.sinaimg.cn/orj1080/967d9727ly3gcb9n1l134j20zk0zkq90.jpg",
      url: "https://mp.weixin.qq.com/s/TeRiItQrpMY8dooQopDN3A",
      contact: {
        qrcode:
          "https://mmbiz.qpic.cn/mmbiz_png/RZ7hBsicjvZjBWgNdlViaovUdVWHQGHH8BJicUJwdgiaSDReZwricjYZrB7V0XqWmQ6cScaL2aqAZNlicGJM22aoMxgg/0?wx_fmt=png"
      },
      official: true // 是否添加引导关注组件
    },
    {
      name: "PhotoArtLife",
      info: "记录摄影、设计及产品等探索学习之路",
      type: "wechat",
      image:
        "https://tvax3.sinaimg.cn/crop.4.0.1116.1116.180/967d9727ly8fftw9b3jmmj20v90v0wgq.jpg",
      url: "https://mp.weixin.qq.com/s/sy8iYBn_Yu95UUzyUyzTRg",
      contact: {
        qrcode:
          "https://images.mepai.me/app/works/38224/2020-02-28/w_5e58d07ca4ab0/05e58d07ca4c0d.jpg!1200w.jpg"
      }
    }
  ],
  mission: [
    "我们会陆续开源和提供一系列服务于摄影师、设计师、KOL、讲师、媒体人、博主等创作者的一站式多平台工具，赋能个体的力量，让世界回应与你志同道合的声音。",
    "艺术源于生活，反哺于生活。",
    "一个致力于视觉影像与工程研究的实验室、工作室",
    "—— 浅子文化工作室"
  ],
  common: {
    solgan: "再小的个体，也有自己的声音。",
    description: "一个致力于视觉影像与工程研究的实验室、工作室等"
  },
  images,
  // 壁纸集
  wallpapers,
  // 谚语诗句
  verses
};
