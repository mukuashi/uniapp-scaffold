<template>
  <view class="ui">Components</view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2014-Now MUX Lab, All rights reseved.
 * @fileoverview | Components List Page
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date:   2019-07-08 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-01-15 21:49:57
 */
import * as Services from "@/services/demo";
import app from "@/config/data";

export default {
  components: {},
  data() {
    return {
      index: 1
    };
  },
  onLoad() {
    //  高度自适应
    uni.getSystemInfo({
      success: res => {
        this.winHeight = res.windowHeight;
      }
    });
  },
  onReady() {
    // init data
  },
  onShareAppMessage(options) {
    return {
      title: app.common.solgan || "业务方自定义内容",
      desc: app.common.desc || "测试一下",
      path: "/pages/components/index",
      imageUrl: app.images.logo
    };
  },
  methods: {}
};
</script>