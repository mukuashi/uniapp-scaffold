<template>
  <div
    :class="[ 'k-spin',`k-spin-${size || 'default'}`,fix ? `k-spin-fix` : '',center ? `k-spin-center` : '',inline ? `k-spin-inline` : '',custom ? `k-spin-show-text` : '', ]"
  >
    <div class="k-spin-main" :style="{color:color}">
      <div class="k-spin-dot" :style="{backgroundColor:color}"/>
      <div class="k-spin-text">
        <slot/>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2014-Now MUX Lab, All rights reseved.
 * @fileoverview | Spin组件，类似Loading，支持自定义配置
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-03-04 // Initial version.
 * @Date: 2019-03-04 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2019-10-14 17:20:52
 */
const prefixCls = "k-spin";
export default {
  name: "KpSpin",
  props: {
    // small || default || large
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
      default: "#24C789"
    }
  },
  data() {
    return {};
  },
  computed: {
    // uniapp及HbuildX编译问题，一时半会无法用class computed计算属性
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.size || "default"}`,
        this.fix ? `${prefixCls}-fix` : "",
        this.center ? `${prefixCls}-center` : "",
        this.inline ? `${prefixCls}-inline` : "",
        this.custom ? `${prefixCls}-show-text` : ""
      ];
    }
  },
  methods: {}
};
</script>
