<template>
  <view
    :class="[
      `${prefixCls}`,
      `${prefixCls}-class`,
      transparent && `${prefixCls}-transparent`,
      fixed && `${prefixCls}-fixed`
    ]"
    :style="{
      height: `${navBarHeight}px`
    }"
  >
    <view class="left">
      <slot name="left"/>
    </view>
    <view class="title" v-if="title">{{title}}</view>
    <view class="right">
      <slot name="right"/>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2015-Now Asako Studio. All rights reseved.
 * @fileoverview | 自定义顶部导航栏
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-02-25 // Initial version.
 * @Date: 2020-02-25 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-27 15:52:41
 */
export default {
  name: "KpNavbar",
  props: {
    //标题
    title: {
      type: String,
      default: ""
    },
    // 导航栏是否固定于顶部
    fixed: {
      type: Boolean,
      default: true
    },
    // 导航栏是否透明
    transparent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls: "k-navbar",
      // 导航栏高度
      navBarHeight: this.CustomBar
    };
  },
  //方法
  methods: {}
};
</script>

