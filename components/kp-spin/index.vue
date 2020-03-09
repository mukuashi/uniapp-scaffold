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
      <view :class="[`${prefixCls}-dot`]" :style="{backgroundColor:color}"/>
      <text :class="[`${prefixCls}-text`]">
        <slot/>
      </text>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2015-Now Asako Studio. All rights reseved.
 * @fileoverview | Spin组件，类似Loading，支持自定义配置
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-03-04 // Initial version.
 * @Date: 2019-03-04 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-03-01 14:01:02
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
      default: 360
    }
  },
  data() {
    return {
      prefixCls
    };
  },
  methods: {}
};
</script>
