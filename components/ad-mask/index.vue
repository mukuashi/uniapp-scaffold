<template>
  <view
    v-if="value"
    :class="[prefixCls, `${prefixCls}-${position}`]"
    @touchmove.stop.prevent
  >
    <view
      :class="[
        'content',
        `content-${position}`,
        animationIn && `animation-in-${position}`,
        (animationOut || animationCancel) && `animation-out-${position}`
      ]"
      :style="[ maskStyle ]"
    >
      <slot />
      <view
        v-if="showCloseIcon"
        class="close"
      >
        <ad-icon
          :type="closeStyle.type || 'close_circle'"
          :color="closeStyle.color"
          :size="closeStyle.size"
          @click="handleCloseMask"
        />
      </view>
    </view>
    <!-- 蒙层 -->
    <view
      :class="[`${prefixCls}-cover`]"
      :style="{
        backgroundColor: `rgba(0,0,0,${opacity})`
      }"
      @tap="handleClickMask"
    />
  </view>
</view>
</template>

<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Mask遮罩组件，支持locked、透明度自定义等
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 20:45:22
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-29 16:30:34
 */
import app from '@/config';

export default {
  name: 'AdMask',
  props: {
    // 显示与隐藏
    value: {
      type: Boolean,
      default: false,
    },
    // 自定义mask样式
    customStyle: {
      type: Object,
      default: () => {},
    },
    // 不透明度
    opacity: {
      type: [String, Number],
      default: 0.6,
    },
    // slot内容位置，默认居中
    position: {
      type: String,
      validator(value) {
        return ['top', 'center', 'bottom'].includes(value);
      },
      default: 'center', // bottom时不显示底部关闭icon
    },
    // 蒙层锁定点击遮罩不可关闭
    locked: {
      type: Boolean,
      default: false,
    },
    // 是否显示关闭icon
    showCloseIcon: {
      type: Boolean,
      default: false,
    },
    // close图标自定义样式(showCloseIcon开启后)
    closeIconStyle: {
      type: Object,
      default: () => {},
    },
    // 是否需要进入动画
    animationIn: {
      type: Boolean,
      default: true,
    },
    // 点击自定义取消是否需要退出动画
    animationCancel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefixCls: `${app.prefix}-mask`,
      animationOut: false, // 点击蒙层退出动画
    };
  },
  computed: {
    maskStyle() {
      const style = {};
      return {
        ...style,
        ...this.customStyle,
      };
    },
    closeStyle() {
      return {
        size: 66,
        ...this.closeIconStyle,
      };
    },
  },
  methods: {
    // click mask
    handleClickMask() {
      this.$emit('click-mask', false);
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
        this.$emit('close', false);
        this.$emit('input', false);
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
