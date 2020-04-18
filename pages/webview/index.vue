<template>
  <view>
    <web-view :src="webUrl"/>
  </view>
</template>

<script>
import app from "@/config/data";
import { isUrl } from "@/utils";
export default {
  data() {
    return {
      // 默认打开链接
      webUrl: "https://mp.weixin.qq.com/s/sy8iYBn_Yu95UUzyUyzTRg"
    };
  },
  onLoad(options) {
    // 上级页面webview不填url参数默认打开blog
    if (options.url) {
      if (isUrl(options.url)) {
        this.webUrl = options.url;
      }
    }
  }
};
</script>