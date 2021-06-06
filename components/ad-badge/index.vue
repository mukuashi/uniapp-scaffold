<template>
  <view
    :class="[
      `${prefixCls}-${type}`,
      dot ? `${prefixCls}-dot` : prefixCls,
      size && `${prefixCls}-${size}`
    ]"
    :style="[ badgeStyle ]"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Badge徽章
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:39:41
 */
import app from '@/config';
export default {
  name: 'AdBadge',
  props: {
    type: {
      type: String,
      validator(value) {
        return ['primary', 'error', 'default', 'warning'].includes(value);
      },
      default: 'primary',
    },
    // small,large
    size: String,
    // 用户自定义color会覆盖默认主题type
    color: String,
    bgColor: String,
    // 渐变属性
    bgGradient: String,
    // 是否是圆点
    dot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-badge`,
    };
  },
  computed: {
    badgeStyle() {
      const style = {};
      if (this.color) style.color = this.color
      if (this.bgColor) style.backgroundColor = this.bgColor
      if (this.bgGradient) style.backgroundImage = this.bgGradient
      return style
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
