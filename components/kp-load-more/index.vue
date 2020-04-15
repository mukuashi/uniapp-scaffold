<template>
  <view class="k-load-more">
    <kp-spin class="loading" v-if="value <= 1"/>
    <view>
      <view class="logo" v-if="value === 2">
        <img :src="app.images.logo">
      </view>
      <view class="tips">
        <text v-if="value===2">没有更多啦</text>
        {{ groups[value] || '正在加载中 . . .' }}
      </view>
    </view>
    <kp-tips position="top" ref="toast"/>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Loading More组件，支持不同自定义，遵循key-value形式
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-15 // Initial version.
 * @Date: 2019-07-15 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-01-15 23:42:02
 */
import KpSpin from "../kp-spin";
import KpTips from "../kp-tips";
import app from "@/config/data";

export default {
  name: "KpLoadMore",
  components: {
    KpSpin,
    KpTips
  },
  props: {
    value: {
      // 0 加载前，1 加载中，2 没有更多了，引导下载
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      app,
      system: {},
      groups: ["上拉加载更多", "正在加载中 . . .", "下载App，探索更多 ~"]
    };
  },
  computed: {
    status: function() {
      return this.value;
    }
  },
  mounted() {
    // 获取设备基本信息
    uni.getSystemInfo({
      success: res => {
        this.system = res;
      }
    });
  },
  methods: {}
};
</script>
