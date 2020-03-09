<template>
  <view
    :class="[
      `${prefixCls}`,
      `${prefixCls}-class`,
      `${prefixCls}-${shape}`,
      !avatarSize && `${prefixCls}-${size}`,
      !!image ? `${prefixCls}-image` : '',
      !!icon || customIcon ? `${prefixCls}-icon`: ''
    ]"
    :style="{
      backgroundColor: avatarBg,
      width: avatarSize,
      height: avatarSize
    }"
  >
    <image lazy-load :src="image" :mode="mode" v-if="image" @error="handleError">
    <kp-icon :type="icon" v-if="!image && icon" :size="iconSize"/>
    <text :class="[prefixCls + '-text']" v-else>
      <slot/>
    </text>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2015-Now Asako Studio. All rights reseved.
 * @fileoverview | Avatar头像圆字组件，支持图标、文本自定义等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-10 // Initial version.
 * @Date: 2019-07-10 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-02-29 20:47:00
 */
import KpIcon from "../kp-icon";

const prefixCls = "k-avatar";
import { isNumber } from "@/utils";
export default {
  name: "KpAvatar",
  components: {
    KpIcon
  },
  props: {
    shape: {
      validator(value) {
        return ["circle", "square"].includes(value);
      },
      default: "circle"
    },
    size: {
      type: [String, Number],
      // "small", "default", "large", 自定义Number
      default: "default"
    },
    image: String,
    icon: String,
    iconSize: {
      type: [Number, String],
      default: 28
    },
    avatarBg: String,
    // 更多模式参考 https://uniapp.dcloud.io/component/image
    mode: {
      type: String,
      default: "widthFix"
    }
  },
  data() {
    return {
      prefixCls,
      scale: 1,
      childrenWidth: 0,
      isSlotShow: false
    };
  },
  computed: {
    avatarSize() {
      return isNumber(Number(this.size)) ? `${Number(this.size)}rpx` : "";
    }
  },
  methods: {
    handleError(e) {
      this.$emit("on-error", e);
    }
  }
};
</script>
