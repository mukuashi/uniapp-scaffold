<template>
  <view
    :class="[
			prefixCls,
      `${prefixCls}-class`,
			`${prefixCls}-${type}`,
			`${prefixCls}-${shape}`,
      size ? `${prefixCls}-${size}` : '',
			plain ? `${prefixCls}-${outline}` : ''
		]"
    :style="{ 
      color: color,
      backgroundColor :bgColor,
      fontWeight: weight
    }"
    @tap="handleClick"
  >
    <slot></slot>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | tag小标签
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-01-29 // Initial version.
 * @Date: 2020-01-25 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-23 13:58:24
 */
export default {
  name: "KpTag",
  props: {
    type: {
      type: String,
      validator(value) {
        return ["primary", "error", "default", "success",'grey'].includes(value);
      },
      default: "primary"
    },
    // 用户自定义color会覆盖默认主题type
    color: String,
    bgColor: String,
    // small,large
    size: {
      type: String,
      default: ""
    },
    // 按钮文字是否加粗
    weight: {
      type: [Boolean, Number, String],
      default: 400
    },
    // circle, square
    shape: {
      type: String,
      validator(value) {
        return ["circle", "square", "fillet"].includes(value);
      },
      default: "fillet"
    },
    //是否空心
    plain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: "k-tag"
    };
  },
  computed: {},
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>