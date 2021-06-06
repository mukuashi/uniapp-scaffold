<template>
  <button
    hover-class="none"
    :class="[
      prefixCls,
      className,
      `${prefixCls}-${type}`,
      `${prefixCls}-${shape}`,
      `${prefixCls}-${size}`,
      long ? `${prefixCls}-long` : '',
      plain ? `${prefixCls}-plain` : '',
      bgImage ? `${prefixCls}-bgimg` : '',
    ]"
    :style="[ btnStyle ]"
    :loading="loading"
    :disabled="disabled"
    :plain="plain"
    :open-type="opentype"
    @getphonenumber="getPhoneNumber"
    @opensetting="getOpenSetting"
    @tap="getButtonClick"
    @launchapp="getLaunchApp"
    @error="getButtonError"
  >
    <ad-icon
      v-if="icon"
      :type="icon"
      :size="iconSize"
      :color="color"
      class="icon"
    />
    <slot />
  </button>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Button组件，支持不同主题，可扩展（添加开发者想要的props等属性）
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-03 21:14:14
 */
import app from '@/config';

export default {
  name: 'AdButton',
  props: {
    type: {
      validator(value) {
        return [
          'default',
          'dashed',
          'primary',
          'success',
          'warning',
          'error',
          'ghost',
        ].includes(value);
      },
      default: 'default',
    },
    shape: {
      validator(value) {
        return ['default', 'square', 'circle'].includes(value);
      },
      default: 'default',
    },
    size: {
      validator(value) {
        return ['default', 'small', 'large'].includes(value);
      },
      default: 'default',
    },
    // 长宽单位均为rpx
    width: [String, Number],
    height: [String, Number],
    //
    color: String,
    fontSize: [String, Number],
    icon: String,
    iconSize: {
      type: [Number, String],
      default: 28,
    },
    iconColor: String,
    // 名称前是否带loading图标
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 空心按钮
    plain: {
      type: Boolean,
      default: false,
    },
    // 是否为块级元素
    long: {
      type: Boolean,
      default: false,
    },
    // 开放能力
    opentype: String,
    className: String,
    // 自定义背景色
    bgColor: String,
    // 自定义背景(渐变或图)
    bgImage: String,
    // 更多自定义style
    customStyle: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    prefixCls: `${app.prefix}-btn`,
  }),
  computed: {
    btnStyle() {
      const style = {};
      if (this.width) style.width = `${this.width}rpx`;
      if (this.height) style.height = `${this.height}rpx`;
      if (this.fontSize) style.fontSize = `${this.fontSize}rpx`;
      if (this.color) style.color = this.color;
      if (this.bgColor) {
        style.backgroundColor = this.bgColor;
        style.borderColor = this.bgColor;
      }
      if (this.bgImage) style.backgroundImage = this.bgImage.includes('gradient') ? this.bgImage : `url(${this.bgImage})`;
      return {
        ...style,
        ...this.customStyle,
      };
    },
  },
  mounted() {

  },
  methods: {
    getButtonClick(event) {
      this.$emit('on-click', event);
    },
    getPhoneNumber(event) {
      this.$emit('getphonenumber', event);
    },
    getOpenSetting(event) {
      this.$emit('opensetting', event);
    },
    getLaunchApp(event) {
      this.$emit('launchapp', event);
    },
    getButtonError(event) {
      this.$emit('error', event);
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
