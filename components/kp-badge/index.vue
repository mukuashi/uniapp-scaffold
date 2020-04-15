<template>
  <view
    :class="[
      `${prefixCls}-class`,
      `${prefixCls}-${type}`,
      dot ? `${prefixCls}-dot` : prefixCls,
      size?`${prefixCls}-${size}`:''
    ]"
    :style="{ 
      color: color,
      backgroundColor :bgColor
    }"
    @tap="handleClick"
  >
    <slot/>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Badge徽章
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-01-18 // Initial version.
 * @Date: 2020-01-18 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-23 00:38:10
 */
export default {
  name: "KpBadge",
  props: {
    type: {
      type: String,
      validator(value) {
        return ["primary", "error", "default", "warning"].includes(value);
      },
      default: "primary"
    },
    // '',small,large
    size: {
      type: String,
      default: ""
    },
    // 用户自定义color会覆盖默认主题type
    color: String,
    bgColor: String,
    //是否是圆点
    dot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: "k-badge"
    };
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>