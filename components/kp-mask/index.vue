<template>
  <view :class="[ 
      prefixCls,
      `${prefixCls}-${position}`
    ]" v-if="value">
    <view
      :class="[
      'content', 
      `content-${position}`,
      animationIn && `animation-in-${position}`,
      (animationOut||animationCancel) && `animation-out-${position}`
    ]"
    >
      <slot/>
    </view>
    <view v-if="closeIconShow&&position!=='bottom'" class="close">
      <kp-icon type="close_circle" :size="closeIconSize" @click="handleCloseMask"/>
    </view>
    <!-- 蒙层 -->
    <view
      @touchmove.stop
      @scroll.stop
      @tap.stop="handleClickMask"
      :class="[ 
        `${prefixCls}-cover`
      ]"
      :style="{
        backgroundColor: `rgba(0,0,0,${opacity})`
      }"
    />
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Mask遮罩组件，支持locked、透明度自定义等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-03-05 // Initial version.
 * @Date: 2020-02-25 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-03-24 13:12:52
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
      default: 0.6
    },
    // slot内容位置，默认居中
    position: {
      type: String,
      validator(value) {
        return ["center", "top", "bottom"].includes(value);
      },
      default: "center" //bottom时不显示底部关闭icon
    },
    // 蒙层锁定点击遮罩不可关闭
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
    // 是否需要进入动画
    animationIn: {
      type: Boolean,
      default: true
    },
    // 点击自定义取消是否需要退出动画
    animationCancel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: "k-mask",
      animationOut: false // 点击蒙层退出动画
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
      // 加个延时动画
      this.animationOut = true;
      setTimeout(() => {
        this.animationOut = false;
        this.$emit("close", false);
      }, 300);
    }
  }
};
</script>