<template>
  <view>
    <web-view :src="webUrl"/>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 公共 Webview 落地页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-11-23 // Initial version.
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-03 15:41:22
 */
import { isUrl } from '@/utils/regexp';

export default {
  data() {
    return {
      // 默认打开链接
      webUrl: 'https://mp.weixin.qq.com/s/sy8iYBn_Yu95UUzyUyzTRg',
    };
  },
  onLoad(options) {
    // 上级页面webview不填url参数默认打开blog
    if (options.url) {
      if (isUrl(options.url)) {
        this.webUrl = options.url;
        uni.showShareMenu({
          withShareTicket: true,
          menus: ['shareAppMessage', 'shareTimeline'],
        });
      }
    }
  },
  onReady() {
    // 初始化分享配置（朋友、朋友圈）
    // #ifndef H5
    uni.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
    // #endif
  },
  onShareAppMessage(options) {
    const { shares } = this.app;
    return {
      title: shares.title,
      path: `pages/webview/index?url=${this.webUrl}`,
    };
  },
};
</script>