/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 一些公共静态数据，减少server请求和业务模块里的重复定义，提高复用性
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-10 // Initial version.
 * @version 0.2 | 2020-03-26 // 添加海报配置.
 * @Date:   2019-07-10 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:34:34
 */
import verses from "./verses";
import wallpapers from "./wallpapers";

const domain = {
  api: "http://api.kquanr.com", // 通用api
  sinaimg: "https://lz.sinaimg.cn", // 新浪微博、绿洲
  mepai: "https://api.mepai.me",
  _500px: "https://500px.com.cn",
  lbs: 'https://apis.map.qq.com',
  weather: 'https://wis.qq.com',
  cloud: {
    studio: 'https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la',
    daily: 'https://6173-asako-daily-avyxm-1301749635.tcb.qcloud.la',
    living: 'https://6173-asako-living-o28nn-1301956907.tcb.qcloud.la'
  }
};

// 常用渐变色库
const gradients = [
  'linear-gradient(to bottom, #f78ca0 0%, #fb3c8f 100%)',
  'linear-gradient(to bottom, #f09819 0%, #ff5858 100%)',
  'linear-gradient(to bottom, #FBDA61 0%, #FF5ACD 100%)',
  'linear-gradient(to bottom, #ffb199 0%, #ff0844 100%)',
  'linear-gradient(to bottom, #68e0cf 0%, #209cff 100%)',
  'linear-gradient(to bottom, #0093E9 0%, #08AEEA 100%)',
  'linear-gradient(to bottom, #8ddad5 0%, #0ba360 100%)',
  'linear-gradient(to bottom, #3cba92 0%, #0ba360 100%)',
  'linear-gradient(to bottom, #88d3ce 0%, #6e45e2 100%)',
  'linear-gradient(to bottom, #e5b2ca 0%, #7028e4 100%)',
];

// 常用轮播静态图
const gallery = [
  '/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg',
  '/orj1080/967d9727ly3gc0whyclfoj20sg0sge0a.jpg',
  '/orj1080/967d9727ly3gc0whykstlj20sg0sgb29.jpg',
  '/orj1080/967d9727ly3gc0whywdupj20sg0sgb0l.jpg',
  '/orj1080/967d9727ly3gc0whysphij20sg0sgkcg.jpg',
  '/orj1080/967d9727ly3gc0whyiy96j20sg0sg1jj.jpg',
  '/orj1080/967d9727ly3gc0whz3i51j20sg0sgu0x.jpg',
  '/orj1080/967d9727ly3gc0whz6qvlj20sg0sghdt.jpg',
  '/orj1080/967d9727ly3gc0whz6yf1j20sg0sgkic.jpg',
].map(row => `${domain.sinaimg}${row}`);

// loading
const loading = [
  'loading_01.gif',
  'loading_02.gif',
  'loading_03.gif',
].map(row => `${domain.cloud.studio}/static/loading/${row}`);
  
// animate name list
const animations = [
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat',
  'backInDown',
  'backInLeft',
  'backInRight',
  'backInUp',
  'backOutDown',
  'backOutLeft',
  'backOutRight',
  'backOutUp',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeInTopLeft',
  'fadeInTopRight',
  'fadeInBottomLeft',
  'fadeInBottomRight',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'fadeOutTopLeft',
  'fadeOutTopRight',
  'fadeOutBottomRight',
  'fadeOutBottomLeft',
  'flip',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'lightSpeedInRight',
  'lightSpeedInLeft',
  'lightSpeedOutRight',
  'lightSpeedOutLeft',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp',
];

export default {
  // 壁纸集
  wallpapers,
  // 谚语诗句
  verses,
  domain,
  gradients,
  gallery,
  loading,
  animations,
  // 语言类型
  languages: [
    {
      type: 'English',
      text: 'English',
    },
    {
      type: 'Chinese',
      text: '简体中文',
      abbr: '中文'
    },
  ],
  images: {
    loading: `${domain.cloud.studio}/static/images/loading_default.svg`,
    logo: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM6kicJlR84fRiaDQnMciackIRDYXCN0tibZibGiadLWVYO2N3eg/0"
  },
  // 优先级 appid > path > target > url
  // 优先打开其他小程序 > 当前小程序内页面 > 可在app内打开的h5 > 不可在app内打开的h5（action-sheet引导方式）
  products: [
    {
      name: "Asako Studio",
      desc: "视觉影像与工程研究实验室、工作室",
      type: "miniprogram",
      avatar: "https://lz.sinaimg.cn/orj1080/967d9727ly3gcb9n1l134j20zk0zkq90.jpg",
      appid: "wx1014f2e01d1623f9"
    },
    {
      name: "浅子影报",
      desc: "一页日历 · AI 精选全球视觉与摄影艺术",
      type: "miniprogram",
      gradient: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%);", // 渐变色
      icon: "drop",
      appid: "wxd452b156d966e65d"
    },
    {
      name: "浅子居家",
      desc: "悦读精致生活，亲手 DIY 你的家",
      type: "miniprogram",
      avatar: `${domain.cloud.living}/static/logo/Asako%20Living_sl.png`,
      appid: "wx1bff9cb67feb77b3"
    },
    {
      name: "跨世_PhotoArtLife",
      desc: "一个设计师、摄影师的全栈之路",
      type: "miniprogram",
      avatar: "https://tvax3.sinaimg.cn/crop.4.0.1116.1116.180/967d9727ly8fftw9b3jmmj20v90v0wgq.jpg",
      appid: "wxd452b156d966e65d",
      path: "/pages/creator/index?source=asako_ued"
    },
    {
      name: "OTCC",
      desc: "B/C2C数字货币交易服务提供商",
      avatar: "https://images.mepai.me/app/works/38224/2020-02-28/w_5e58c2f4175bf/05e58c2f417730.jpg!300w.jpg",
      url: "https://www.otcc.io",
      contact: {
        qrcode: `${domain.cloud.studio}/static/images/qrcode_team_02.jpeg`
      }
    },
    {
      name: "云雀传媒",
      icon: "v1",
      color: "#3cba92",
      desc: "平面广告、设计及讲师服务站",
      url: "http://kquanr.com/1.x"
    },
    {
      name: "MUX Lab",
      icon: "v2",
      color: "#9b23ea",
      desc: "摄影、短视频等影像创作孵化器",
      url: "http://kquanr.com/2.x"
    },
    {
      name: "Asako Cloud",
      icon: "v3",
      color: "#ff5858",
      desc: "创作者的品牌营销中台",
      url: "http://kquanr.com"
    },
  ],
  components: [
    {
      name: '色彩',
      icon: 'heart_beat',
      gradient: gradients[0],
      path: '/pages/adui/colors/index',
    },
    {
      name: '图标',
      icon: 'explore',
      gradient: gradients[1],
      path: '/pages/adui/icons/index',
    },
    {
      name: '基础组件',
      icon: 'cafe',
      gradient: gradients[2],
      path: '/pages/adui/basic/index',
    },
    {
      name: '交互组件',
      icon: 'message',
      gradient: gradients[3],
      path: '/pages/adui/interact/index',
    },
    {
      name: '布局组件',
      icon: 'layout',
      gradient: gradients[4],
      path: '/pages/adui/layout/index',
    },
    {
      name: '表单组件',
      icon: 'form',
      gradient: gradients[5],
      path: '/pages/adui/form/index',
    },
    {
      name: '视图组件',
      icon: 'view',
      gradient: gradients[6],
      path: '/pages/adui/views/index',
    },
    {
      name: '动画组件',
      icon: 'animation',
      gradient: gradients[7],
      path: '/pages/adui/animation/index',
    }
  ],
  attention: [
    {
      name: "Asako Studio",
      desc: "分享一些沉淀技术和打磨产品的姿势",
      type: "wechat",
      avatar: "https://lz.sinaimg.cn/orj1080/967d9727ly3gcb9n1l134j20zk0zkq90.jpg",
      target: "https://mp.weixin.qq.com/s/TeRiItQrpMY8dooQopDN3A",
      contact: {
        qrcode: "https://mmbiz.qpic.cn/mmbiz_png/RZ7hBsicjvZjBWgNdlViaovUdVWHQGHH8BJicUJwdgiaSDReZwricjYZrB7V0XqWmQ6cScaL2aqAZNlicGJM22aoMxgg/0?wx_fmt=png"
      }
    },
    {
      name: "PhotoArtLife",
      desc: "记录摄影、设计及产品等探索学习之路",
      type: "wechat",
      avatar: "https://tvax3.sinaimg.cn/crop.4.0.1116.1116.180/967d9727ly8fftw9b3jmmj20v90v0wgq.jpg",
      target: "https://mp.weixin.qq.com/s/sy8iYBn_Yu95UUzyUyzTRg",
      contact: {
        qrcode: "https://images.mepai.me/app/works/38224/2020-02-28/w_5e58d07ca4ab0/05e58d07ca4c0d.jpg!1200w.jpg"
      }
    }
  ],
  team: [
    {
      name: "跨世_PhotoArtLife",
      avatar: "https://tvax3.sinaimg.cn/crop.4.0.1116.1116.180/967d9727ly8fftw9b3jmmj20v90v0wgq.jpg",
      tipsImg: `${domain.cloud.studio}/static/images/qrcode_team_01.jpeg`,
      role: "Founder、Creator、Photographer",
      url: "http://kquanr.com",
      founder: true // 展示个人资料
    },
    {
      name: "James",
      avatar: "http://wx.qlogo.cn/mmopen/lx6nJKHrPibX4TYXXrvNMVoeBf923oQx09OeCP8X7rSajibKtkuyJcticDhSQNhgvqKx46ngn9YHiciaPKLRJYQQY5kV7DRor4OYJ/0",
      tipsImg: `${domain.cloud.studio}/static/images/qrcode_team_02.jpeg`,
      role: "Market Director、Hacker",
      url: "https://www.otcc.io"
    },
    {
      name: "Huaa",
      avatar: `${domain.cloud.studio}/static/images/team_avatar_Huaa.jpeg`,
      role: "Co-founder、Business VP",
      target: "https://mp.weixin.qq.com/s/TeRiItQrpMY8dooQopDN3A"
    },
    {
      name: "JJaelyn",
      avatar: `${domain.cloud.studio}/static/images/team_avatar_JJaelyn.jpeg`,
      role: "Chief Model、Actor",
      target: "https://mp.weixin.qq.com/s/TeRiItQrpMY8dooQopDN3A"
    },
    {
      name: "Hepburn",
      avatar: "https://tvax4.sinaimg.cn/crop.0.0.1002.1002.180/007q1594ly8garlm6zz9aj30ru0rutc2.jpg",
      role: "Engineer、Outdoor Explorer",
      target: "https://mp.weixin.qq.com/s/sy8iYBn_Yu95UUzyUyzTRg"
    },
    {
      name: "Asako Studio",
      avatar: "https://lz.sinaimg.cn/orj1080/967d9727ly3gc0whyiy96j20sg0sg1jj.jpg",
      role: "Designer、Artist、Blogger",
      target: "https://mp.weixin.qq.com/s/sy8iYBn_Yu95UUzyUyzTRg"
    },
    {
      name: "MUX lab",
      avatar: `${domain.cloud.studio}/static/images/team_avatar_ guests.gif`,
      role: "Mystery Product Owner",
      target: "https://mp.weixin.qq.com/s/TeRiItQrpMY8dooQopDN3A"
    }
  ],
  mission: [
    "我们会陆续开源和提供一系列服务于摄影师、设计师、KOL、讲师、媒体人、博主等创作者的一站式多平台工具，赋能个体的力量，让世界回应与你志同道合的声音。",
    "艺术源于生活，反哺于生活。",
    "一个致力于视觉影像与工程研究的实验室、工作室",
    "—— 浅子艺术工作室"
  ],
  shares: {
    title: "一个高复用性产品交互和前端设计解决方案"
  }
};
