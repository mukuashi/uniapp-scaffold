<template>
  <view
    v-if="value"
    @touchmove.stop
    @scroll.stop.prevent
    @click.stop="handleClickMask"
    :class="[ 
      prefixCls,
      `${prefixCls}-class`,
      `${prefixCls}-${position}`,
    ]"
    :style="{
      backgroundColor: `rgba(0,0,0,${opacity})`
    }"
  >
    <view
      :class="[
      'content', 
      `content-${position}`,
      closeAnimate && 'animation' 
    ]"
    >
      <slot/>
    </view>
    <view v-if="closeIconShow&&position!=='bottom'" class="close">
      <kp-icon type="close_circle" :size="closeIconSize" @click.native="handleCloseMask"/>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2015-Now Asako Studio. All rights reseved.
 * @fileoverview | Mask遮罩组件，支持locked、透明度自定义等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-03-05 // Initial version.
 * @Date: 2020-02-25 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-03-06 15:44:09
 */
import KpIcon from "../kp-icon";

export default {
  name: "KpMask",
  components: {
    KpIcon
  },
  props: {
    // 显示与隐藏
    value: {
      type: Boolean,
      default: false
    },
    // 不透明度
    opacity: {
      type: [String, Number],
      default: 0.7
    },
    // slot内容位置，默认居中
    position: {
      type: String,
      validator(value) {
        return ["center", "top", "bottom"].includes(value);
      },
      default: "bottom" //bottom时不显示底部关闭icon
    },
    // 锁定，背景禁止滚动且遮罩不可关闭
    locked: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭icon
    closeIconShow: {
      type: Boolean,
      default: true
    },
    // close图标大小
    closeIconSize: {
      type: [Number, String],
      default: 70
    },
    // 关闭是否有动画
    closeAnimate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls: "k-mask"
    };
  },
  methods: {
    // click mask
    handleClickMask() {
      this.$emit("clickMask", false);
      if (!this.locked && this.value) {
        this.handleCloseMask();
      }
    },
    // close mask
    handleCloseMask() {
      this.$emit("close", false);
    }
  }
};
</script>