<template>
  <view
    :class="[ 
    `${prefixCls}`,
    `${prefixCls}-class`,
    `${prefixCls}-${size}`,
    fix ? `${prefixCls}-fix` : '',
    center ? `${prefixCls}-center` : '',
    inline ? `${prefixCls}-inline` : '',
    custom ? `${prefixCls}-show-text` : '', 
  ]"
    :style="{
      minHeight: `${height}rpx`
    }"
  >
    <view :class="[`${prefixCls}-main`]" :style="{color:color}">
      <block v-if="loadImage">
        <image
          mode="widthFix"
          :src="spinImage"
          :style="{
            width: `${loadImageSize}rpx`
          }"
        >
      </block>
      <view v-else :class="[`${prefixCls}-dot`]" :style="{backgroundColor:color}"/>
      <text :class="[`${prefixCls}-text`]">
        <slot/>
      </text>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Spin组件，类似Loading，支持自定义配置
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-03-04 // Initial version.
 * @Date: 2019-03-04 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-02 21:32:43
 */
const prefixCls = "k-spin";
export default {
  name: "KpSpin",
  props: {
    // small、default、large、huge
    size: {
      type: String,
      default: "default"
    },
    center: {
      type: Boolean,
      default: true
    },
    // 全屏fix
    fix: {
      type: Boolean,
      default: false
    },
    // 内敛模式
    inline: {
      type: Boolean,
      default: false
    },
    custom: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#623bff"
    },
    height: {
      type: [String, Number],
      default: 300
    },
    loadImage: [String, Boolean],
    loadImageSize: {
      type: [String, Number],
      default: 160
    }
  },
  data() {
    return {
      prefixCls
    };
  },
  computed: {
    spinImage() {
      if (this.loadImage) {
        return (
          (typeof this.loadImage === "boolean" &&
            "https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la/static/loading_default.svg?sign=119845efd5dde7f3874c62e5b2be11b3&t=1585118875") ||
          (typeof this.loadImage === "string" && this.loadImage)
        );
      }
    }
  },
  methods: {}
};
</script>
