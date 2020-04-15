<template>
  <view class="ued">UED</view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio, All rights reseved.
 * @fileoverview | Components List Page
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date:   2019-07-08 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-14 15:13:35
 */

import app from "@/config/data";

export default {
  components: {},
  data() {
    return {
      app
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
    const { name, brand, shares } = this.$store.state.app;
    return {
      title: shares.title,
      path: "pages/ued/index"
    };
  },
  methods: {}
};
</script>