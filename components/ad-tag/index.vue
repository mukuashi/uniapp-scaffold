<template>
  <view
    :class="[
      prefixCls,
      `${prefixCls}-${type}`,
      `${prefixCls}-${shape}`,
      size ? `${prefixCls}-${size}` : '',
      plain ? `${prefixCls}-${plain}` : '',
      maxWidth ? `${prefixCls}-slug` : ''
    ]"
    :style="[ tagStyle ]"
    @tap="handleClick"
  >
    <slot/>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | tag小标签
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-05 16:32:42
 */
import app from '@/config';

export default {
  name: 'AdTag',
  props: {
    type: {
      type: String,
      validator(value) {
        return [ 'default', 'primary', 'error', 'success', 'warning', 'grey'].includes(value);
      },
      default: 'default',
    },
    // 用户自定义color会覆盖默认主题type
    color: String,
    bgColor: String,
    // small,large
    size: String,
    // 按钮文字是否加粗
    weight: [Boolean, Number, String],
    // circle, square
    shape: {
      type: String,
      validator(value) {
        return ['circle', 'square', 'fillet'].includes(value);
      },
      default: 'fillet',
    },
    // 是否空心
    plain: {
      type: Boolean,
      default: false,
    },
    // 超多最大宽度的文本自动省略号(默认单位rpx)
    maxWidth: {
      type: [Boolean, String, Number],
      default: false,
    },
    // 更多自定义style
    customStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-tag`,
    };
  },
  computed: {
    tagStyle() {
      const style = {};
      if (this.color) style.color = this.color;
      if (this.bgColor) style.backgroundColor = this.bgColor;
      if (this.weight) style.fontWeight = typeof this.weight === 'boolean' ? 600 : this.weight;
      if (this.maxWidth && typeof this.maxWidth !== 'boolean') style.maxWidth = `${this.maxWidth}rpx`;
      return { ...style, ...this.customStyle };
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
