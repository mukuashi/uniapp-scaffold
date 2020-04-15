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
      backgroundImage: avatarGradient,
      width: avatarSize,
      height: avatarSize
    }"
    @tap="handleBoxClick"
  >
    <image lazy-load :src="image" :mode="mode" v-if="image" @error="handleImgError">
    <kp-icon :type="icon" v-if="!image && icon" :size="iconSize"/>
    <text :class="[prefixCls + '-text']" v-else>
      <slot/>
    </text>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Avatar头像圆字组件，支持图标、文本自定义等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-10 // Initial version.
 * @Date: 2019-07-10 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-03-31 13:36:23
 */
import KpIcon from "../kp-icon";
import { isNumber } from "@/utils";
//
const prefixCls = "k-avatar";
//
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
    avatarGradient: String,
    // 更多模式参考 https://uniapp.dcloud.io/component/image
    mode: {
      type: String,
      default: "widthFix"
    }
  },
  data() {
    return {
      prefixCls
    };
  },
  computed: {
    avatarSize() {
      return isNumber(Number(this.size)) && `${Number(this.size)}rpx`;
    }
  },
  methods: {
    handleBoxClick(e) {
      this.$emit("on-click", e);
    },
    handleImgError(e) {
      this.$emit("on-error", e);
    }
  }
};
</script>
