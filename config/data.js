/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 一些公共静态数据，减少server请求和业务模块里的重复定义，提高复用性
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-10 // Initial version.
 * @version 0.2 | 2020-03-26 // 添加海报配置.
 * @Date:   2019-07-10 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-18 22:27:54
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
  miniprogram: [
    {
      name: "米拍",
      path: "pages/otherUser/otherUser?userId=38224",
      url: "https://www.mepai.me/photographyer/u_592e418fe4a53",
      icon: "camera",
      type: "mepai",
      appid: "wxaddd5e379b1a72ee",
      gradient: "linear-gradient(to bottom, #f09819 0%, #ff5858 100%)"
    },
    {
      name: "美图",
      path: "profile/pages/personalPage?uid=1583559128",
      icon: "photos",
      type: "photos",
      appid: "wxbb7da23406addc2f",
      gradient: "linear-gradient(to bottom, #f78ca0 0%, #fb3c8f 100%);"
    },
    {
      name: "小红书",
      path: "pages/secondary/author/index?author_id=5b5d996f4eacab2d60ff6190",
      url: "https://www.xiaohongshu.com/user/profile/5b5d996f4eacab2d60ff6190",
      icon: "yoga",
      type: "xiaohongshu",
      appid: "wxffc08ac7df482a27",
      gradient: "linear-gradient(to bottom, #ffb199 0%,#ff0844 100%);"
    },
    {
      name: "绿洲",
      path: "pages/profile/profile?uid=2524813095",
      url: "https://m.oasis.weibo.cn/v1/h5/share?uid=2524813095",
      icon: "desert",
      type: "oasis",
      appid: "wx55926564822f5983",
      gradient: "linear-gradient(to bottom, #3cba92 0%, #0ba360 100%)"
    },
    {
      name: "像素蜜蜂",
      path: "pages/user/user?account=p47810601",
      url: "https://www.pixbe.com/photographer/p47810601",
      icon: "bee",
      type: "pixbe",
      appid: "wxef0633b7d41f9bb2",
      gradient: "linear-gradient(to bottom, #8aeee8 0%, #05b195 100%)"
    },
    {
      name: "500px",
      path: "pages/userInfo/userInfo?userId=862206f444ccbbf9947dd165e267f3713",
      url: "https://500px.me/PhotoArtLife",
      icon: "500px",
      type: "500px",
      appid: "wxfb1c0bd6179a8b50",
      gradient: "linear-gradient(to bottom, #e5b2ca 0%, #7028e4 100%);"
    },
    {
      name: "微博",
      path: "pages/profile/profile?objectUid=2524813095",
      url: "https://weibo.com/572512250",
      icon: "weibo",
      type: "weibo",
      appid: "wx9074de28009e1111",
      gradient: "linear-gradient(to bottom, #66deda 0%,#07C160 100%);"
    },
    {
      name: "开眼",
      path: "pages/author/author?id=302202231&type=NORMAL",
      icon: "eyes",
      type: "eyes",
      appid: "wxa717aca07db3bb5a",
      tipsImg:
        "https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la/static/miniprogram_eyepetizer.webp?sign=3974f219748cc0d423cbe283e5d0c692&t=1585548538",
      disable: true,
      gradient: "linear-gradient(to bottom, #68e0cf 0%,#209cff 100%)"
    },
    {
      name: "站酷",
      path: "pages/home/index?id=2766193",
      url: "https://photoartlife.zcool.com.cn",
      icon: "zcool",
      type: "zcool",
      appid: "wx4314e3b0d3cb43bf",
      gradient: "linear-gradient(to bottom, #68d3ce 0%, #6e45e2 100%);"
    }
  ],
  community: [
    {
      title: "WeChat",
      icon: "wechat",
      color: "#07C160",
      info: "再小的个体，也有自己的品牌",
      url:
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwOTE1MzYyNg==#wechat_redirect",
      tipsImg:
        "https://images.mepai.me/app/works/38224/2020-02-28/w_5e58d07ca4ab0/05e58d07ca4c0d.jpg!1200w.jpg"
    },
    {
      title: "LOFTER",
      icon: "lofter",
      color: "#345f61",
      info: "乐乎 - 让兴趣，更有趣",
      image:
        "https://lz.sinaimg.cn/orj1080/967d9727ly3gc80eywmgaj20hs0hs74z.jpg",
      url: "http://photoartlife.lofter.com"
    },
    {
      title: "Instagram",
      info: "简单、有趣、极富创意的分享动态",
      image:
        "https://seeklogo.com/images/I/instagram-new-2016-logo-D9D42A0AD4-seeklogo.com.png",
      url: "https://www.instagram.com/mukuashi",
      vpn: true
    },
    {
      title: "Behance",
      icon: "behance",
      color: "#0057ff",
      info: "展示并发现创意作品的精选平台",
      image:
        "http://hbimg.b0.upaiyun.com/660b49081f4f56581b72e80d57fe8ebf631a75958823-WT0ogD_fw658",
      url: "https://www.behance.net/PhotoArtLife",
      vpn: true
    },
    {
      title: "图虫",
      color: "#f33c31",
      info: "自由、优质摄影师交流社区",
      image:
        "http://file.market.xiaomi.com/thumbnail/PNG/l114/AppStore/0a7044e5762ff1406120a9e21ad611d8652435ba3",
      url: "https://photoartlife.tuchong.com"
    },
    {
      title: "VUE · Vlog",
      color: "#222",
      info: "Vlog、短视频拍剪创作分享社区",
      image: "https://vuevideo.net/style/vue.png",
      url: "https://m.vuevideo.net/share/user/mukuashi"
    },
    {
      title: "印象 · InterPhoto",
      info: "艺术、有格调生活的才华社区",
      image:
        "https://tva3.sinaimg.cn/crop.0.0.179.179.180/574e0622gw1f7z0nfh47dj20500503yk.jpg?KID=imgbed,tva&Expires=1585033639&ssig=OLg3WyGl0%2B",
      url: "https://cc.adnonstop.com/index.php?r=Info/Home&user_id=160818377"
    },
    {
      title: "MUX Lab",
      info: "Blog 1.x、2.x、3.x、4.x etc",
      image:
        "https://tvax3.sinaimg.cn/crop.4.0.1116.1116.180/967d9727ly8fftw9b3jmmj20v90v0wgq.jpg",
      url: "https://kquanr.com"
    },
    {
      title: "Keep运动助手（友情广告位）",
      icon: "keep",
      color: "#584F60",
      info: "主编增长和记录健身日志的地方",
      url: "https://show.gotokeep.com/users/56e63df098729e0563572e0b",
      path: "app/pages/user/index?uid=56e63df098729e0563572e0b",
      appid: "wxc96dc7ebd9bf61e8",
      type: "miniprogram"
    }
  ],
  products: [
    {
      title: "Asako Studio",
      info: "视觉影像与工程研究实验室、工作室",
      type: "miniprogram",
      image:
        "https://lz.sinaimg.cn/orj1080/967d9727ly3gcb9n1l134j20zk0zkq90.jpg",
      appid: "wx1014f2e01d1623f9"
    },
    {
      title: "浅子影报",
      info: "一页日历 · 伴你每天好心情 ☀️",
      type: "miniprogram",
      //image: 'https://lz.sinaimg.cn/osj1080/967d9727ly3gdfbnn3nnhj21jk1jktcq.jpg',
      gradient: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%);", // 渐变色
      icon: "drop",
      appid: "wxd452b156d966e65d",
      path: "/pages/poster/index"
    },
    {
      title: "PhotoArtLife·跨世",
      info: "一个设计师、摄影师的全栈之路",
      type: "miniprogram",
      image:
        "https://tvax3.sinaimg.cn/crop.4.0.1116.1116.180/967d9727ly8fftw9b3jmmj20v90v0wgq.jpg",
      path: "/pages/creator/index"
    },
    {
      title: "OTCC",
      info: "B/C2C数字货币交易服务提供商",
      image:
        "https://images.mepai.me/app/works/38224/2020-02-28/w_5e58c2f4175bf/05e58c2f417730.jpg!300w.jpg",
      url: "https://www.otcc.io",
      contact: {
        qrcode:
          "https://mmbiz.qpic.cn/mmbiz_jpg/g7N4GSDkLL6P7tL0Rtm5ExNnt3a6kHMSgog8hH6wibFpXG4oJLKib9V623yPARIpDrR9uwHZabSTHoGZOvHT9rRw/0?wx_fmt=jpeg"
      }
    },
    {
      title: "云雀传媒",
      icon: "v1",
      color: "#3cba92",
      info: "平面广告、设计及讲师服务站",
      url: "http://kquanr.com/1.x"
    },
    {
      title: "MUX Lab",
      icon: "v2",
      color: "#9b23ea",
      info: "摄影、短视频等影像创作孵化器",
      url: "http://kquanr.com/2.x"
    },
    {
      title: "Asako Cloud",
      icon: "v3",
      color: "#ff5858",
      info: "创作者的品牌营销中台",
      url: "http://kquanr.com"
    }
  ],
  attention: [
    {
      title: "Asako Studio",
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
      title: "PhotoArtLife",
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
