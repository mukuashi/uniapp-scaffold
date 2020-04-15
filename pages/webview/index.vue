<template>
  <view>
    <web-view :webview-styles="webviewStyles" :src="webUrl"/>
  </view>
</template>

<script>
import app from "@/config/data";
import { isUrl } from "@/utils";
export default {
  data() {
    return {
      webUrl: app.author.blog,
      webviewStyles: {
        progress: {
          color: "#1aad19"
        }
      }
    };
  },
  onLoad(options) {
    // 上级页面webview不填url参数默认打开blog
    if (options.url) {
      if (isUrl(options.url)) {
        this.webUrl = options.url;
      } else {
      }
    }
  }
};
</script>