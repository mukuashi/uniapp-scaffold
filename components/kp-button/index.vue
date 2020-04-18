<template>
  <button
    hover-class="none"
    :class="[ 
      prefixCls,
      `${prefixCls}-class`,
      `${prefixCls}-${type}`,
      `${prefixCls}-${shape}`,
      `${prefixCls}-${size}`,
      long ? `${prefixCls}-long` : '',
      plain ? `${prefixCls}-plain` : ''
    ]"
    :disabled="disabled"
    :plain="plain"
    @tap="handleButtonClick"
  >
    <kp-icon :type="icon" v-if="icon" :size="iconSize"/>
    <view class="text">
      <slot/>
    </view>
  </button>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Button组件，支持不同主题，可扩展（添加开发者想要的props等属性）
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-15 // Initial version.
 * @Date: 2019-07-15 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-03-26 02:38:48
 */
import KpIcon from "../kp-icon";
const prefixCls = "k-btn";

export default {
  name: "KpButton",
  components: { KpIcon },
  props: {
    type: {
      validator(value) {
        return [
          "default",
          "primary",
          "dashed",
          "text",
          "info",
          "success",
          "warning",
          "error"
        ].includes(value);
      },
      default: "default"
    },
    shape: {
      validator(value) {
        return ["square", "circle", "circle-outline"].includes(value);
      },
      default: "square"
    },
    size: {
      validator(value) {
        return ["small", "large", "default"].includes(value);
      },
      default: "default"
    },
    disabled: Boolean,
    icon: {
      type: String,
      default: ""
    },
    iconSize: {
      type: [Number, String],
      default: 28
    },
    long: {
      type: Boolean,
      default: false
    },
    // 空心按钮
    plain: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    prefixCls
  }),
  computed: {
    // 非H5端不支持 Vue官方文档：Class 与 Style 绑定 中的 classObject 和 styleObject 语法，暂时没法用。
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        `${prefixCls}-${this.shape}`,
        `${prefixCls}-${this.size}`,
        {
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-plain`]: this.plain
        }
      ];
    }
  },
  methods: {
    handleButtonClick(event) {
      this.$emit("on-click", event);
    }
  },
  mounted() {}
};
</script>