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
    <view class="left" v-if="left">
      <kp-icon
        :type="pages > 1 ? 'arrow_left': 'home'"
        :size="pages > 1 ? 60 : 46"
        @click="handleCommonNavigate"
      />
    </view>
    <view class="left" v-else>
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
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 自定义顶部导航栏
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-02-25 // Initial version.
 * @Date: 2020-02-25 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-07 21:45:27
 */
import KpIcon from "@/components/kp-icon";
export default {
  name: "KpNavbar",
  components: {
    KpIcon
  },
  props: {
    //标题
    title: {
      type: [String, Boolean],
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
    },
    // 左侧导航开关
    left: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      pages: 0, //页面栈
      prefixCls: "k-navbar",
      // 导航栏高度
      navBarHeight: this.CustomBar
    };
  },
  created() {
    this.pages = getCurrentPages().length;
  },
  //方法
  methods: {
    handleCommonNavigate() {
      // left为自定义跳转路径时且调回非首页
      if (typeof this.left === "string") {
        uni.navigateTo({
          url: this.left
        });
      } else {
        if (this.pages > 1) {
          return uni.navigateBack();
        }
        // 跳转到 tabBar 页面只能使用 switchTab 跳转
        uni.switchTab({
          url: "/pages/home/index"
        });
      }
    }
  }
};
</script>

