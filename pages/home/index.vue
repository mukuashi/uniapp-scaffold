<template>
  <view class="home">
    <kp-avatar :image="app.images.logo" size="large"/>
    <h1>test</h1>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2014-Now MUX Lab, All rights reseved.
 * @fileoverview | Home
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @Date:   2019-07-08 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-01-15 21:49:59
 */
import app from "@/config/data";
import KpAvatar from "@/components/kp-avatar";
import * as Services from "@/services/demo";

export default {
  components: {
    KpAvatar
  },
  data() {
    return {
      app,
      index: 0
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
  onReachBottom() {
    // load more
  },
  onShareAppMessage(options) {
    return {
      title: app.common.solgan || "业务方自定义内容",
      desc: app.common.desc || "测试一下",
      path: "/pages/home/index",
      imageUrl: app.images.logo
    };
  },
  methods: {
    async getDemoList() {
      let res = await Services.getDemoListSvc();
      if (res.ok) {
      }
    }
  }
};
</script>