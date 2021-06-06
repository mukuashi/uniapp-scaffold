<template>
  <view
    :class="[
      prefixCls,
      `${prefixCls}-${size}`,
      fix ? `${prefixCls}-fix` : '',
      center ? `${prefixCls}-center` : '',
      inline ? `${prefixCls}-inline` : ''
    ]"
    :style="[ spinStyle ]"
  >
    <view :class="[`${prefixCls}-main`]" :style="[ mainStyle ]">
      <block v-if="loadImage">
        <image
          mode="widthFix"
          :src="spinImage"
          :style="{
            width: `${loadImageSize}rpx`
          }"
        />
      </block>
      <view v-else :class="[`${prefixCls}-dot`]" :style="{ backgroundColor:color }"/>
      <text v-if="$slots.default" :class="[`${prefixCls}-text`]">
        <slot />
      </text>
    </view>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Spin组件，类似Loading，支持自定义配置
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-02 16:18:46
 */
import app from '@/config';

export default {
  name: 'AdSpin',
  props: {
    color: String,
    // small、default、large、huge
    size: {
      type: String,
      default: 'default',
    },
    // 水平垂直居中
    center: {
      type: Boolean,
      default: true,
    },
    // 全屏fix
    fix: {
      type: Boolean,
      default: false,
    },
    // 内敛模式
    inline: {
      type: Boolean,
      default: false,
    },
    // loading盒子高度
    sHeight: [String, Number],
    loadImage: [String, Boolean],
    loadImageSize: {
      type: [String, Number],
      default: 160,
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-spin`,
    };
  },
  computed: {
    spinStyle() {
      const style = {};
      if (this.sHeight) style.height = `${this.sHeight}px`;
      return style;
    },
    mainStyle() {
      const style = {};
      if (this.color) style.color = this.color;
      return style;
    },
    spinImage() {
      return this.loadImage && typeof this.loadImage === 'boolean' ? this.app.images.loading : this.loadImage
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
